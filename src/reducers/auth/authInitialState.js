/**
 * # authInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import
 */
const { Record } = require('immutable');
const {
  REGISTER
} = require('../../config/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  state: REGISTER,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
    passwordAgain: '',
    passwordAgainHasError: false,
    passwordAgainErrorMsg: '',
    showPassword: false,

    area: '',
    store: '',
    areaHasError: false,
    areaErrorMsg: '',
    storeHasError: false,
    storeErrorMsg: '',
  }))()
})

/**
 * ## InitialState
 * The form is set
 */
var InitialState = Record({
  form: new Form(),
  DisplayName: "Не авторизован",
  DisplayEmail: "",
  AvatarIcon: require('../../../images/avatar.jpg'),
  FirebaseUID: null,
  
  createdUser: null,
  userInfo: null,

  userArea: null,
  userWarehouse: null,
  userAreaId: null,
  userWarehouseId: null,

  isFetching: false,

});
export default InitialState