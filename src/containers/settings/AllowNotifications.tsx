/**
 * # AllowNotifications.js
 *
 *
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
import messaging from '@react-native-firebase/messaging';

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {Auth, StoreData} from '../../redux/selectors';
import {onAuthFormFieldChange, logout} from '../../reducers/auth/authActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../types';

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
import {Dropdown} from 'react-native-element-dropdown';

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
    storedata: state.storedata,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        onAuthFormFieldChange,
        logout,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'AllowNotifications'>;
}

const AllowNotifications: React.FC<Props> = ({navigation}) => {
  const _Auth = useAppSelector(Auth);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  let self = this;

  /**
   * When the button is pressed, send the info to server
   */
  let onButtonPress = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      if (Platform.OS === 'ios') {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging()
            .registerDeviceForRemoteMessages()
            .then(() => {
              navigation.replace('Root');
            });
        } else {
          navigation.replace('Root');
        }
      } else {
        const authorizationStatus = await messaging().requestPermission();

        if (authorizationStatus) {
          console.log('Permission status:', authorizationStatus);
          if (
            authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED
          ) {
            console.log('У пользователя включены разрешения на уведомления');
            createAlert('У пользователя включены разрешения на уведомления');
          } else if (
            authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
          ) {
            console.log('У пользователя включены разрешения на уведомления');
            createAlert('У пользователя включены разрешения на уведомления');
          } else {
            console.log('У пользователя отключены разрешения на уведомления');
            createAlert('У пользователя отключены разрешения на уведомления');
          }
          navigation.replace('Root');
        }
      }

      console.log('Authorization status:', authStatus);
    }
  };

  let onButtonPressSkip = async () => {
    await navigation.replace('Root');
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
          <View
            style={{
              marginTop: 0.0446 * height,
            }}></View>
          <HeaderActivity isFetching={_Auth.form.isFetching} />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: width,
              paddingLeft: 25,
              paddingRight: 25,
              marginBottom: 40,
            }}>
            <Text
              style={{
                fontSize: 0.0629 * width,
                fontWeight: '600',
                color: '#030303',
              }}>
              {I18n.t('Orders.allow_notifications')}
            </Text>
            <Text
              style={{
                fontSize: 0.0387 * width,
                fontWeight: '600',
                color: '#7C7C7C',
                marginTop: 0.0167 * height,
                textAlign: 'center',
              }}>
              {I18n.t('Orders.allow_notifications_text')}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            width: width,
            paddingLeft: 25,
            paddingRight: 25,
            flexDirection: 'column',
          }}></View>

        <View style={{marginTop: 10}}></View>

        <Button
          mode="contained"
          style={theme.button}
          labelStyle={theme.button_label}
          disabled={_Auth.form.isFetching}
          onPress={onButtonPress.bind(self)}
          accessibilityLabel="Submit">
          {I18n.t('Orders.allow_notifications')}
        </Button>
        <View
          style={{
            marginTop: 5,
            marginBottom: 15,
            marginLeft: 25,
            marginRight: 25,
          }}></View>
        <Button mode="text" uppercase={false} onPress={onButtonPressSkip}>
          <Text style={theme.button_text_outlined}>
            {I18n.t('SignUpSocial.skip')}
          </Text>
        </Button>
        <View
          style={{
            marginBottom: 0.0279 * height,
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllowNotifications);

// Alert dialog
const createAlert = message => Alert.alert('Info!', message, [{text: 'Done'}]);
