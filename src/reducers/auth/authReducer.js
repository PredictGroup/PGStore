/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
import { REHYDRATE } from 'redux-persist';

const InitialState = require('./authInitialState').default;
const fieldValidation = require('../../lib/fieldValidation').default;
const formValidation = require('./authFormValidation').default;

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

/**
 * ## Auth actions
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

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,

  SIGNUP_SOCIAL_REQUEST,
  SIGNUP_SOCIAL_SUCCESS,
  SIGNUP_SOCIAL_FAILURE,

  SET_STATE,

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

const initialState = new InitialState();
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    /**
     * ### Requests start
     * set the form to fetching and clear any errors
     */
    case SIGNUP_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case VERIFY_EMAIL_REQUEST:
    case SIGNUP_SOCIAL_REQUEST: {
      let nextState = state
        .setIn(['form', 'isFetching'], true)
        .setIn(['form', 'error'], null);
      return nextState;
    }

    /**
     * ### Logout state
     * The logged in user logs out
     * Clear the form's error and all the fields
     */
    case LOGOUT:
      return formValidation(
        state
          .setIn(['form', 'state'], action.type)
          .setIn(['form', 'error'], null)
          .setIn(['form', 'fields', 'username'], '')
          .setIn(['form', 'fields', 'email'], '')
          .setIn(['form', 'fields', 'password'], '')
          .setIn(['form', 'fields', 'passwordAgain'], '')
          .setIn(['form', 'fields', 'area'], '')
          .setIn(['form', 'fields', 'store'], '')
      );

    /**
     * ### Loggin in state
     * The user isn't logged in, and needs to
     * login, register or reset password
     *
     * Set the form state and clear any errors
     */
    case LOGIN:
    case REGISTER:
    case FORGOT_PASSWORD:
    case VERIFY_EMAIL:
    case SIGNUP_SOCIAL:
    case SELECT_LOCATION:
      return formValidation(
        state
          .setIn(['form', 'state'], action.type)
          .setIn(['form', 'error'], null),
      );

    /**
     * ### Auth form field change
     *
     * Set the form's field with the value
     * Clear the forms error
     * Pass the fieldValidation results to the
     * the formValidation
     */
    case ON_AUTH_FORM_FIELD_CHANGE: {
      const { field, value, type } = action.payload;
      //console.log("ON_AUTH_FORM_FIELD_CHANGE: ", action.payload);
      let nextState = state
        .setIn(['form', 'fields', field], value)
        .setIn(['form', 'state'], type)
        .setIn(['form', 'error'], null);

      return formValidation(fieldValidation(nextState, action), action);
    }
    /**
     * ### Requests end, good or bad
     * Set the fetching flag so the forms will be enabled
     */
    case SIGNUP_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case VERIFY_EMAIL_SUCCESS:
      return state.setIn(['form', 'isFetching'], false);

    case LOGIN_SUCCESS:
      return state
        .setIn(['form', 'isFetching'], false)
        .set('DisplayName', action.payload.displayName)
        .set('FirebaseUID', action.payload.uid)
        .set('DisplayEmail', action.payload.email);

    case SIGNUP_SOCIAL_SUCCESS:
      //console.log("SIGNUP_SOCIAL_SUCCESS: ", action.payload);
      return state
        .setIn(['form', 'isFetching'], false)
        .set('DisplayName', action.payload.displayName)
        .set('DisplayEmail', action.payload.email)
        .set('FirebaseUID', action.payload.uid)
        .set('AvatarIcon', { uri: action.payload.photoURL });

    case LOGOUT_SUCCESS:
      return state
        .setIn(['form', 'isFetching'], false)
        .set('DisplayName', I18n.t('DrawerItems.not_logged_in'))
        .set('AvatarIcon', require('../../../images/avatar.jpg'))
        .set('FirebaseUID', null);

    /**
     *
     * The fetching is done, but save the error
     * for display to the user
     */
    case SIGNUP_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case VERIFY_EMAIL_FAILURE:
    case SIGNUP_SOCIAL_FAILURE:
      //console.log("SIGNUP_SOCIAL_FAILURE123: ", action.type, action.payload);
      return state
        .setIn(['form', 'isFetching'], false)
        .setIn(['form', 'isValid'], false) // fix bug 17102021
        .setIn(['form', 'error'], action.payload);

    /**
     * ### Hot Loading support
     *
     * Set all the field values from the payload
     */
    case SET_STATE:
      var form = JSON.parse(action.payload).auth.form;

      var next = state
        .setIn(['form', 'state'], form.state)
        .setIn(['form', 'disabled'], form.disabled)
        .setIn(['form', 'error'], form.error)
        .setIn(['form', 'isValid'], form.isValid)
        .setIn(['form', 'isFetching'], form.isFetching)
        .setIn(['form', 'fields', 'username'], form.fields.username)
        .setIn(
          ['form', 'fields', 'usernameHasError'],
          form.fields.usernameHasError,
        )
        .setIn(['form', 'fields', 'email'], form.fields.email)
        .setIn(['form', 'fields', 'emailHasError'], form.fields.emailHasError)
        .setIn(['form', 'fields', 'password'], form.fields.password)
        .setIn(
          ['form', 'fields', 'passwordHasError'],
          form.fields.passwordHasError,
        )
        .setIn(['form', 'fields', 'passwordAgain'], form.fields.passwordAgain)
        .setIn(
          ['form', 'fields', 'passwordAgainHasError'],
          form.fields.passwordAgainHasError,
        )
        .setIn(
          ['form', 'fields', 'passwordAgainHasError'],
          form.fields.passwordAgainHasError,
        );
      return next;

    case CHECK_OR_CREATE_NEW_USER_REQUEST: {
      let nextState = state
        .setIn(['form', 'isFetching'], true);
      return nextState;
    }

    case CHECK_OR_CREATE_NEW_USER_SUCCESS:
      const createdUser = action.payload;
      //console.log("CHECK_OR_CREATE_NEW_USER_SUCCESS: ", createdUser);
      return state
        .setIn(['form', 'isFetching'], false)
        .set('createdUser', createdUser);

    case CHECK_OR_CREATE_NEW_USER_FAILURE:
      return state
        .setIn(['form', 'isFetching'], false)
        .setIn(['form', 'error'], action.payload)
        .set('createdUser', null);

    case GET_USER_INFO_REQUEST: {
      let nextState = state
        .setIn(['form', 'isFetching'], true);
      return nextState;
    }

    case GET_USER_INFO_SUCCESS:
      const userInfo = action.payload;
      //console.log("GET_USER_INFO_SUCCESS: ", userInfo);
      return state
        .setIn(['form', 'isFetching'], false)
        .set('userInfo', userInfo);

    case GET_USER_INFO_FAILURE:
      return state
        .setIn(['form', 'isFetching'], false)
        .set('userInfo', null);

    case SAVE_AREA_AND_WAREHOUSE_REQUEST: {
      let nextState = state
        .setIn(['form', 'isFetching'], true);
      return nextState;
    }

    case SAVE_AREA_AND_WAREHOUSE_SUCCESS:
      const { area, warehouse, areaId, warehouseId } = action.payload;
      //console.log("SAVE_AREA_AND_WAREHOUSE_SUCCESS: ", area, warehouse);
      return state
        .setIn(['form', 'isFetching'], false)
        .set('userArea', area)
        .set('userWarehouse', warehouse)
        .set('userAreaId', areaId)
        .set('userWarehouseId', warehouseId);

    case SAVE_AREA_AND_WAREHOUSE_FAILURE:
      return state
        .setIn(['form', 'isFetching'], false);

    case DELETE_USER_REQUEST: {
      let nextState = state
        .setIn(['form', 'isFetching'], true);
      return nextState;
    }

    case DELETE_USER_SUCCESS:
      return state
        .setIn(['form', 'isFetching'], false)
        .set('DisplayName', I18n.t('DrawerItems.not_logged_in'))
        .set('AvatarIcon', require('../../../images/avatar.jpg'))
        .set('FirebaseUID', null);

    case DELETE_USER_FAILURE:
      return state
        .setIn(['form', 'isFetching'], false)
        .set('userInfo', null);

    case SET_USER_INFO_REQUEST: {
      let nextState = state
        .set('isFetching', true);
      return nextState;
    }

    case SET_USER_INFO_SUCCESS:
      const userInfo1 = action.payload;
      //console.log("SET_USER_INFO_SUCCESS: ", userInfo1);
      return state
        .set('isFetching', false)
        .set('userInfo', userInfo1);

    case SET_USER_INFO_FAILURE:
      return state
        .set('isFetching', false)
        .set('userInfo', null);

    // case REHYDRATE:
    //   return {
    //     ...state,
    //   };

    // last line
  }
  /**
   * ## Default
   */
  return state;
}
