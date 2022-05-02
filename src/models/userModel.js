import mongoose from 'mongoose';

import modelConstants from '../configs/modelConstants';

const userSchema = new mongoose.Schema({
  email: modelConstants.TYPE_STRING_INDEX,
  password: modelConstants.TYPE_STRING,
  first_name: modelConstants.TYPE_STRING,
  last_name: modelConstants.TYPE_STRING,
  name: modelConstants.TYPE_STRING_INDEX,
  phone: modelConstants.TYPE_NUMBER,
  otp: modelConstants.TYPE_NUMBER,
  country_code: modelConstants.TYPE_NUMBER,
  otp_created_time: modelConstants.TYPE_DATE,
  country_name: modelConstants.TYPE_STRING,
  dob: modelConstants.TYPE_DATE,
  gender: modelConstants.TYPE_STRING,
  marital_status: modelConstants.TYPE_STRING,
  location: modelConstants.TYPE_STRING,
  lat_lng: modelConstants.TYPE_STRING,
  user_info: modelConstants.TYPE_STRING,
  profile_image: modelConstants.TYPE_STRING,
  is_deleted: modelConstants.TYPE_BOOLEAN_FALSE_INDEX,
  last_login: modelConstants.TYPE_DATE,
  social_media_provider: modelConstants.TYPE_STRING_INDEX,
  social_media_provider_id: modelConstants.TYPE_STRING_INDEX,
  verification_token: modelConstants.TYPE_STRING,
  forgot_password_token: modelConstants.TYPE_STRING,
  is_verified_by_phone: modelConstants.TYPE_BOOLEAN_FALSE_INDEX,
  is_verified_by_email: modelConstants.TYPE_BOOLEAN_FALSE_INDEX,
  stripe_customer_id: modelConstants.TYPE_STRING,
  is_admin: modelConstants.TYPE_BOOLEAN_FALSE_INDEX,
  is_active: modelConstants.TYPE_BOOLEAN_TRUE,
  otp_request: modelConstants.TYPE_NUMBER,
  has_password_set: modelConstants.TYPE_BOOLEAN_FALSE_INDEX,
}, {
  timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
