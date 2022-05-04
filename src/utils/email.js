import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import logger from '../configs/logger';
import emailMessages from '../messages/emailMessages';
import common from '../utils/common';

/**
 * This function is used to generate HTML from the template files
 * @param {object} data Details of the email  
 * @returns {object}
 */
async function renderHtmlPage(data) {
    let returnData;
    try {
        const file = await fs.readFileSync(data.template, 'utf8');
        const template = Handlebars.compile(file, { strict: true });
        returnData = template(data.templateData);
    } catch (err) {
        return common.throwError(err);
    }
    return returnData;
}

/**
 * This function is used to send email using the sendGrid API
 * @param {object} data An object of email data information
 * @returns {string} Success message on successful other wise error
 */
const sendMail = async (data, customHtml = false) => {
    // Configurable from env file
    if (process.env.EMAIL_SERVICE === "false") {
        return true;
    }

    try {
        let html = '';
        if (customHtml) {
            html = data.customHtml;
        } else {
            html = await renderHtmlPage(data);
        }

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.FROM_EMAIL}>`,
            to: data.to,
            subject: data.subject,
            html,
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOptions);
        return emailMessages.EMAIL_SENT;
    } catch (error) {
        logger.error(error);
        return common.throwError(error);
    }
};

export const sendRegistrationEmail = async (userDetails) => {
    const {
        email, first_name, email_verification_otp,
    } = userDetails;

    const emailDetails = {
        to: email,
        subject: emailMessages.USER_REGISTRATION_SUBJECT,
        template: path.join(__dirname, '../views/emailTemplates/userRegistration.hbs'),
        templateData: {
            first_name,
            email,
            email_verification_otp,
            url: process.env.WEB_APP_BASE_URL,
        },
    };
    return sendMail(emailDetails);
};

export const sendForgotPasswordEmail = async (userDetails) => {
    const {
        email, first_name, forgot_password_otp,
    } = userDetails;

    const emailDetails = {
        to: email,
        subject: emailMessages.FORGOT_PASSWORD,
        template: path.join(__dirname, '../views/emailTemplates/forgotPassword.hbs'),
        templateData: {
            first_name,
            email,
            forgot_password_otp,
            url: process.env.WEB_APP_BASE_URL,
        },
    };
    return sendMail(emailDetails);
};

export const sendResetPasswordEmail = async (userDetails) => {
    const {
        email, first_name,
    } = userDetails;

    const emailDetails = {
        to: email,
        subject: emailMessages.RESET_PASSWORD_SUCCESS,
        template: path.join(__dirname, '../views/emailTemplates/resetPassword.hbs'),
        templateData: {
            first_name,
            email,
            url: process.env.WEB_APP_BASE_URL,
        },
    };
    return sendMail(emailDetails);
};

export const sendEmailVerificationOTPEmail = async (userDetails) => {
    const {
        email, first_name,
    } = userDetails;

    const emailDetails = {
        to: email,
        subject: emailMessages.EMAIL_VERIFICATION_OTP_EMAIL,
        template: path.join(__dirname, '../views/emailTemplates/emailVerificationOtp.hbs'),
        templateData: {
            first_name,
            email,
            email_verification_otp,
            url: process.env.WEB_APP_BASE_URL,
        },
    };
    return sendMail(emailDetails);
};
