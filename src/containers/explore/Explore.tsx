/**
 * # Explore.tsx
 *
 *  The container to display the explore forms
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabParamList, ExploreParamList} from '../../../types';

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

import ExploreGroupsScreen from './ExploreGroups';
import GoodsScreen from './Goods';
import GoodsDetailsScreen from './GoodsDetails';
import SearchGoodsScreen from './SearchGoods';
import SettingIcon from '../../icons/SettingIcon';
import ConnectionErr from '../error/ConnectionErr';

const Stack = createNativeStackNavigator<ExploreParamList>();

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

interface Props {
  navigation: BottomTabScreenProps<BottomTabParamList, 'ExploreTab'>;
}

const Explore: React.FC<Props> = ({navigation}) => {
  const [visibleExploreGroups, setVisibleExploreGroups] = React.useState(false);
  const openMenuExploreGroups = () => setVisibleExploreGroups(true);
  const closeMenuExploreGroups = () => setVisibleExploreGroups(false);

  const theme = useTheme();

  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="ExploreGroupsScreen"
        screenListeners={{
          state: e => {
            // Do something with the state
            //console.log('state changed', e.data);
          },
        }}>
        <Stack.Screen
          name="ExploreGroupsScreen"
          component={ExploreGroupsScreen}
          options={{
            title: I18n.t('Orders.find_product_title'),
            /* headerRight: () => (
              <Menu
                visible={visibleExploreGroups}
                onDismiss={closeMenuExploreGroups}
                anchor={
                  <TouchableOpacity onPress={openMenuExploreGroups}>
                    <SettingIcon width={18} height={18}></SettingIcon>
                  </TouchableOpacity>
                }>
                <Menu.Item onPress={() => {}} title="Item 1" />
                <Menu.Item onPress={() => {}} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => {}} title="Item 3" />
              </Menu>
            ), */
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

export default Explore;
