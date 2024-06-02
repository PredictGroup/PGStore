/**
 * # CartListItem.tsx
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

import AuthContext from '../../../src/components/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks';

import RemoveIcon from '../../icons/RemoveIcon';
import AddIcon from '../../icons/AddIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';

type Props = {
  id: any;
  item: any;
  goodDetails: any;
  active: boolean;
  arrayIndex: number;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  addToCart: Function;
};

export default function CartListItem(props: Props) {
  const {
    id,
    item,
    goodDetails,
    active,
    arrayIndex,
    height,
    width,
    theme,
    isFetching,
    addToCart,
  } = props;

  const dispatch = useAppDispatch();

  const {isSignedIn} = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [qty_in_cart, setQty_in_cart] = useState(item.qty);

  //console.log('CartListItem: ', goodDetails);

  // if (isFetchhing) {
  //   return null;
  // }

  React.useEffect(() => {
    setQty_in_cart(item.qty);
  }, [item]); // 👈️ add props as dependencies

  const _addToCart = async (qty: number) => {
    var qtyToAdd: number = 0.0;
    if (qty_in_cart) {
      qtyToAdd = qty_in_cart + qty;
    } else {
      qtyToAdd = qtyToAdd + qty;
    }
    setQty_in_cart(qtyToAdd);
    //console.log("_addToCart: ", goodItem._id, qtyToAdd, goodItem.price);
    await dispatch(addToCart(goodDetails._id, qtyToAdd, item.price, item.price_info, goodDetails.in_stock, false));
  };

  const _setToCart = async (qty: number) => {
    console.log('_setToCart: ', isSignedIn, qty);
    if (isSignedIn) {
      //console.log("_addToCart: ", goodItem._id, qtyToAdd, goodItem.price);
      await dispatch(addToCart(goodDetails._id, qty, item.price, item.price_info, goodDetails.in_stock, false));
    } else {
      navigation.replace('SignUpSocial');
    }
  };

  const _onChangeQty = async (qty: number) => {
    if (qty === 0) {
      setQty_in_cart(qty);
      await dispatch(addToCart(goodDetails._id, qty, item.price, item.price_info, goodDetails.in_stock, false));
    } else {
      setQty_in_cart(qty);
    }
  };

  return (
    <View
      key={id}
      style={{
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            {goodDetails.multiplicity},${goodDetails.price}
          </Text>
          <View
            style={{
              //borderColor: '#000000',
              //borderWidth: 1,
              marginTop: 12,
            }}>
            {!qty_in_cart && !isFetching ? (
              <TouchableOpacity
                disabled={isFetching}
                onPress={() => {
                  _addToCart(1);
                }}>
                <AddIcon color={'#00B36F'} width={47} height={47}></AddIcon>
              </TouchableOpacity>
            ) : null}
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
                    <MinusIcon
                      color={'#B3B3B3'}
                      width={17}
                      height={17}></MinusIcon>
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
                    <PlusIcon
                      color={'#00B36F'}
                      width={17}
                      height={17}></PlusIcon>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
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
        <TouchableOpacity
          disabled={isFetching}
          onPress={() => _addToCart(-1 * qty_in_cart)}>
          <View style={{padding: 5}}>
            <RemoveIcon width={14} height={14} color={'#B3B3B3'}></RemoveIcon>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 0.0435 * width,
            fontWeight: '600',
            color: '#181725',
          }}>
          {qty_in_cart
            ? (goodDetails.price * qty_in_cart).toFixed(2)
            : goodDetails.price}
        </Text>
      </View>
    </View>
  );
}
