import Joi from 'joi';
import regex from '../configs/regex';
import validationMessages from '../messages/validationMessages';

const authValidations = {
    register: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().replace(regex.spaces, '').email().required(),
        password: Joi.string().regex(regex.password).message(validationMessages.PASSWORD_VALIDATION_ERROR)
            .required(),
        phone: Joi.string().trim().min(3).max(20).pattern(regex.phone).required(),
    }),
}

export default authValidations;
