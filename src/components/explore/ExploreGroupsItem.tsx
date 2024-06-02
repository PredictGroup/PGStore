/**
 * # ExploreGroupsItem.tsx
 *
 *  The component item of groups item
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

type Props = {
  id: any;
  item: any;
  name: string;
  imgUrl: string;
  color: string;
  borderColor: string;
  isExplore: boolean;
  Active: boolean;
  arrayIndex: number;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
};

export default function ExploreGroupsItem(props: Props) {
  const {
    id,
    item,
    name,
    imgUrl,
    color,
    borderColor,
    isExplore,
    Active,
    arrayIndex,
    height,
    width,
    theme,
    isFetching,
  } = props;

  //console.log('ExploreGroupsItem: ', index, height, width, isFetching);

  // if (isFetchhing) {
  //   return null;
  // }

  const COLORS = {
    color: color,
    borderColor: borderColor,
  };

  return (
    <View
      key={id}
      style={{
        borderColor: COLORS.borderColor,
        backgroundColor: COLORS.color,
        borderRadius: 18,
        borderWidth: 1,
        marginLeft: 6,
        marginRight: 6,
        marginBottom: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.423 * width,
        minHeight: 0.212 * height,
      }}>
      <View
        style={{
          width: 0.3 * width,
          height: 0.1 * height,
          margin: 0.0301 * width,
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'center',
        }}>
        {imgUrl ? (
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain',
              aspectRatio: 1,
              //borderColor: "#000000",
              //borderWidth: 1,
              //borderRadius: 24,
            }}
            source={{
              uri: `${imgUrl}`,
            }}
          />
        ) : null}
      </View>
      <Text
        style={{
          fontSize: 0.0386 * width,
          fontWeight: '700',
          color: '#181725',
          marginBottom: 0.0292 * height,
          textAlign: 'center',
        }}>
        {name}
      </Text>
    </View>
  );
}
