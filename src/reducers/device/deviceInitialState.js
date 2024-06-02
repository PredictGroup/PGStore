/**
 * # deviceInitialState.js
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
 * ## Import immutable record
 */
import { Record } from 'immutable'
import { getUniqueId, getManufacturer } from 'react-native-device-info';

const platform = (Platform.OS === 'android' ? 'android' : 'ios')
/**
 *  The version of the app but not  displayed yet
 */
import pack from '../../../package.json'
var VERSION = pack.version

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  isMobile: true,
  platform: platform,
  version: VERSION,
  uniqueID: getUniqueId(), // device uniqueID
})

export default InitialState
