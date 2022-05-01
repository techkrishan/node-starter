import express from 'express';
import validateMiddleware from '../middleware/validateMiddleware';
import authValidations from '../validations/authValidations';
import { register, login } from '../controllers/authController';

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post('/register', validateMiddleware(authValidations.register, 'body'), register);
authRoutes.post('/login', validateMiddleware(authValidations.login, 'body'), login);

export default authRoutes;
