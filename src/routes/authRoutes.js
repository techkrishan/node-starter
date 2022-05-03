import express from 'express';
import validateMiddleware from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/auth';
import authValidations from '../validations/authValidations';
import { 
    register, login, forgotPassword, resetPassword, sendEmailVerificationOTP, sendPhoneVerificationOTP, 
} from '../controllers/authController';

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post('/register', validateMiddleware(authValidations.register, 'body'), register);
authRoutes.post('/login', validateMiddleware(authValidations.login, 'body'), login);
authRoutes.post('/forgot-password', validateMiddleware(authValidations.forgot_password, 'body'), forgotPassword);
authRoutes.post('/reset-password', validateMiddleware(authValidations.reset_password, 'body'), resetPassword);
authRoutes.post('/email-verification-otp', authenticate, sendEmailVerificationOTP);
authRoutes.post('/phone-verification-otp', authenticate, sendPhoneVerificationOTP);

export default authRoutes;
