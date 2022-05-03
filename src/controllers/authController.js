import logger from '../configs/logger';
import authService from '../services/authService';
import common from '../utils/common';
import statusCodes from '../configs/statusCodes';

export const register = async (req, res) => {
    try {
        const response = await authService.register(req.body);
        return res.status(statusCodes.OK).json(response);
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};

export const login = async (req, res) => {
    try {
        const response = await authService.login(req.body);
        return res.status(statusCodes.OK).json(response);
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const response = await authService.forgotPassword(req.body);
        return res.status(statusCodes.OK).json(response);
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};

export const resetPassword = async (req, res) => {
    try {
        const response = await authService.resetPassword(req.body);
        return res.status(statusCodes.OK).json(response);
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};

export const sendEmailVerificationOTP = async (req, res) => {
    try {
        const response = await authService.sendEmailVerificationOTP(req.user);
        return res.status(statusCodes.OK).json(response);
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};

export const sendPhoneVerificationOTP = async (req, res) => {
    try {
        const response = await authService.sendPhoneVerificationOTP(req.user);
        return res.status(statusCodes.OK).json(response);
    } catch (err) {
        logger.error(err);
        return common.errorResponse(err, res);
    }
};