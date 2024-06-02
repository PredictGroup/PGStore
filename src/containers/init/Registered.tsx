/**
 * Registered.tsx
 *
 * Success registration
 */

'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Alert, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {Auth} from '../../redux/selectors';
import {
  login,
  signup,
  loginState,
  registerState,
  signUpSocialState,
  forgotPasswordState,
  onAuthFormFieldChange,
} from '../../reducers/auth/authActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, AuthStackScreenProps} from '../../../types';

import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  Linking,
} from 'react-native';
import {
  Paragraph,
  Switch,
  Divider,
  Title,
  Button,
  TextInput,
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';

import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        login,
        signup,
        loginState,
        registerState,
        signUpSocialState,
        forgotPasswordState,
        onAuthFormFieldChange,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

const {LOGIN, REGISTER, FORGOT_PASSWORD, SIGNUP_SOCIAL} =
  require('../../config/constants').default;

interface Props {
  navigation: AuthStackScreenProps<'Registered'>; //StackNavigationProp<AuthStackParamList, 'Registered'>;
}

const Registered: React.FC<Props> = ({navigation}) => {
  const auth = useAppSelector(Auth);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  /**
   *  Get the appropriate message for the current action
   *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
   *  @param actions the action for the message type
   */
  let getMessage = messageType => {
    let forgotPassword = (
      <Button
        mode="text"
        uppercase={false}
        onPress={() => {
          forgotPasswordState();
          navigation.navigate('ForgotPassword', {undefined});
        }}
        accessibilityLabel="Forgot password link button">
        <Text style={theme.button_text_outlined3}>
          {I18n.t('LoginRender.forgot_password')}
        </Text>
      </Button>
    );

    let alreadyHaveAccount = (
      <Button
        mode="text"
        style={{marginLeft: 25, marginRight: 25}}
        uppercase={false}
        onPress={() => {
          loginState();
          navigation.replace('Login', {undefined});
        }}
        accessibilityLabel="Login link button">
        <Text style={theme.button_text_outlined3}>
          {I18n.t('Register.verified_email')}{' '}
        </Text>
        <Text style={theme.button_text_outlined4}>{I18n.t('App.login')}</Text>
      </Button>
    );

    let register = (
      <Button
        mode="text"
        style={{marginLeft: 25, marginRight: 25}}
        uppercase={false}
        onPress={() => {
          registerState();
          navigation.navigate('Register', {undefined});
        }}
        accessibilityLabel="Register link button">
        <Text style={theme.button_text_outlined3}>
          {I18n.t('Register.dont_have_account')}{' '}
        </Text>
        <Text style={theme.button_text_outlined4}>{I18n.t('App.signup')}</Text>
      </Button>
    );

    let signUpSocial = (
      <Button
        mode="text"
        style={{marginLeft: 25, marginRight: 25}}
        uppercase={false}
        onPress={() => {
          signUpSocialState();
          navigation.navigate('SignUpSocial', {undefined});
        }}
        accessibilityLabel="SignUp social networks link button">
        <Text style={theme.button_text_outlined3}>
          {I18n.t('Register.or')}{' '}
        </Text>
        <Text style={theme.button_text_outlined4}>
          {I18n.t('App.social_signin')}
        </Text>
      </Button>
    );

    switch (messageType) {
      case FORGOT_PASSWORD:
        return forgotPassword;
      case LOGIN:
        return alreadyHaveAccount;
      case REGISTER:
        return register;
      case SIGNUP_SOCIAL:
        return signUpSocial;
    }
  };

  var rightMessageType = LOGIN;

  let rightMessage = getMessage(rightMessageType);

  let self = this;

  /**
   * When the button is pressed, send the users info including the
   * ```currrentUser``` object as it contains the sessionToken and
   * user objectId
   */
  let onButtonPress = async () => {
    navigation.replace('Login', {undefined});
  };

  return (
    <SafeAreaView style={theme.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 1,
          padding: 0,
          margin: 0,
        }}>
        <View
          style={{
            //borderColor: '#000',
            //borderWidth: 1,
            alignItems: 'center',
            marginBottom: 65,
          }}>
          <Image
            source={require('../../../images/logo.png')}
            style={{
              width: 0.0614 * height,
              height: 0.0614 * height,
              marginTop: 0.03125 * height,
            }}
          />

          <View
            style={{
              marginTop: 0.1116 * height,
            }}></View>
          <HeaderActivity isFetching={auth.form.isFetching} />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: width,
              paddingLeft: 25,
              marginBottom: 40,
            }}>
            <Text
              style={{
                fontSize: 0.0629 * width,
                fontWeight: '600',
                color: '#030303',
              }}>
              {I18n.t('Register.completed')}
            </Text>
            <Text
              style={{
                fontSize: 0.0387 * width,
                fontWeight: '600',
                color: '#7C7C7C',
                marginTop: 0.0167 * height,
              }}>
              {I18n.t('Register.check_and_verify')}
            </Text>
          </View>
        </View>

        <Button
          icon="account"
          mode="contained"
          style={theme.button}
          labelStyle={theme.button_label}
          onPress={onButtonPress.bind(self)}
          accessibilityLabel="Go to login">
          {I18n.t('Orders.continue')}
        </Button>

        <View
          style={{
            marginTop: 0.0279 * height,
            marginBottom: 0.0279 * height,
          }}>
          {rightMessage}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Registered);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
