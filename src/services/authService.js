import userDao from '../dao/userDao';
import validationMessages from '../messages/validationMessages';
import responseMessages from '../messages/responseMessages';
import statusCodes from '../configs/statusCodes';
import common from '../utils/common';
import customError from '../utils/customErrors';
import { sendRegistrationEmail, sendForgotPasswordEmail, sendResetPasswordEmail } from '../utils/email';
import projections from '../configs/projections';

const authService = {};

authService.register = async (requestData) => {
    const userData = {
        email: requestData.email.toLowerCase(),
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        name: `${requestData.first_name} ${requestData.last_name}`
    };
    const currentDateTime = common.currentUTCDateTime();

    // Check is email already exists
    const isEmailExists = await userDao.isExists({ email: userData.email });
    if (isEmailExists) {
        throw new customError(validationMessages.EMAIL_ALREADY_EXISTS, statusCodes.UNPROCESSABLE_ENTITY);
    }

    // Generate phone verification OTP
    userData.phone_verification_otp = await common.generateOTP();
    userData.phone_verification_otp_created_time = currentDateTime;

    // Generate email verification OTP
    userData.email_verification_otp = await common.generateOTP();
    userData.email_verification_otp_created_time = currentDateTime;

    // Password set true
    userData.has_password_set = true;

    // Generate password
    userData.password = await common.generatePasswordHash(requestData.password);

    // Save user details
    const user = await userDao.saveUser(userData);

    // Get details
    const userDetails = await userDao.getUserById(user._id);

    // Generate and set JWT auth token
    userDetails.token = await common.createJWT({ email: userDetails.email, _id: userDetails._id });

    // Send email verification token
    sendRegistrationEmail(userDetails);

    // Send OTP on mobile
    // smsUtils.sendOTP(userDetails);

    // Return response
    return {
        status: true,
        message: responseMessages.USER_REGISTERED_SUCCESSFULLY,
        data: userDetails,
    };
};

authService.login = async (requestData) => {
    requestData.email = requestData.email.toLowerCase();
    const { email, password } = requestData;

    const user = await userDao.getUser({ email }, projections.ALL)
    if (!user) {
        throw new customError(validationMessages.INVALID_LOGIN_CREDENTIALS, statusCodes.UNAUTHORIZED);
    }

    // Check is user inactive
    if (user.is_active === false) {
        throw new customError(validationMessages.ACCOUNT_INACTIVE, statusCodes.UNAUTHORIZED);
    }

    // Check password
    const passwordHash = await common.comparePasswordHash(password, user.password);
    if (!passwordHash) {
        throw new customError(validationMessages.INVALID_LOGIN_CREDENTIALS, statusCodes.UNAUTHORIZED);
    }

    // Generate and set JWT auth token
    user.token = await common.createJWT({ email: user.email, _id: user._id });

    // remove password key
    delete user['password'];

    return {
        status: true,
        message: responseMessages.EMAIL_VERIFICATION_OTP_SENT,
        data: user,
    };
};

authService.forgotPassword = async (requestData) => {
    requestData.email = requestData.email.toLowerCase();
    const { email } = requestData;
    const currentDateTime = common.currentUTCDateTime();

    const user = await userDao.getUser({ email }, projections.USER.DETAILS)
    if (!user) {
        throw new customError(validationMessages.EMAIL_NOT_FOUND, statusCodes.NOT_FOUND);
    }

    // Generate forgot password OTP
    const updatedData = {
        forgot_password_otp: await common.generateOTP(),
        forgot_password_otp_created_time: currentDateTime,
    }

    // Save user details
    await userDao.updateUser(user._id, updatedData);

    // Send forgot password email
    user.forgot_password_otp = updatedData.forgot_password_otp;
    sendForgotPasswordEmail(user);

    return {
        status: true,
        message: responseMessages.FORGOT_PASSWORD_OTP_SENT,
    };
};

authService.resetPassword = async (requestData) => {
    const { forgot_password_otp, password } = requestData;

    const user = await userDao.getUser({ forgot_password_otp }, projections.USER.DETAILS)
    if (!user) {
        throw new customError(validationMessages.FORGOT_PASSWORD_OTP_INVALID, statusCodes.UNPROCESSABLE_ENTITY);
    }

    // Check expiry
    const isOTPExpired = await common.isOTPExpired(user.forgot_password_otp_created_time, process.env.FORGOT_PASSWORD_OTP_EXPIRY);
    if (isOTPExpired) {
        throw new customError(validationMessages.FORGOT_PASSWORD_OTP_EXPIRED, statusCodes.UNPROCESSABLE_ENTITY);
    }

    // Generate password and reset forgot password OTP
    const updatedData = {
        forgot_password_otp: null,
        forgot_password_otp_created_time: null,
        password: await common.generatePasswordHash(password),
    }

    // Save user details
    await userDao.updateUser(user._id, updatedData);

    // Send reset password email
    sendResetPasswordEmail(user);

    return {
        status: true,
        message: responseMessages.PASSWORD_RESET_SUCCESS,
    };
};


authService.sendEmailVerificationOTP = async (user) => {
    const currentDateTime = common.currentUTCDateTime();

    // Generate email verification OTP
    const updatedData = {
        email_verification_otp: await common.generateOTP(),
        email_verification_otp_created_time: currentDateTime,
    }

    // Update user details
    await userDao.updateUser(user._id, updatedData);

    // Send email verification OTP email
    user.email_verification_otp = updatedData.email_verification_otp;
    sendEmailVerificationOTPEmail(user);

    return {
        status: true,
        message: responseMessages.EMAIL_VERIFICATION_OTP_SENT,
    };
};

authService.sendPhoneVerificationOTP = async (user) => {
    const currentDateTime = common.currentUTCDateTime();

    // Generate email verification OTP
    const updatedData = {
        phone_verification_otp: await common.generateOTP(),
        phone_verification_otp_created_time: currentDateTime,
    }

    // Update user details
    await userDao.updateUser(user._id, updatedData);

    // Send OTP on phone for phone verification
    user.phone_verification_otp = updatedData.phone_verification_otp;
    // sendPhoneVerificationOTP(user);

    return {
        status: true,
        message: responseMessages.PHONE_VERIFICATION_OTP_SENT,
    };
};

export default authService;
