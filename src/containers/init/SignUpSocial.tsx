/**
 * # SignUpSocial.tsx
 *
 * This class is a little complicated as it handles multiple states.
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

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {Auth} from '../../redux/selectors';
import {signupSocial} from '../../reducers/auth/authActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList, AuthStackScreenProps} from '../../../types';

import HeaderActivity from '../../components/controls/Header';
import RemoveIcon from '../../icons/RemoveIcon';

import {
  Appearance,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Button, Paragraph, Text} from 'react-native-paper';

import {SafeAreaView} from 'react-native-safe-area-context';

import styles from '../../config/styles';

import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * The states were interested in
 */
const {SIGNUP_SOCIAL} = require('../../config/constants').default;

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
        isValid: state.auth.form.isValid,
      },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({signupSocial}, dispatch),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

interface Props {
  navigation: AuthStackScreenProps<'SignUpSocial'>; //StackNavigationProp<AuthStackParamList, 'SignUpSocial'>;
}

const SignUpSocial: React.FC<Props> = ({navigation}) => {
  const auth = useAppSelector(Auth);
  const dispatch = useAppDispatch();

  //console.log('auth.form.isFetching: ', auth.form.isFetching);

  let onButtonPressFacebook = async () => {
    await dispatch(signupSocial('facebook')).catch(error => {
      var err_title = I18n.t('SignUpSocial.error_signup');
      var err_message = `${err_title} ${error}`;
      createAlert(err_message);
    });
  };

  let onButtonPressGoogle = async () => {
    console.log('onButtonPressGoogle');
    await dispatch(signupSocial('google')).catch(error => {
      var err_title = I18n.t('SignUpSocial.error_signup');
      var err_message = `${err_title} ${error}`;
      createAlert(err_message);
    });
  };

  let onButtonPressApple = async () => {
    await dispatch(signupSocial('apple')).catch(error => {
      var err_title = I18n.t('SignUpSocial.error_signup');
      var err_message = `${err_title} ${error}`;
      createAlert(err_message);
    });
  };

  let onButtonPressRegister = async () => {
    await navigation.navigate('Register', {undefined});
  };

  let onButtonPressSkip = async () => {
    if(auth.userArea && auth.userWarehouse){
      await navigation.replace('RootInit');
    }else{
      await navigation.replace('InitSelectLocation');
    }
  };

  let onButtonPressLogin = async () => {
    await navigation.navigate('Login', {undefined});
  };

  //const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />  */}
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
        <Image
          source={require('../../../images/initback1.png')}
          style={{width: width, height: height / 3, marginBottom: 15}}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            marginTop: 15,
            marginRight: 15,
          }}>
          <TouchableOpacity onPress={() => onButtonPressSkip()}>
            <RemoveIcon width={24} height={24} color={'#030303'}></RemoveIcon>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 0,
            marginLeft: 25,
            marginRight: 25,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 0.0629 * width,
              fontWeight: '600',
              color: '#030303',
            }}>
            {I18n.t('SignUpSocial.get_groceries')}
          </Text>
          <Text
            style={{
              fontSize: 0.0629 * width,
              fontWeight: '600',
              color: '#030303',
            }}>
            {I18n.t('SignUpSocial.pgstore')}
          </Text>
        </View>
        <View style={{}}>
          <HeaderActivity isFetching={auth.form.isFetching} />
          <View style={{}}>
            <Button
              icon="google"
              mode="contained"
              uppercase={false}
              style={styles.button_signin}
              labelStyle={styles.button_signin_label}
              disabled={auth.form.isFetching}
              onPress={onButtonPressGoogle}
              accessibilityLabel="Google button">
              {I18n.t('SignUpSocial.google')}
            </Button>
          </View>
          <View style={{}}>
            <Button
              icon="facebook"
              mode="contained"
              uppercase={false}
              style={styles.button_signin}
              labelStyle={styles.button_signin_label}
              disabled={auth.form.isFetching}
              onPress={onButtonPressFacebook}
              accessibilityLabel="Facebook button">
              {I18n.t('SignUpSocial.facebook')}
            </Button>
          </View>
          {Platform.OS === 'ios' ? (
            <View style={{}}>
              <Button
                icon="apple"
                mode="contained"
                uppercase={false}
                style={styles.button_signin}
                labelStyle={styles.button_signin_label}
                disabled={auth.form.isFetching}
                onPress={onButtonPressApple}
                accessibilityLabel="Apple button">
                {I18n.t('SignUpSocial.apple')}
              </Button>
            </View>
          ) : null}
          <View style={{}}>
            <Button
              icon="account"
              mode="contained"
              uppercase={false}
              style={styles.button_signin2}
              labelStyle={styles.button_signin_label2}
              disabled={auth.form.isFetching}
              onPress={onButtonPressLogin}
              accessibilityLabel="Login button">
              {I18n.t('Login.Login')}
            </Button>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            marginBottom: 15,
            marginLeft: 25,
            marginRight: 25,
          }}>
          <Button mode="text" uppercase={false} onPress={onButtonPressRegister}>
            <Text style={styles.button_text_outlined}>
              {I18n.t('SignUpSocial.new_user')}{' '}
            </Text>
            <Text style={styles.button_text_outlined2}>
              {I18n.t('SignUpSocial.create_account')}
            </Text>
          </Button>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 15,
            marginLeft: 25,
            marginRight: 25,
          }}>
          <Button mode="text" uppercase={false} onPress={onButtonPressSkip}>
            <Text style={styles.button_text_outlined}>
              {I18n.t('SignUpSocial.skip')}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpSocial);

// Alert dialog
const createAlert = message =>
  Alert.alert('Warning!', message, [{text: 'Done'}]);
