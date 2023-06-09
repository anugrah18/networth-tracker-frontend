//Backend Domain URL
//DEV ONLY
const API_DOMAIN_URL = "http://localhost:8080";

//users
const API_LOGIN_URL = "api/users/login";
const API_REGISTER_USER_URL = "api/users";
const API_GET_A_USER = "api/users";
const API_GET_A_USER_ID = "api/users/user/id";
const API_FORGOT_PASSWORD = "api/users/password/forgot";
const API_RESET_PASSWORD = "api/users/password/reset";
const API_GET_USERS = "api/users";
const API_DELETE_USER = "api/users";
const API_EDIT_USER = "api/users";

//records
const API_GET_ALL_RECORDS = "api/records";
const API_GET_INFLATION_DATA = "api/records/inflationData";
const API_POST_RECORD = "api/records";
const API_EDIT_RECORD = "api/records";
const API_DELETE_RECORD = "api/records";

//itemTypes
const API_GET_ALL_ITEMTYPES = "api/itemtypes";

export {
  API_DOMAIN_URL,
  API_LOGIN_URL,
  API_REGISTER_USER_URL,
  API_GET_A_USER,
  API_GET_A_USER_ID,
  API_FORGOT_PASSWORD,
  API_RESET_PASSWORD,
  API_GET_ALL_RECORDS,
  API_GET_INFLATION_DATA,
  API_GET_ALL_ITEMTYPES,
  API_POST_RECORD,
  API_EDIT_RECORD,
  API_DELETE_RECORD,
  API_GET_USERS,
  API_DELETE_USER,
  API_EDIT_USER,
};
