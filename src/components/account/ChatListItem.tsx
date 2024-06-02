/**
 * # ChatListItem.tsx
 *
 *  The component item of chat list item
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

type Props = {
  id: any;
  item: any;
  arrayIndex: number;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
};

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

export default function ChatListItem(props: Props) {
  const {id, item, arrayIndex, height, width, theme, isFetching} = props;

  const dispatch = useAppDispatch();

  // if (isFetchhing) {
  //   return null;
  // }

  return (
    <View
      key={id}
      style={{
        marginBottom: 5,
        alignItems: item.is_reply ? 'flex-start' : 'flex-end',
      }}>
      <View
        style={{
          borderColor: item.active ? '#030303' : '#E2E2E2',
          borderWidth: 1,
          borderRadius: 8,
          width: 0.8 * width,
          flexDirection: 'column',
          alignItems: item.is_reply ? 'flex-start' : 'flex-end',
          paddingLeft: 0.03 * width,
          paddingRight: 0.03 * width,
        }}>
        <View
          style={{
            marginTop: 0.02 * width,
            padding: 5,
            borderColor: '#000000',
            //borderWidth: 1,
            //alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '700',
              color: item.is_reply ? '#181725' : '#7C7C7C',
            }}>
            {item.message_text}
          </Text>
        </View>
        <Text
          style={{
            padding: 5,
            fontSize: 0.0338 * width,
            fontWeight: '500',
            color: '#7C7C7C',
          }}>
          {item.date_ts
            ? new Date(
                  item.date_ts[0],
                  item.date_ts[1]-1,
                  item.date_ts[2],
                  item.date_ts[3],
                  item.date_ts[4],
                  item.date_ts[5],
                  item.date_ts[6]
              ).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            : null}
        </Text>
      </View>
    </View>
  );
}
