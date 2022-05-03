import moment from 'moment-timezone';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import constants from '../configs/constants';
import customError from '../utils/customErrors';

async function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

function currentUTCDateTime() {
    return moment().utc().format();
}

function randomString(length, chars) {
    let mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    let result = '';
    // eslint-disable-next-line no-plus-plus
    for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

async function generatePasswordHash(password) {
    const createSalt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, createSalt);
}

async function generatePassword() {
    const password = randomString(constants.NUMBERS.EIGHT, 'aA');
    const hash = await generatePasswordHash(password);
    return { password, hash };
}

async function comparePasswordHash(password, oldPasswordHash) {
    return bcryptjs.compare(password, oldPasswordHash);
}

/**
 * @description get single object of goal.
 * @property {String} payload token
 * @returns {JWT token}
 */
async function createJWT(payload = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY });
}

/**
 * @description verify JWT token
 * @property {String} token token
 * @returns {verifyToken}
 */
async function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * @description custom verify JWT token
 * @property {String} token token
 * @returns {verifyToken}
 */
async function verifyCustomJWT(token, secret, options) {
    return jwt.verify(token, secret, options);
}

async function errorResponse(err, res) {
    const error = {};
    const statusCode = err.status || 500;
    error.status = false;
    if (err.jwt_expired) {
        error.jwt_expired = err.jwt_expired;
    }
    error.message = err.message;
    return res.status(statusCode).json(error);
}

async function isOTPExpired(startDateTime, expiryTime) {
    const currentDateTime = currentUTCDateTime();
    startDateTime = moment(startDateTime).utc().format();
    const expiredDateTime = moment(startDateTime).add(expiryTime, 'minutes').utc().format();
    console.log('currentDateTime: ', currentDateTime);
    console.log('startDateTime: ', startDateTime);
    console.log('expiredDateTime: ', expiredDateTime);
    return currentDateTime > expiredDateTime;
}

/**
 * @description Middleware to handle common error.
 * @property {Object} payload token
 * @returns {error}
 */
async function throwError(err) {
    if (err.message && err.status) {
        throw new customError(err.message, err.status);
    }
    throw err;
}

export default {
    generateOTP,
    currentUTCDateTime,
    generatePasswordHash,
    generatePassword,
    comparePasswordHash,
    createJWT,
    verifyJWT,
    verifyCustomJWT,
    errorResponse,
    isOTPExpired,
    throwError,
}