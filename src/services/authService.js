import userDao from '../dao/userDao';
import validationMessages from '../messages/validationMessages';
import responseMessages from '../messages/responseMessages';
import statusCodes from '../configs/statusCodes';
import common from '../utils/common';
import customError from '../utils/customErrors';

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

    // Generate OTP
    userData.otp = await common.generateOTP();
    userData.otp_created_time = currentDateTime;

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
    // emailUtils.sendRegistrationEmail(userDetails);

    // Send OTP on mobile
    // smsUtils.sendOTP(userDetails);

    // Return response
    return {
        status: true,
        message: responseMessages.USER_REGISTERED_SUCCESSFULLY,
        data: userDetails,

    };
};

export default authService;
