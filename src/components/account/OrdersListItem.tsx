/**
 * # OrdersListItem.tsx
 *
 *  The component item of orders list item
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
  status: string;
  lines: any;
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

export default function OrdersListItem(props: Props) {
  const {
    id,
    item,
    status,
    lines,
    arrayIndex,
    height,
    width,
    theme,
    isFetching,
  } = props;

  const dispatch = useAppDispatch();

  // if (isFetchhing) {
  //   return null;
  // }

  return (
    <View
      key={id}
      style={{
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      <View
        style={{
          width: 0.1 * width,
          height: 0.09 * height,
          margin: 0.04 * width,
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'center',
        }}>
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
          source={require('../../../images/goods_bag.png')}
        />
      </View>
      <View
        style={{
          //borderColor: '#000000',
          //borderWidth: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            marginTop: 0.04 * width,
            paddingLeft: 5,
            paddingRight: 5,
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
              color: '#181725',
              marginBottom: 7,
            }}>
            {item.date_ts
              ? new Date(
                  item.date_ts[0],
                  item.date_ts[1]-1,
                  item.date_ts[2],
                  item.date_ts[3],
                  item.date_ts[4],
                  item.date_ts[5],
                  item.date_ts[6],
                ).toLocaleDateString()
              : null}
          </Text>
          <Text> </Text>
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '700',
              color: '#181725',
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
        <Text
          style={{
            paddingLeft: 5,
            fontSize: 0.0338 * width,
            fontWeight: '500',
            color: '#7C7C7C',
          }}>
          {item.time_slots[0].Desc}
        </Text>
      </View>
      <View
        style={{
          marginTop: 0.1 * width,
          marginBottom: 0.04 * width,
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
          {item.amount.toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 0.0435 * width,
            fontWeight: '500',
            color: '#7C7C7C',
          }}>
          {item.delivery_variants[0].price.toFixed(2)}
        </Text>
        <Text
          style={{
            fontSize: 0.0435 * width,
            fontWeight: '600',
            color: '#7C7C7C',
          }}>
          {lines.length} {I18n.t('Orders.positions')}
        </Text>
      </View>
    </View>
  );
}
