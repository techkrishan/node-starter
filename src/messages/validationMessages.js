const validationMessages = {
    VALIDATION_ERROR: 'Validation Error',
    PASSWORD_VALIDATION_ERROR: 'password should be alphanumeric ,special characters, minimum length should be 6 and maximum length 15',
    EMAIL_ALREADY_EXISTS: 'The provided email address already used by someone else',
    INVALID_LOGIN_CREDENTIALS: 'The provided login credentials are invalid.',
    ACCOUNT_INACTIVE: 'Your account has been deactivated by Admin.',
    EMAIL_NOT_FOUND: 'The provided email address does not exists.',
    FORGOT_PASSWORD_OTP_INVALID: 'The forgot password OTP is not valid.',
    FORGOT_PASSWORD_OTP_EXPIRED: 'The forgot password OTP is expired.',
    INVALID_TOKEN: 'Invalid Token.',
    USER_NOT_EXIST: 'User not exist from this token',
    UNAUTHORIZED: 'Unauthorized user',
    USER_NOT_VERIFIED: 'Your email or phone is not verified. Please verify your email or phone to access this feature',
};

export default validationMessages;
