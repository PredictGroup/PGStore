/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict';

/**
 * ## Imports
 *
 * The actions supported
 */
const {

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
  VERIFY_EMAIL,
  SIGNUP_SOCIAL,
  SELECT_LOCATION,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  SIGNUP_SOCIAL_REQUEST,
  SIGNUP_SOCIAL_SUCCESS,
  SIGNUP_SOCIAL_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,

  CHECK_OR_CREATE_NEW_USER_REQUEST,
  CHECK_OR_CREATE_NEW_USER_SUCCESS,
  CHECK_OR_CREATE_NEW_USER_FAILURE,

  SAVE_AREA_AND_WAREHOUSE_REQUEST,
  SAVE_AREA_AND_WAREHOUSE_SUCCESS,
  SAVE_AREA_AND_WAREHOUSE_FAILURE,

  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,

  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,

  SET_USER_INFO_REQUEST,
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAILURE,

} = require('../../config/constants').default;

/**
 * Project requirements
 */
import messaging from '@react-native-firebase/messaging';

const BackendFactory = require('../../lib/BackendFactory').default;
const APIBackendFactory = require('../../lib/APIBackendFactory').default;

import Toast from 'react-native-root-toast'

const _ = require('underscore');

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState() {
  return {
    type: LOGOUT,
  };
}
export function registerState() {
  return {
    type: REGISTER,
  };
}

export function loginState() {
  return {
    type: LOGIN,
  };
}

export function forgotPasswordState() {
  return {
    type: FORGOT_PASSWORD,
  };
}

export function signUpSocialState() {
  return {
    type: SIGNUP_SOCIAL,
  };
}

export function verifyEmailState() {
  return {
    type: VERIFY_EMAIL,
  };
}

export function selectLocationState() {
  return {
    type: SELECT_LOCATION,
  };
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}
/**
 * ## Login
 * After dispatching the logoutRequest, get the sessionToken
 *
 *
 * When the response is received and it's valid
 * change the state to register and finish the logout
 *
 * But if the call fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid sessionToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid sessionToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return BackendFactory().logout()

      .then(() => {
        dispatch(loginState());
        dispatch(logoutSuccess());

        Toast.show(I18n.t('Toast.logged_out'), {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true
        });

        return Promise.resolve({});
      })

      .catch(error => {
        dispatch(loginState());
        dispatch(logoutFailure(error));
        return Promise.reject(error);
      });
  };
}
/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value, type) {
  //console.log("onAuthFormFieldChange: ", field, value, type);
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field: field, value: value, type: type },
  };
}
/**
 * ## Signup actions
 */
export function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
  };
}
export function signupSuccess(json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json,
  };
}
export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}
/**
 * ## Social Signup actions
 */
export function signupSocialRequest() {
  return {
    type: SIGNUP_SOCIAL_REQUEST,
  };
}
export function signupSocialSuccess(json) {
  return {
    type: SIGNUP_SOCIAL_SUCCESS,
    payload: json,
  };
}
export function signupSocialFailure(error) {
  return {
    type: SIGNUP_SOCIAL_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call the server signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(username, email, password) {
  return dispatch => {
    dispatch(signupRequest());
    return BackendFactory()
      .signup({
        username: username,
        email: email,
        password: password,
      })

      .then(([token, currentUser]) => {
        console.log('signup ret: ', token, currentUser);
        dispatch(signupSuccess(currentUser));
        dispatch(loginState());

        // Send email verification
        dispatch(verifyEmail(email));

        Toast.show(I18n.t('Toast.email_send') + ' ' + email + '!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true
        });
        return Promise.resolve(currentUser);
      })
      .catch(error => {
        dispatch(signupFailure(error));
        return Promise.reject(error);
      });
  };
}

/**
 * ## signupSocial
 * @param {string} social - name of social network (google, facebook)
 *
 * Call the server signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signupSocial(social) {
  //console.log('in func signupSocial');
  return dispatch => {
    dispatch(signupSocialRequest());
    return BackendFactory()
      .signupSocial({
        social: social,
      })
      .then(([token, currentUser]) => {
        console.log('signupSocial ret: ', currentUser);
        dispatch(signupSocialSuccess(currentUser));
        dispatch(logoutState());
        dispatch(selectLocationState());

        if (!currentUser.isAnonymous) {
          Toast.show(I18n.t('Toast.signed_in'), {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true
          });
        }
        return Promise.resolve(currentUser);
      })
      .catch(error => {
        console.log('signupSocial error: ', error);
        dispatch(signupSocialFailure(error));
        return Promise.reject(error);
      });
  };
}

/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}
/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login(email, password) {
  return dispatch => {
    dispatch(loginRequest());
    return BackendFactory()
      .login({
        email: email,
        password: password,
      })
      .then((json) => {
        console.log("login: ", json);
        return BackendFactory().verifyEmail({
          email: email,
        });
      }) // Send email verification
      .then(([token, currentUser]) => {
        console.log('login ret: ', currentUser);
        dispatch(loginSuccess(currentUser));
        dispatch(logoutState());
        dispatch(selectLocationState());

        Toast.show(I18n.t('Toast.logged_in'), {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true
        });
        return Promise.resolve(currentUser);
      })

      .catch(error => {
        dispatch(loginFailure(error));
        return Promise.reject(error);
      });
  };
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

export function resetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}
/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on the server set
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function resetPassword(email) {
  return dispatch => {
    dispatch(resetPasswordRequest());
    return BackendFactory()
      .resetPassword({
        email: email,
      })
      .then(() => {
        dispatch(loginState());
        dispatch(resetPasswordSuccess());

        Toast.show(I18n.t('Toast.email_send') + ' ' + email + '!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true
        });
        return Promise.resolve({});
      })
      .catch(error => {
        dispatch(resetPasswordFailure(error));
        return Promise.reject(error);
      });
  };
}

// TODO check email verification
/**
 * ## Verify email actions
 */
export function verifyEmailRequest() {
  return {
    type: VERIFY_EMAIL_REQUEST,
  };
}

export function verifyEmailSuccess() {
  return {
    type: VERIFY_EMAIL_SUCCESS,
  };
}

export function verifyEmailFailure(error) {
  return {
    type: VERIFY_EMAIL_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## VerifyEmail
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on the server set
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function verifyEmail(email) {
  return dispatch => {
    dispatch(verifyEmailRequest());
    return BackendFactory()
      .verifyEmail({
        email: email,
      })
      .then(currentUser => {
        dispatch(verifyEmailSuccess());
        return Promise.resolve(currentUser);
      })
      .catch(error => {
        dispatch(verifyEmailFailure(error));
        return Promise.reject(error);
      });
  };
}

/**
 * ## CheckOrCreateNewUser actions
 */
export function checkOrCreateNewUserRequest() {
  return {
    type: CHECK_OR_CREATE_NEW_USER_REQUEST,
  };
}
export function checkOrCreateNewUserSuccess(json) {
  return {
    type: CHECK_OR_CREATE_NEW_USER_SUCCESS,
    payload: json,
  };
}
export function checkOrCreateNewUserFailure(error) {
  return {
    type: CHECK_OR_CREATE_NEW_USER_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## checkOrCreateNewUser
 *
 *
 */
export function checkOrCreateNewUser(firebase_uid, fcm_uid, device_uid, user_area, user_warehouse) {
  return dispatch => {
    dispatch(checkOrCreateNewUserRequest());
    return Promise.all([BackendFactory().getFirebaseToken(), messaging().getToken()])
      .then(([token, fcm_uid_token]) => {
        console.log('checkOrCreateNewUser token: ', token, fcm_uid_token, user_area, user_warehouse);
        return APIBackendFactory({ sessionToken: token }).check_or_create_user(
          {
            firebase_uid: firebase_uid,
            fcm_uid: fcm_uid_token,
            device_uid: device_uid,
            user_area: user_area,
            user_warehouse, user_warehouse,
          }
        );
      })
      .then((json) => {

        const status = json.status;
        const data = json.data.user;

        //console.log('checkOrCreateNewUser ret: ', status, data);

        dispatch(checkOrCreateNewUserSuccess(data));

        return Promise.resolve(data);
      })
      .catch(error => {
        dispatch(checkOrCreateNewUserFailure(error));
        return Promise.reject(error);
      });
  };
}

/**
 * ## getUserInfo actions
 */
export function getUserInfoRequest() {
  return {
    type: GET_USER_INFO_REQUEST,
  };
}
export function getUserInfoSuccess(json) {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: json,
  };
}
export function getUserInfoFailure(error) {
  return {
    type: GET_USER_INFO_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## getUserInfo
 *
 *
 */
export function getUserInfo() {
  return dispatch => {
    dispatch(getUserInfoRequest());
    return BackendFactory().getFirebaseToken()
      .then(token => {
        //console.log('getUserInfo token: ', token);
        return APIBackendFactory({ sessionToken: token }).get_user_info(
          {
            token: token,
          }
        );
      })
      .then((json) => {

        const status = json.status;
        const data = json.data.user;

        //console.log('getUserInfo ret: ', status, data);

        dispatch(getUserInfoSuccess(data));

        return Promise.resolve(data);
      })
      .catch(error => {
        dispatch(getUserInfoFailure(error));
        return Promise.reject(error);
      });
  };
}

/**
 * ## saveAreaAndWarehouse actions
 */
export function saveAreaAndWarehouseRequest() {
  return {
    type: SAVE_AREA_AND_WAREHOUSE_REQUEST,
  };
}

export function saveAreaAndWarehouseSuccess(json) {
  return {
    type: SAVE_AREA_AND_WAREHOUSE_SUCCESS,
    payload: json,
  };
}

export function saveAreaAndWarehouseFailure(error) {
  return {
    type: SAVE_AREA_AND_WAREHOUSE_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## saveAreaAndWarehouse
 *
 *
 */
export function saveAreaAndWarehouse(area, store) {
  console("saveAreaAndWarehouse 1: ", area, store);
}

/**
 * ## Delete actions
 */
export function deleteUserRequest() {
  return {
    type: DELETE_USER_REQUEST,
  };
}
export function deleteUserSuccess() {
  return {
    type: DELETE_USER_SUCCESS,
  };
}
export function deleteUserFailure(error) {
  return {
    type: DELETE_USER_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}
/**
 * ## Delete user
 */
export function deleteUser() {
  return dispatch => {
    dispatch(logoutRequest());
    return BackendFactory().delete()

      .then(() => {
        dispatch(loginState());
        dispatch(deleteUserSuccess());

        Toast.show(I18n.t('Toast.user_deleted'), {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true
        });

        return Promise.resolve({});
      })

      .catch(error => {
        dispatch(logoutState());
        dispatch(deleteUserFailure(error));
        return Promise.reject(error);
      });
  };
}


/**
 * ## updateUserInfo actions
 */
export function updateUserInfoRequest() {
  return {
    type: SET_USER_INFO_REQUEST,
  };
}
export function updateUserInfoSuccess(json) {
  return {
    type: SET_USER_INFO_SUCCESS,
    payload: json,
  };
}
export function updateUserInfoFailure(error) {
  return {
    type: SET_USER_INFO_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## updateUserInfo
 *
 *
 */
export function updateUserInfo(phone, address) {
  return dispatch => {
    dispatch(updateUserInfoRequest());
    return BackendFactory().getFirebaseToken()
      .then(token => {
        //console.log('updateUserInfo token: ', token);
        return APIBackendFactory({ sessionToken: token }).update_user(
          {
            phone: phone,
            address: address,
          }
        );
      })
      .then((json) => {

        const status = json.status;
        const data = json.data.user;

        console.log('updateUserInfo ret: ', status, data);

        dispatch(updateUserInfoSuccess(data));

        if (status === 200) {
          Toast.show(I18n.t('Orders.success_title'), {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true
          });
        }

        return Promise.resolve(data);
      })
      .catch(error => {
        dispatch(updateUserInfoFailure(error));
        return Promise.reject(error);
      });
  };
}