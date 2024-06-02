/**
 * # Settings.tsx
 *
 *  The container to display the settings forms
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList, AccountSettingsParamList} from '../../../types';

import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TouchableOpacity} from 'react-native';

import {
  Provider,
  Menu,
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

import AccountScreen from './Account';
import RemoveUserDataScreen from './RemoveUserData';
import OrdersScreen from './Orders';
import OrderListScreen from './orders/OrderList';
import MessagesScreen from './Messages';
import ChatScreen from './Chat';
import AboutScreen from './About';
import UserDetails from './UserDetails';
import FavoritesScreen from '../favorites/Favorites';
import SettingIcon from '../../icons/SettingIcon';
import ConnectionErr from '../error/ConnectionErr';

const Stack = createNativeStackNavigator<AccountSettingsParamList>();

interface Props {
  navigation: BottomTabScreenProps<BottomTabParamList, 'AccountTab'>;
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

const Settings: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="AccountScreen"
        screenListeners={{
          state: e => {
            // Do something with the state
            //console.log('state changed', e.data);
          },
        }}>
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{headerShown: false, title: I18n.t('Orders.account_title')}}
        />
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{
            title: I18n.t('Orders.messages'),
          }}
        />
        <Stack.Screen
          name="OrdersScreen"
          component={OrdersScreen}
          options={{
            title: I18n.t('Orders.my_orders_title'),
          }}
        />
        <Stack.Screen
          name="OrderListScreen"
          component={OrderListScreen}
          options={{
            title: I18n.t('Orders.my_orders_title'),
          }}
        />
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            title: I18n.t('Orders.favorite_title'),
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: I18n.t('Orders.chat'),
          }}
        />
        <Stack.Screen
          name="RemoveUserDataScreen"
          component={RemoveUserDataScreen}
          options={{
            title: I18n.t('Orders.remove_user_title'),
          }}
        />
        <Stack.Screen
          name="UserDetailsScreen"
          component={UserDetails}
          options={{
            title: I18n.t('Orders.user_details'),
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            title: I18n.t('Orders.about_title'),
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Settings;
