/**
 * # Shop.tsx
 *
 *  The container to display the shop forms
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList, ShopParamList} from '../../../types';

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

import ShopListsScreen from './ShopLists';
import GoodsScreen from './Goods';
import GoodsDetailsScreen from './GoodsDetails';
import SearchGoodsScreen from './SearchGoods';
import SettingIcon from '../../icons/SettingIcon';
import ConnectionErr from '../error/ConnectionErr';

const Stack = createNativeStackNavigator<ShopParamList>();

/**
 * ### Translations
 */
 import I18n from '../../lib/i18n';

interface Props {
  navigation: BottomTabScreenProps<BottomTabParamList, 'ShopTab'>;
}

const Shop: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="ShopListsScreen"
        screenListeners={{
          state: e => {
            // Do something with the state
            //console.log('state changed', e.data);
          },
        }}>
        <Stack.Screen
          name="ShopListsScreen"
          component={ShopListsScreen}
          options={{
            headerShown: false,
            title: I18n.t('Orders.shop_title'),
          }}
        />
        <Stack.Screen
          name="GoodsScreen"
          component={GoodsScreen}
          options={{title: I18n.t('Orders.products_title')}}
        />
        <Stack.Screen
          name="GoodsDetailsScreen"
          component={GoodsDetailsScreen}
          options={{
            title: I18n.t('Orders.product_title'),
          }}
        />
        <Stack.Screen
          name="SearchGoodsScreen"
          component={SearchGoodsScreen}
          options={{
            title: I18n.t('Orders.search_title'),
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

export default Shop;
