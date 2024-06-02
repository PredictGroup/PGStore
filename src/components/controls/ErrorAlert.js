/**
 * # ErrorAlert.js
 *
 * This class uses a component which displays the appropriate alert
 * depending on the platform
 *
 * The main purpose here is to determine if there is an error and then
 * plucking off the message depending on the shape of the error object.
 */
'use strict';

/**
 * ## Imports
 *
 */
import React, { Component } from 'react';
import { Alert } from 'react-native';
//import SimpleAlert from 'react-native-simpledialog-android'
//var SimpleAlert = require('react-native-simpledialog-android');
import _ from 'underscore';

const createAlert = message =>
  Alert.alert('Error!', message, [
    { text: 'Done' }
  ]);

class ErrorAlert extends React.Component {
  //var ErrorAlert = class ErrorAlertClass {
  /**
   * ## ErrorAlert
   * setup to support testing
   */
  /**
   * ### checkErro
   * determine if there is an error and how deep it is.  Take the
   * deepest level as the message and display it
   */
  checkError(obj) {
    let errorMessage = '';

    if (!_.isNull(obj)) {
      if (!_.isUndefined(obj.error)) {
        if (!_.isUndefined(obj.error.error)) {
          errorMessage = obj.error.error;
        } else {
          errorMessage = obj.error;
        }
      } else {
        errorMessage = obj;
      }
      if (errorMessage !== '') {
        if (!_.isUndefined(errorMessage.message)) {
          createAlert(errorMessage.message);
          //SimpleAlert.alert('Error', errorMessage.message)
        } else {
          createAlert(errorMessage);
          //SimpleAlert.alert('Error', errorMessage);
        }
      }
    } // isNull
  }
  //})
}

module.exports = ErrorAlert;
