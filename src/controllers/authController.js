import authService from '../services/authService';
import common from '../utils/common';
import statusCodes from '../configs/statusCodes';

export const register = async (req, res) => {
    try {
        const registerData = await authService.register(req.body);
        return res.status(statusCodes.OK).json(registerData);
    } catch (err) {
        return common.errorResponse(err, res);
    }
};

export const login = async (req, res) => {
    try {
        const loginData = await authService.login(req.body);
        return res.status(statusCodes.OK).json(loginData);
    } catch (err) {
        return common.errorResponse(err, res);
    }
};
