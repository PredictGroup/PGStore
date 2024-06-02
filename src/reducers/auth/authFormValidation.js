/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## Imports
 * the actions being addressed
 */
const { LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
  VERIFY_EMAIL,
  SIGNUP_SOCIAL,
  SELECT_LOCATION,
} =
  require('../../config/constants').default;

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation(state) {
  switch (state.form.state) {
    /**
     * ### Logout has no fields, so always valid
     */
    case LOGOUT:
      return state.setIn(['form', 'isValid'], false);
    /**
     * ### Signup Social has no fields, so always valid
     */
    case SIGNUP_SOCIAL:
      return state.setIn(['form', 'isValid'], false);
    /**
     * ### Registration has 4 fields
     */
    case REGISTER:
      if (
        state.form.fields.username !== '' &&
        state.form.fields.email !== '' &&
        state.form.fields.password !== '' &&
        state.form.fields.passwordAgain !== '' &&
        !state.form.fields.usernameHasError &&
        !state.form.fields.emailHasError &&
        !state.form.fields.passwordHasError &&
        !state.form.fields.passwordAgainHasError
      ) {
        return state.setIn(['form', 'isValid'], true);
      } else {
        return state.setIn(['form', 'isValid'], false);
      }
    /**
     * ### Login has 2 fields
     */
    case LOGIN:
      if (
        state.form.fields.email !== '' &&
        state.form.fields.password !== '' &&
        !state.form.fields.emailHasError &&
        !state.form.fields.passwordHasError
      ) {
        return state.setIn(['form', 'isValid'], true);
      } else {
        return state.setIn(['form', 'isValid'], false);
      }
    /**
     * ### Reset password has 1 field
     */
    case FORGOT_PASSWORD:
      if (state.form.fields.email !== '' && !state.form.fields.emailHasError) {
        return state.setIn(['form', 'isValid'], true);
      } else {
        return state.setIn(['form', 'isValid'], false);
      }

    /**
     * ### Email verification (no fields)
     */
    case VERIFY_EMAIL:
      return state.setIn(['form', 'isValid'], true);

    case SELECT_LOCATION:
      if (
        state.form.fields.area !== '' &&
        state.form.fields.store !== '' &&
        !state.form.fields.areaHasError &&
        !state.form.fields.storeHasError
      ) {
        return state.setIn(['form', 'isValid'], true);
      } else {
        return state.setIn(['form', 'isValid'], false);
      }
  }
  /**
   * Default, return the state
   */
  return state
}
