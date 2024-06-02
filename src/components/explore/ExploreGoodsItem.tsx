/**
 * # ExploreGoodsItem.tsx
 *
 *  The component item of goods item
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

import GoodItem from '../shop/GoodItem';

type Props = {
  id: any;
  item: any;
  name: string;
  article: string;
  barcode: string;
  imgUrl: string;
  price: number;
  isWeight: boolean;
  multiplicity: string;
  in_stock: number;
  active: boolean;
  arrayIndex: number;
  height: number;
  width: number;
  addToCart: Function;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  navigation: any;
};

export default function ExploreGoodsItem(props: Props) {
  const {
    id,
    item,
    name,
    article,
    barcode,
    imgUrl,
    price,
    isWeight,
    multiplicity,
    in_stock,
    active,
    arrayIndex,
    height,
    width,
    addToCart,
    theme,
    isFetching,
    navigation,
  } = props;

  //console.log('ExploreGoodsItem: ', index, height, width, isFetching);

  // if (isFetchhing) {
  //   return null;
  // }

  return (
    <GoodItem
      key={id}
      index={id}
      height={height}
      width={width}
      goodItem={item}
      theme={theme}
      isFetching={isFetching}
      addToCart={addToCart}></GoodItem>
  );
}
