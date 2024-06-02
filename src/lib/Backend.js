/**
 * # Backend.js
 *
 * Abstract Base class for Backend support
 *
 */
'use strict';
/**
 * ## Async support
 *
 */

export default class Backend {

  signup(data) {}

  signupSocial(data) {}

  login(data) {}

  logout() {}

  resetPassword(data) {}

  verifyEmail(data) {}

  getProfile() {}

  updateProfile(userId, data) {}

  getUserUid() {}

  getUser() {}

  getFirebaseToken() {}

  deleteUser() {}
}
