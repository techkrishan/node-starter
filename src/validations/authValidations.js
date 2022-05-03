import Joi from 'joi';
import regex from '../configs/regex';
import validationMessages from '../messages/validationMessages';

const authValidations = {
    register: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().replace(regex.spaces, '').email().required(),
        password: Joi.string().min(6).max(30).regex(regex.password).message(validationMessages.PASSWORD_VALIDATION_ERROR)
            .required(),
        phone: Joi.string().trim().min(3).max(20).pattern(regex.phone).required(),
    }),
    login: Joi.object().keys({
        email: Joi.string().replace(regex.spaces, '').email().required(),
        password: Joi.string().required(),
    }),
    forgot_password: Joi.object().keys({
        email: Joi.string().replace(regex.spaces, '').email().required(),
    }),
    reset_password: Joi.object().keys({
        forgot_password_otp: Joi.string().max(6).required(),
        password: Joi.string().min(6).max(30).regex(regex.password).message(validationMessages.PASSWORD_VALIDATION_ERROR)
            .required(),
    }),
}

export default authValidations;
