/**
 * # OrderListItem.tsx
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
  TextInput,
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
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

import AuthContext from '../../../../src/components/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../hooks';

type Props = {
  id: any;
  item: any;
  goodDetails: any;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
};

export default function OrderListItem(props: Props) {
  const {
    id,
    item,
    goodDetails,
    height,
    width,
    theme,
    isFetching,
  } = props;

  const dispatch = useAppDispatch();

  const {isSignedIn} = React.useContext(AuthContext);
  const navigation = useNavigation();


  //console.log('CartListItem: ', goodDetails.in_stock);

  // if (isFetchhing) {
  //   return null;
  // }

  return (
    <View
      key={id}
      style={{
        borderBottomColor: item.in_stock === 0 || item.preorder ? '#53B175' : '#E2E2E2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: item.in_stock === 0 || item.preorder ? '#53B175' : '#fff',
        borderWidth: 1,
      }}>
      <View
        style={{
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 0.1208 * width,
            height: 0.095 * height,
            margin: 0.064 * width,
            //borderColor: '#000000',
            //borderWidth: 1,
            alignItems: 'center',
          }}>
          {goodDetails.imgUrl ? (
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
                aspectRatio: 1,
                //borderColor: "#000000",
                //borderWidth: 1,
              }}
              source={{
                uri: `${goodDetails.imgUrl}`,
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            //borderColor: '#000000',
            //borderWidth: 1,
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginTop: 0.04 * width,
            marginLeft: 0.04 * width,
            maxWidth: 0.4 * width,
          }}>
          {item.in_stock === 0 || item.preorder ? (
            <Text
              style={{
                fontSize: 0.035 * width,
                fontWeight: '400',
                color: '#53B175',
                marginBottom: 7,
              }}>
              предзаказ
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '700',
              color: '#181725',
              marginBottom: 7,
            }}>
            {goodDetails.Name}
          </Text>
          <Text
            style={{
              fontSize: 0.0338 * width,
              fontWeight: '500',
              color: '#7C7C7C',
            }}>
            {goodDetails.multiplicity},{item.price_info}
          </Text>
          <View
            style={{
              //borderColor: '#000000',
              //borderWidth: 1,
              marginTop: 12,
            }}>

          </View>
        </View>
      </View>
      <View
        style={{
          borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexDirection: 'column',
          marginRight: 0.064 * width,
          height: 0.09 * height,
        }}>
        <Text
          style={{
            fontSize: 0.0435 * width,
            fontWeight: '600',
            color: '#181725',
          }}>
          {(item.price * item.qty).toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 0.0400 * width,
            fontWeight: '500',
            color: '#181725',
          }}>
          {item.qty} уп.
        </Text>
      </View>
    </View>
  );
}
