/**
 * @file This file extends Error class with status, message and errors fields.
 * @example throw new CustomError(status, message, errors)
 */

 class CustomError extends Error {
    constructor(message, status, errors, ...params) {
      super(...params);
      this.status = status;
      this.message = message;
      this.errors = errors || '';
    }
  }
  
  module.exports = CustomError;
  