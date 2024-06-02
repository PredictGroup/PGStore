/**
 * # Header.js
 *
 * This component initially displays a image. But when clicked, things
 * get interesting.
 *
 * On the initial display after being clicked, the
 * textinput will display the current ```state``` of the application.
 *
 * The button will be enabled and if clicked, whatever state is now
 * contained in the textinput will be processed and the application
 * will be restored to that state.
 *
 * By pasting in a previous state, the application will reset to that
 * state
 *
 * When the mark image is clicked, it is just toggled to display or hide.
*/
'use strict'

/**
 * ## Imports
 *
 * React
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'; // ES6
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

/**
 * Project component that will respond to onPress
 */
//const FormButton = require('./FormButton')
import { ActivityIndicator, Colors } from 'react-native-paper';
/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    //position: "absolute",
  },
})

/**
 * ### Translations
 */
import I18n from '../../lib/i18n'

class Header extends Component {

  /**
   * ## Header class
   *
   * constructor
   */
  constructor(props) {
    super(props);
  }
  /**
   * ### propTypes
   * * isFetching: display the spinner if true
   * * showState: should the JSON state, currentState, be displayed
   * * currentState: the JSON state
   * * onGetState: the action to call to get the current state
   * * onSetState: the action to call to set the state
   */
  static propTypes = {
    isFetching: PropTypes.bool,
  }
  /**
   * ### render
   *
   * if showState, stringify the currentState and display it to the
   * browser for copying. Then display to the user.
   *
   * When the value of the input changes, call ```_onChangeText```
   *
   * When the 'Update State' button is pressed, we're off to the
   * races with Hot Loading...just call the
   * ```_updateStateButtonPress``` and away we go...
   *
   */
  render() {
    return (
      <View>
        {this.props.isFetching ? (
        <View style={styles.header}>
          
            <ActivityIndicator animating={true} color='#00796b' size='large' />
          
        </View>
        ) : null}
      </View>
    );
  }
}

module.exports = Header
