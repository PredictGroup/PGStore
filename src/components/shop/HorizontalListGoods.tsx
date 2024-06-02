/**
 * # HorizontalListGoods.tsx
 *
 *  The component banner horizontal list of goods
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

import AddIcon from '../../icons/AddIcon';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';
import GoodItem from './GoodItem';

import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ShopParamList, BottomTabParamList} from '../../../types';

// import * as AppNavigation from "../../components/nav/AppNavigation";
// import { useNavigation } from '@react-navigation/native';

type Props = {
  height: number;
  width: number;
  goodsList: never[];
  navigation: any;//StackNavigationProp<ShopParamList, 'ShopListsScreen'>;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  blockName: string;
  blockTitle: string;
  group_id: string;
  addToCart: () => void;
};

export default function HorizontalListGoods(props: Props) {
  const {
    height,
    width,
    goodsList,
    navigation,
    theme,
    isFetching,
    blockName,
    blockTitle,
    group_id,
    addToCart,
  } = props;

  const [groupGoodsFiltered, setGoodsList] = React.useState(goodsList);

  React.useEffect(() => {
    //console.log('HorizontalListGoods useEffect: ');
    setGoodsList(goodsList);
  }, [goodsList]);

  //console.log('HorizontalListGoods: ', navigation);

  // if (isFetching) {
  //   return (
  //     <View style={theme.act_container}>
  //       <HeaderActivity isFetching={isFetching} />
  //     </View>
  //   );
  // }

  let _goToGoodsDetails = async (id: string) => {
    //console.log('_goToGoodsDetails: ', id);
    await navigation.navigate('GoodsDetailsScreen', {good_id: id});
  };

  let renderGoodsList = () => {
    return groupGoodsFiltered.map(function (item, index, navigation) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            _goToGoodsDetails(item._id);
          }}>
          <GoodItem
            key={index}
            index={index}
            height={height}
            width={width}
            goodItem={item}
            theme={theme}
            isFetching={isFetching}
            addToCart={addToCart}
            ></GoodItem>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={{
        marginTop: 0.01116 * height,
        marginLeft: 0.0483 * width,
        marginRight: 0.0483 * width,
      }}>
      <View
        style={{
          marginBottom: 20,
          marginLeft: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 0.058 * width,
            fontWeight: '600',
            color: '#181725',
          }}>
          {blockTitle}
        </Text>

        <Button
          labelStyle={{
            fontSize: 0.0387 * width,
            fontWeight: '600',
            color: '#53B175',
          }}
          mode="text"
          uppercase={false}
          onPress={() =>
            navigation.navigate('GoodsScreen', {blockName: blockName, blockTitle: blockTitle,groupGoodsFiltered: groupGoodsFiltered})
          }>
          больше
        </Button>
      </View>

      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row'}}>
        {renderGoodsList()}
      </ScrollView>
    </View>
  );
}
