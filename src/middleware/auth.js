/**
 * @file This file define the middleware to catch validation errors thrown by joi throughout the app.
 */
import logger from '../configs/logger';
import customError from '../utils/customErrors';
import statusCodes from '..//configs/statusCodes';
import common from '../utils/common';
import validationMessages from '../messages/validationMessages';
import userDao from '../dao/userDao';

async function validateToken(request) {
    try {
        const token = request.get('Authorization');
        if (!token) {
            throw new customError(validationMessages.INVALID_TOKEN, statusCodes.UNAUTHORIZED);
        }
        const verifyToken = await common.verifyJWT(token);

        if (!verifyToken) {
            throw new customError(validationMessages.INVALID_TOKEN, statusCodes.UNAUTHORIZED);
        }
        return { verifyToken, token };
    } catch (err) {
        logger.error(err);
        return common.throwError(err);
    }
}

/**
  * This function will catch the validation errors as middleware
  * @property {object} err - joi validation error object
  * @property {object} req - express request object
  * @property {object} res - express response object
  * @property {object} next - middleware function to continue req execution
  * @returns {object} res object is returned if the validation error occurs otherwise continue execution
  */

export const authenticate = async (req, res, next) => {
    try {
        const { verifyToken } = await validateToken(req);
        const getUser = await userDao.getUserById({ _id: verifyToken._id });
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        if (!getUser) {
            throw new customError(validationMessages.USER_NOT_EXIST, statusCodes.UNAUTHORIZED);
        }
        if (!getUser.is_active) {
            throw new customError(validationMessages.ACCOUNT_INACTIVE, statusCodes.UNAUTHORIZED);
        }
        req.user = getUser;
        req.user.userId = getUser.id;
        req.user.api_url = fullUrl;
        return next();
    } catch (err) {
        logger.error(err);
        err.jwt_expired = true;
        return common.errorResponse(err, res);
    }
};

export const adminAuthenticate = async (req, res, next) => {
    try {
        const { verifyToken } = await validateToken(req);
        const getUser = await userDao.getUserById({ _id: verifyToken._id });
        if (!getUser) {
            throw new customError(validationMessages.USER_NOT_EXIST, statusCodes.UNAUTHORIZED);
        }
        if (!getUser.is_admin) {
            throw new customError(validationMessages.UNAUTHORIZED, statusCodes.UNAUTHORIZED);
        }
        req.user = getUser;
        req.user.userId = getUser._id;
        return next();
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};

export const verifiedOrNot = async (req, res, next) => {
    try {
        const { is_verified_by_phone, is_verified_by_email } = req.user;
        if (!is_verified_by_phone || !is_verified_by_email) {
            throw new customError(validationMessages.USER_NOT_VERIFIED, statusCodes.UNAUTHORIZED);
        }
        return next();
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};
