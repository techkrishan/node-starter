import express from 'express';
import validateMiddleware from '../middleware/validateMiddleware';
import { authenticate } from '../middleware/auth';
import authValidations from '../validations/authValidations';
import {
  register, login, forgotPassword, resetPassword, sendEmailVerificationOTP, sendPhoneVerificationOTP,
} from '../controllers/authController';

const authRoutes = express.Router({ mergeParams: true });

/**
 *  @swagger
 *  definitions:
 *    User:
 *	    type: object
 *	    properties:
 *	      _id:
 *	        type: string
 *	      email:
 *	        type: string
 *	      first_name:
 *	        type: string
 *	      last_name:
 *	        type: string
 *	      name:
 *	        type: string
 *	      phone:
 *	        type: number
 *	      country_code:
 *	        type: number
 *	      country_name:
 *	        type: string
 *	      dob:
 *	        type: string
 *	      gender:
 *	        type: string
 *	      marital_status:
 *	        type: string
 *	      location:
 *	        type: string
 *	      lat_lng:
 *	        type: string
 *	      user_info:
 *	        type: string
 *	      profile_image:
 *	        type: string
 *	      is_deleted:
 *	        type: boolean
 *	      last_login:
 *	        type: string
 *	      is_verified_by_phone:
 *	        type: boolean
 *	      is_verified_by_email:
 *	        type: boolean
 *	      is_admin:
 *	        type: boolean
 *	      is_active:
 *	        type: boolean
 *	      has_password_set:
 *	        type: boolean
 *	      createdAt:
 *	        type: string
 *	      updatedAt:
 *	        type: string
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register in to the application.
 *     operationId: auth_register
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auths
 *     parameters:
 *       - name: email
 *         description: Email id of the user for the account registration.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: password
 *         description: Password of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: phone
 *         description: phone of the user.
 *         required: true
 *         in: formData
 *         type: number
 *         x-example: ''
 *       - name: first_name
 *         description: First name of the user for the account registration.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: last_name
 *         description: Last name of the user for the account registration.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *     responses:
 *       200:
 *         description: Logged in user details
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Your information have been saved, Please check your email for further steps'
 *             token:
 *               type: string
 *               example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InViYWxkb2tAeW9wbWFpbC5jb20iLCJfaWQiOiI2MjcyMjk0M2M2ZTMxMGQ3N2VkMWFhNTYiLCJpYXQiOjE2NTE2NDg4MzUsImV4cCI6MTY1MTczNTIzNX0.QsdlOSykqXLtVcjmrFVU1cAs8pV2jxv1UaSVunEA0WU'   
 *             data:
 *               $ref: '#/definitions/User'
 *       422:
 *         description: Unprocessable Entity
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: email or phone already exist.
 */
authRoutes.post('/register', validateMiddleware(authValidations.register, 'body'), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login in to the application.
 *     operationId: auth_login
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auths
 *     parameters:
 *       - name: email
 *         description: email address of the user for the account registration.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: 'example@example.com'
 *       - name: password
 *         description: password of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *     responses:
 *       200:
 *         description: Logged in user details
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'OK'
 *             token:
 *               type: string
 *               example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhhbmRyaW5lZEB5b3BtYWlsLmNvbSIsIl9pZCI6IjYyNzIyZjhkNmMxMTFiYTg0NjdlNDcwZSIsImlhdCI6MTY1MTY1MDYxMSwiZXhwIjoxNjUxNzM3MDExfQ.BXwGH-qX7cP4nVPe3sUndRDDDoh25yLVQ1j4xwqKd98'
 *             data:
 *               $ref: '#/definitions/User'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: Please enter a valid email and password.
 */
authRoutes.post('/login', validateMiddleware(authValidations.login, 'body'), login);
authRoutes.post('/forgot-password', validateMiddleware(authValidations.forgot_password, 'body'), forgotPassword);
authRoutes.post('/reset-password', validateMiddleware(authValidations.reset_password, 'body'), resetPassword);
authRoutes.post('/email-verification-otp', authenticate, sendEmailVerificationOTP);
authRoutes.post('/phone-verification-otp', authenticate, sendPhoneVerificationOTP);

export default authRoutes;
