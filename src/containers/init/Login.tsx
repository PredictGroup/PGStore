/**
 * # Login.tsx
 *
 *  The container to display the Login form
 *
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

import {View, StyleSheet, Platform, ScrollView, Text} from 'react-native';
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
  navigation: AuthStackScreenProps<'Login'>; //StackNavigationProp<AuthStackParamList, 'Login'>;
}

const Login: React.FC<Props> = ({navigation}) => {
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
          navigation.navigate('Login', {undefined});
        }}
        accessibilityLabel="Login link button">
        <Text style={theme.button_text_outlined3}>
          Already have an account?{' '}
        </Text>
        <Text style={theme.button_text_outlined4}>Login</Text>
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
        <Text style={theme.button_text_outlined3}>Don’t have an account? </Text>
        <Text style={theme.button_text_outlined4}>SignUp</Text>
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
        <Text style={theme.button_text_outlined3}>or </Text>
        <Text style={theme.button_text_outlined4}>SignUp Social</Text>
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

  let secureTextEntry = !auth.form.fields.showPassword;

  var leftMessageType = REGISTER;
  var rightMessageType = FORGOT_PASSWORD;
  var nextMessageType = SIGNUP_SOCIAL;

  let leftMessage = getMessage(leftMessageType);
  let rightMessage = getMessage(rightMessageType);
  let nextMessage = getMessage(nextMessageType);

  let self = this;

  const inputActionHandler = async (field: string, payload: string) => {
    //console.log('inputActionHandler 3', field, payload);
    await dispatch(onAuthFormFieldChange(field, payload, LOGIN));
  };

  /**
   * When the button is pressed, send the info to server
   */
  let onButtonPress = async () => {
    await dispatch(
      login(auth.form.fields.email, auth.form.fields.password),
    ).catch(error => {
      createAlert(error.message);
    });
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
              {I18n.t('Login.Loging')}
            </Text>
            <Text
              style={{
                fontSize: 0.0387 * width,
                fontWeight: '600',
                color: '#7C7C7C',
                marginTop: 0.0167 * height,
              }}>
              {I18n.t('Login.EnterEmail')}
            </Text>
          </View>
        </View>

        {/* email */}
        <TextInput
          style={theme.input}
          label={I18n.t('LoginForm.email')}
          value={auth.form.fields.email}
          placeholder="Enter email"
          onChangeText={text => inputActionHandler('email', text)}
          error={auth.form.fields.emailHasError}
          disabled={auth.form.isFetching}
          accessibilityLabel="email"
          keyboardType="email-address"
        />
        <HelperText
          style={{marginLeft: 25, marginRight: 25}}
          type="error"
          visible={auth.form.fields.emailHasError}>
          {auth.form.fields.emailErrorMsg}
        </HelperText>

        {/* password */}
        <TextInput
          style={theme.input}
          label={I18n.t('LoginForm.password')}
          value={auth.form.fields.password}
          secureTextEntry={secureTextEntry}
          placeholder="Enter password"
          onChangeText={text => inputActionHandler('password', text)}
          error={auth.form.fields.passwordHasError}
          disabled={auth.form.isFetching}
          accessibilityLabel="password"
          right={
            <TextInput.Icon
              color={'#7C7C7C'}
              name={!secureTextEntry ? 'eye' : 'eye-off'}
              onPress={() => {
                dispatch(
                  onAuthFormFieldChange('showPassword', secureTextEntry, LOGIN),
                );
              }}
            />
          }
        />
        <HelperText
          style={{marginLeft: 25, marginRight: 25}}
          type="error"
          visible={auth.form.fields.passwordHasError}>
          {auth.form.fields.passwordErrorMsg}
        </HelperText>

        <View
          style={{
            marginTop: 0.0223 * height,
            marginLeft: 25,
            marginRight: 25,
            //borderColor: "#000",
            //borderWidth: 1,
            alignItems: 'flex-end',
          }}>
          {rightMessage}
        </View>

        <View style={{marginTop: 10}}></View>

        <Button
          icon="account"
          mode="contained"
          style={
            !auth.form.isValid || auth.form.isFetching
              ? theme.button_disabled
              : theme.button
          }
          labelStyle={
            !auth.form.isValid || auth.form.isFetching
              ? theme.button_label_disabled
              : theme.button_label
          }
          disabled={!auth.form.isValid || auth.form.isFetching}
          onPress={onButtonPress.bind(self)}
          accessibilityLabel="login button">
          {I18n.t('Login.login')}
        </Button>

        <View
          style={{
            marginTop: 0.0279 * height,
            marginBottom: 0.0279 * height,
          }}>
          {leftMessage}
          {nextMessage}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
