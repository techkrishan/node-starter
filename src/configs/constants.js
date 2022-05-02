export default {
  API_VERSION: '/v1', // API version
  PAGE_SIZE: 20, // No of records per page
  INITIAL_PAGE: 1,
  JWT_TOKEN_EXPIRY: '24h',
  BULK_ACTIONS: {
    ACTIVATE: 'activate',
    DEACTIVATE: 'deactivate',
    DELETE: 'delete',
  },
  USER_ROLES: {
    ADMIN: 'admin',
    AUTHOR: 'authOr',
    PUBLIC: 'public',
  },
  NUMBERS: {
    ONE: 1,
    EIGHT: 8,
    SIXTEEN: 16,
    ZERO: 0,
    TWENTY: 20,
    THOUSAND: 1000,
    TWO: 2,
    HUNDRED: 100,
  },
};
