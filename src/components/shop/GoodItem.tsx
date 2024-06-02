/**
 * # GoodItem.tsx
 *
 *  The component item of goods
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
  TextInput,
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

import {useAppDispatch} from '../../hooks';

import AuthContext from '../../../src/components/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';

import AddIcon from '../../icons/AddIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';

type Props = {
  index: number;
  height: number;
  width: number;
  goodItem: any;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  addToCart: Function;
};

export default function GoodItem(props: Props) {
  const {index, height, width, goodItem, theme, isFetching, addToCart} = props;
  const dispatch = useAppDispatch();
  const {isSignedIn} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [qty_in_cart, setQty_in_cart] = useState(goodItem.ordered_qty);

  React.useEffect(() => {
    //console.log('GoodItem React.useEffect: ');
    setQty_in_cart(goodItem.ordered_qty);
  }, [goodItem]); // 👈️ add props as dependencies

  const _addToCart = async (qty: number) => {
    console.log('_addToCart: ', isSignedIn, qty);
    if (isSignedIn) {
      var qtyToAdd: number = 0.0;
      if (qty_in_cart) {
        qtyToAdd = qty_in_cart + qty;
      } else {
        qtyToAdd = qtyToAdd + qty;
      }
      setQty_in_cart(qtyToAdd);
      console.log('_addToCart: ', goodItem._id, qtyToAdd, goodItem.price);
      await dispatch(addToCart(goodItem._id, qtyToAdd, goodItem.price, goodItem.price_info, goodItem.in_stock, false));
    } else {
      navigation.replace('SignUpSocial');
    }
  };

  const _setToCart = async (qty: number) => {
    console.log('_setToCart: ', isSignedIn, qty);
    if (isSignedIn) {
      //console.log("_addToCart: ", goodItem._id, qtyToAdd, goodItem.price);
      await dispatch(addToCart(goodItem._id, qty, goodItem.price, goodItem.price_info, goodItem.in_stock, false));
    } else {
      navigation.replace('SignUpSocial');
    }
  };

  const _onChangeQty = async (qty: number) => {
    if (qty === 0) {
      setQty_in_cart(qty);
      await dispatch(addToCart(goodItem._id, qty, goodItem.price, goodItem.price_info, goodItem.in_stock, false));
    } else {
      setQty_in_cart(qty);
    }
  };

  return (
    <View
      key={index}
      style={{
        flex: 1,
        borderColor: '#E2E2E2',
        borderRadius: 18,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 0.423 * width,
      }}>
      <View
        style={{
          width: 0.2415 * width,
          height: 0.095 * height,
          margin: 0.064 * width,
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'center',
        }}>
        {goodItem.imgUrl ? (
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
              uri: `${goodItem.imgUrl}`,
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'flex-start',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 0.0387 * width,
            fontWeight: '700',
            color: '#181725',
          }}>
          {goodItem.Name}
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 5,
          //borderColor: '#000000',
          //borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 0.0338 * width,
            fontWeight: '500',
            color: '#7C7C7C',
          }}>
          {goodItem.multiplicity},${goodItem.price}
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 20,
          marginBottom: 15,
          //borderColor: '#000000',
          //borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 0.0435 * width,
            fontWeight: '500',
            color: '#181725',
          }}>
          {qty_in_cart
            ? (goodItem.price * qty_in_cart).toFixed(2)
            : goodItem.price}
        </Text>

        {!qty_in_cart ? (
          <TouchableOpacity
            disabled={isFetching}
            onPress={() => {
              _addToCart(1);
            }}>
            <AddIcon color={'#00B36F'} width={47} height={47}></AddIcon>
          </TouchableOpacity>
        ) : null}
      </View>
      {qty_in_cart ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            disabled={isFetching}
            onPress={() => {
              _addToCart(-1);
            }}>
            <View
              style={{
                padding: 14,
                borderColor: '#B3B3B3',
                borderWidth: 1,
                borderRadius: 17,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MinusIcon color={'#B3B3B3'} width={17} height={17}></MinusIcon>
            </View>
          </TouchableOpacity>
          {isSignedIn ? (
            <TextInput
              style={{
                fontSize: 0.0435 * width,
                fontWeight: '600',
                color: '#181725',
                padding: 10,
                marginLeft: 2,
                marginRight: 2,
                borderColor: '#000000',
                //borderWidth: 1,
              }}
              selectTextOnFocus
              keyboardType="numeric"
              maxLength={2}
              value={String(qty_in_cart)}
              onChangeText={text => _onChangeQty(Number(text))}
              onSubmitEditing={() => {
                _setToCart(qty_in_cart);
              }}
              onEndEditing={() => {
                _setToCart(qty_in_cart);
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: 0.0435 * width,
                fontWeight: '600',
                color: '#181725',
                padding: 12,
                marginLeft: 2,
                marginRight: 2,
                borderColor: '#000000',
                //borderWidth: 1,
              }}>
              {qty_in_cart}
            </Text>
          )}
          <TouchableOpacity
            disabled={isFetching}
            onPress={() => {
              _addToCart(1);
            }}>
            <View
              style={{
                padding: 14,
                borderColor: '#B3B3B3',
                borderWidth: 1,
                borderRadius: 17,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <PlusIcon color={'#00B36F'} width={17} height={17}></PlusIcon>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
