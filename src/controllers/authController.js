export const register = async (req, res) => {
    try {
        const registerData = await authService.register(req.body);
        return res.status(ErrorConstants.OK).json(registerData);
    } catch (err) {
        return CommonUtils.errorResponse(err, res);
    }
};

export const login = async (req, res) => {
    try {
        const loginData = await authService.login(req.body);
        return res.status(ErrorConstants.OK).json(loginData);
    } catch (err) {
        return CommonUtils.errorResponse(err, res);
    }
};
