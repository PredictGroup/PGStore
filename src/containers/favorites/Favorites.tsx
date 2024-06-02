/**
 * # Favorites.tsx
 *
 *  The container to display the favorites forms
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList, FavoritesParamList, FavoritesScreenRouteProp,} from '../../../types';

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

import FavoritesListScreen from './FavoritesList';
import GoodsDetailsScreen from './GoodsDetails';
import SettingIcon from '../../icons/SettingIcon';
import ConnectionErr from '../error/ConnectionErr';

const Stack = createNativeStackNavigator<FavoritesParamList>();

/**
 * ### Translations
 */
 import I18n from '../../lib/i18n';

interface Props {
  route: FavoritesScreenRouteProp;
  navigation: BottomTabScreenProps<BottomTabParamList, 'FavoriteTab'>;
}

const Favorites: React.FC<Props> = ({route, navigation}) => {
  const [visibleFavoritesGroups, setVisibleFavoritesGroups] =
    React.useState(false);
  const openMenuFavoritesGroups = () => setVisibleFavoritesGroups(true);
  const closeMenuFavoritesGroups = () => setVisibleFavoritesGroups(false);

  const theme = useTheme();

  React.useEffect(() => {
    console.log('Favorites: ', route);
  }, []);

  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="FavoritesListScreen"
        screenOptions={{headerShown: route.name === "FavoritesScreen" ? false : true}}
        screenListeners={{
          state: e => {
            // Do something with the state
            //console.log('state changed', e.data);
          },
        }}>
        <Stack.Screen
          name="FavoritesListScreen"
          component={FavoritesListScreen}
          options={{
            title: I18n.t('Orders.favorite_title'),
            /* headerRight: () => (
              <Menu
                visible={visibleFavoritesGroups}
                onDismiss={closeMenuFavoritesGroups}
                anchor={
                  <TouchableOpacity onPress={openMenuFavoritesGroups}>
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
          name="ConnectionErr"
          component={ConnectionErr}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Favorites;
