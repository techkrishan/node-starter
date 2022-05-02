import mongoose from 'mongoose';
import moment from 'moment-timezone';

export default {
    TYPE_STRING: { type: String, default: null, trim: true },
    TYPE_STRING_INDEX: { type: String, default: null, trim: true, index: true },
    TYPE_STRING_NO_DEFAULT: { type: String, trim: true },
    TYPE_STRING_DEFAULT_EMPTY_STRING: { type: String, default: '', trim: true },
    TYPE_NUMBER: { type: Number, default: 0 },
    TYPE_BOOLEAN_FALSE: { type: Boolean, default: false },
    TYPE_BOOLEAN_TRUE: { type: Boolean, default: true },
    TYPE_BOOLEAN_NULL: { type: Boolean, default: null },
    TYPE_BOOLEAN_TRUE_INDEX: { type: Boolean, default: true, index: true },
    TYPE_BOOLEAN_FALSE_INDEX: { type: Boolean, default: false, index: true },
    TYPE_DATE: { type: Date, default: moment().utc().format() },
    TYPE_DATE_INDEX: { type: Date, default: moment().utc().format(), index: true },
    TYPE_DATE_NULL: { type: Date, default: null, index: true },
    TYPE_DATE_DOB: { type: Date, default: null },
    TYPE_ARRAY: { type: Array, default: [] },
    USER_REF: { type: mongoose.Schema.Types.ObjectId, ref: 'users', index: true },
    USER_REF_NULL: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users', index: true, default: null,
    },
};