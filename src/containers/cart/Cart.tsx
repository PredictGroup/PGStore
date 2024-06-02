/**
 * # Cart.tsx
 *
 *  The container to display the cart forms
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList, CartParamList} from '../../../types';

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

import CartListScreen from './CartList';
import GoodsDetailsScreen from './GoodsDetails';
import CheckOutScreen from './CheckOut';
import SuccessScreen from './Success';
import SettingIcon from '../../icons/SettingIcon';
import ConnectionErr from '../error/ConnectionErr';

const Stack = createNativeStackNavigator<CartParamList>();

interface Props {
  navigation: BottomTabScreenProps<BottomTabParamList, 'CartTab'>;
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

const Cart: React.FC<Props> = ({navigation}) => {
  const [visibleCartGroups, setVisibleCartGroups] = React.useState(false);
  const openMenuCartGroups = () => setVisibleCartGroups(true);
  const closeMenuCartGroups = () => setVisibleCartGroups(false);

  const theme = useTheme();

  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="CartListScreen"
        screenListeners={{
          state: e => {
            // Do something with the state
            //console.log('state changed', e.data);
          },
        }}>
        <Stack.Screen
          name="CartListScreen"
          component={CartListScreen}
          options={{
            title: I18n.t('Orders.my_cart_title'),
            /* headerRight: () => (
              <Menu
                visible={visibleCartGroups}
                onDismiss={closeMenuCartGroups}
                anchor={
                  <TouchableOpacity onPress={openMenuCartGroups}>
                    <SettingIcon width={18} height={18}></SettingIcon>
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => {}} title="Item 1" />
                <Menu.Item onPress={() => {}} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Clear all" />
              </Menu>
            ), */
          }}
        />
        <Stack.Screen
          name="GoodsDetailsScreen"
          component={GoodsDetailsScreen}
          options={{
            title: I18n.t('Orders.product_title'),
          }}
        />
        <Stack.Screen
          name="CheckOutScreen"
          component={CheckOutScreen}
          options={{
            title: I18n.t('Orders.check_out_title'),
          }}
        />
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{
            title: I18n.t('Orders.success_title'),
          }}
        />
        <Stack.Screen
          name="ConnectionErr"
          component={ConnectionErr}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Cart;
