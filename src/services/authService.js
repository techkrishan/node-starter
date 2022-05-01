authService.registerUser = async (requestData) => {
    requestData.email = requestData.email.toLowerCase();
    const { email, first_name, last_name, phone, password } = requestData;
    
    try {
        const [userInfoEmail, userInfoPhone] = await Promise.all([await UserDao.getCount({ email }), await UserDao.getCount({ phone })]);
        if (userInfoEmail) throw new customError(CONSTANTS.MESSAGE.EMAIL_EXIST, ErrorConstant.UN_PROCESSABLE_ENTITY);
        if (userInfoPhone) throw new customError(CONSTANTS.MESSAGE.PHONE_EXIST, ErrorConstant.UN_PROCESSABLE_ENTITY);
        registerData.otp = await CommonUtils.generateOTP();
        const otp_created_time = new Date();
        registerData.hasPasswordSet = true;
        await CommonUtils.sendSMS(registerData);
        registerData.password = await COMMON.generatePasswordHash(password);
        registerData.otp_created_time = otp_created_time;
        let createdUser = await UserDao.createUser(registerData);
        const register = CONSTANTS.KEYS.REGISTER;
        createdUser = CommonUtils.prepareObject(register, JSON.parse(JSON.stringify(createdUser)));

        const userFreeSubscriptionData = await subscriptionDao.getSubscriptionDetail({ type: 'free' });
        userFreeSubscriptionData.subscriptionid = CommonUtils.convertToObjectId(userFreeSubscriptionData._id);
        userFreeSubscriptionData.expiry_date = CommonUtils.addMonthFromNow(new Date(), userFreeSubscriptionData.expiry_in_months);
        userFreeSubscriptionData.userid = CommonUtils.convertToObjectId(createdUser._id);
        const userSubscriptionParameter = CONSTANTS.KEYS.USER_SUBSCRIPTION;

        const addUserFreeSubscriptionData = CommonUtils.prepareObject(userSubscriptionParameter, userFreeSubscriptionData);
        addUserFreeSubscriptionData.is_active = true;
        await subscriptionDao.createUserSubscription(addUserFreeSubscriptionData);
        const token = await CommonUtils.createJWT({ email, _id: createdUser._id });
        createdUser.token = token;

        const response = {
            status: true,
            message: CONSTANTS.MESSAGE.REGISTER_SUCCESS,
            data: createdUser,
        };

        // Only for unit testing purpose
        if (process.env.NODE_ENV === 'test') {
            response.data.otp = registerData.otp;
        }

        return response;
    } catch (err) {
        return CommonUtils.throwError(err);
    }
};