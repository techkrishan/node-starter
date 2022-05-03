import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import logger from '../configs/logger';
import emailMessages from '../messages/emailMessages';

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
        throwError(err);
    }
    return returnData;
}

/**
 * This function is used to send email using the sendGrid API
 * @param {object} data An object of email data information
 * @returns {string} Success message on successful other wise error
 */
const sendMail = async (data, customHtml = false) => {
    try {
        let html = '';
        if (customHtml) {
            html = data.customHtml;
        } else {
            html = await renderHtmlPage(data);
        }

        /* create reusable transporter object using the default SMTP transport */
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        /*
         *  setup email data with unicode symbols
         */
        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.FROM_EMAIL}>`,
            to: data.to,
            subject: data.subject,
            html,
        };
        /*
         *  send mail with defined transport object
         */
        await transporter.sendMail(mailOptions);
        return emailMessages.EMAIL_SENT;
    } catch (error) {
        logger.error(error);
        return throwError(error);
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