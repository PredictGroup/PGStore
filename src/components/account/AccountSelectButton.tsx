/**
 * # AccountSelectButton.tsx
 *
 *  The component account menu select account button
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Paragraph,
  Switch,
  Badge,
  Divider,
  Searchbar,
  Title,
  Button,
  TextInput,
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

import {useAppDispatch} from '../../hooks';

import OrdersIcon from '../../icons/OrdersIcon';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import UserDataIcon from '../../icons/UserDataIcon';
import MessagesIcon from '../../icons/MessagesIcon';
import AboutIcon from '../../icons/AboutIcon';
import ChatIcon from '../../icons/ChatIcon';
import UserDetailsIcon from '../../icons/UserDetailsIcon';

import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AccountSettingsParamList, BottomTabParamList} from '../../../types';
import FavoriteItemIcon from '../../icons/FavoriteItemIcon';

type Props = {
  height: number;
  width: number;
  name: string;
  badge_val: number | undefined;
  navigation: StackNavigationProp<AccountSettingsParamList, 'AccountScreen'>;
  navigateTo: string;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
};

export default function AccountSelectButton(props: Props) {
  const {
    height,
    width,
    name,
    badge_val,
    navigation,
    navigateTo,
    theme,
    isFetching,
  } = props;
  const dispatch = useAppDispatch();

  const _navigateTo = async () => {
    navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        _navigateTo();
      }}>
      <View
        style={{
          borderColor: '#E2E2E2',
          //borderBottomWidth: 1,
          //borderTopWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 0.0483 * width,
          paddingRight: 0.0483 * width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#000000',
            //borderWidth: 1,
          }}>
          {navigateTo === 'AboutScreen' ? (
            <AboutIcon color={'#181725'} width={20} height={20}></AboutIcon>
          ) : navigateTo === 'MessagesScreen' ? (
            <MessagesIcon
              color={'#181725'}
              width={20}
              height={20}></MessagesIcon>
          ) : navigateTo === 'OrdersScreen' ? (
            <OrdersIcon color={'#181725'} width={21} height={23}></OrdersIcon>
          ) : navigateTo === 'FavoritesScreen' ? (
            <FavoriteItemIcon
              color={'#181725'}
              width={22}
              height={22}></FavoriteItemIcon>
          ) : navigateTo === 'RemoveUserDataScreen' ? (
            <UserDataIcon
              color={'#181725'}
              width={22}
              height={22}></UserDataIcon>
          ) : navigateTo === 'ChatScreen' ? (
            <ChatIcon color={'#181725'} width={22} height={22}></ChatIcon>
          ) : navigateTo === 'UserDetailsScreen' ? (
            <UserDetailsIcon
              color={'#181725'}
              width={22}
              height={22}></UserDetailsIcon>
          ) : null}
          <Text
            style={{
              fontSize: 0.0435 * width,
              fontWeight: '600',
              color: '#181725',
              marginLeft: 20,
            }}>
            {name}
          </Text>
          {badge_val ? (
            <Badge style={{marginLeft: 8, marginBottom: 2}}>{badge_val}</Badge>
          ) : null}
        </View>
        <ArrowLeftIcon color={'#181725'} width={14} height={14}></ArrowLeftIcon>
      </View>
    </TouchableOpacity>
  );
}
