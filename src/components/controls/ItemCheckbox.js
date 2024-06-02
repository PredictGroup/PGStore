/**
 * # ItemCheckbox.js
 *
 * This class was initially written by
 * https://github.com/mhollweck/react-native-item-checkbox
 *
 * I've opened an issue to attempt to merge this back in
 */
'use strict';

/**
 * ## Imports
 *
 * React
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import { Checkbox } from 'react-native-paper';

/**
 * The vector icon
 */
//import Icon from 'react-native-vector-icons/FontAwesome'

class ItemCheckbox extends Component {
  /**
   * ## ItemCheckbox class
   *
   * constructor
   */
  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    this.state = {
      checked: this.props.checked,
    };
  }
  /**
   * ## ItemCheckbox class
   *
   * set the propTypes
   */
  static propTypes = {
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    icon_check: PropTypes.string,
    icon_open: PropTypes.string,
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    iconSize: PropTypes.string,
    checked: PropTypes.bool,
    style: PropTypes.func,
    text: PropTypes.string,
    disabled: PropTypes.bool,
  };
  /**
   * ### getDefaultProps
   * set the default values
   */
  static defaultProps = {
    onCheck: null,
    onUncheck: null,
    icon_check: 'check-square-o',
    icon_open: 'square-o',
    size: 30,
    backgroundColor: 'white',
    color: 'grey',
    iconSize: 'normal',
    checked: false,
    text: 'MISSING TEXT',
    disabled: false,
  };
  // /**
  //  * ### getInitialState
  //  *
  //  * Set the box to be checked or not
  //  */
  // getInitialState () {
  //   console.log('getInitialState');
  //   return {
  //     checked: this.props.checked,
  //     bg_color: this.props.backgroundColor
  //   }
  // }
  /**
   * ### _getCircleCheckSytel
   * merge the props styles w/ some defaults
   */
  _getCircleCheckStyle() {
    return {
      width: this.props.size,
      height: this.props.size,
      backgroundColor: this.state.bg_color,
      borderColor: this.props.color,
      borderWidth: 2,
      borderRadius: this.props.size / 2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    };
  }
  /**
   * ### _completeProgress
   * If the checkbox is pressable, figure out what state it's in and
   * what the display should look like
   */
  _completeProgress() {
    //console.log('this.state.checked 3');
    //console.log(this.state);
    //console.log(this.props);
    if (this.state.checked) {
      this.setState({
        checked: false,
      });
      if (this.props.onUncheck) {
        this.props.onUncheck();
      }
    } else {
      this.setState({
        checked: true,
      });
      if (this.props.onCheck) {
        this.props.onCheck();
      }
    }
  }
  /**
   * ### componentDidMount
   * If there is a ```checked``` property, set the UI appropriately
   */
  componentDidMount() {
    //console.log('this.props.checked 2');
    //console.log(this.state);
    //console.log('this.props.checked', this.props.checked);
    if (this.props.checked) {
      this._completeProgress();
    }
  }

  /**
   * ### render
   * Use Touchable with or without Feedback depending on
   * ```disabled```.
   * Set the ```iconName``` depending on if checked
   */
  render() {
    var iconName = this.props.icon_open;

    if (this.props.disabled) {
      iconName = this.props.checked
        ? this.props.icon_check
        : this.props.icon_open;
      return (
        <View style={this.props.style}>
          <Checkbox.Item
            label={this.props.text}
            disabled={this.props.disabled}
            status={this.state.checked ? 'checked' : 'unchecked'}
          />
        </View>
      );
    } else {
      return (
        <View style={this.props.style}>
          <Checkbox.Item
            label={this.props.text}
            disabled={this.props.disabled}
            status={this.state.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              this._completeProgress();
            }}
          />
        </View>
      );
    }
  }
}

module.exports = ItemCheckbox;
