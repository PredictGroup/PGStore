/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'

import {firebaseApi} from './FirebaseApi'

export default function BackendFactory () {
    firebaseApi.initialize();
    return firebaseApi;
}
