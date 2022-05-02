import BaseDao from './baseDao';
import UserModel from '../models/userModel';

const userDao = new BaseDao(UserModel);

const PROJECTION = {
    all: {},
    list: {},
    details: { password: 0 },
    auth: {
        _id: 1, email: 1, first_name: 1, last_name: 1, phone: 1, password: 1,
    }
};

/**
 * Create new user in the database.
 * @property {object} userInfo- The object of user.
 * @returns {Promise}
 */
async function saveUser(userInfo) {
    const user = new UserModel(userInfo);
    return user.save();
}

/**
 * This function is used to get user details by the matching filters
 * @param {object} filter Filter conditions to get the user details 
 * @returns 
 */
async function getUserDetails(filter, projection = PROJECTION.details) {
    return UserModel.findOne(filter, projection).lean().exec();
}

/**
 * get single object of user by ID.
 * @property {string} id - User ID
 * @returns {Promise}
 */
async function getUserById(id, fullDetails = false) {
    if (fullDetails) {
        return UserModel.findById(id).lean().exec();
    }
    return UserModel.findById(id, PROJECTION.details).lean().exec();
}

/**
 * This function is used to count document on the basis of filter
 * @param {object} query match condition
 * @returns {Promise} return count of the object that match with the filter
 */
async function getCount(query) {
    return UserModel.countDocuments(query);
}

/**
 * This function is used to check is the object exists with the provided filter query
 * @param {object} query match condition
 * @returns {boolean}
 */
 async function isExists(query) {
    const count = await UserModel.countDocuments(query);
    return count > 0;
}

export default {
    saveUser,
    getUserById,
    getCount,
    isExists,
};
