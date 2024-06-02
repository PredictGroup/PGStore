/**
 * # GoodDetails.tsx
 *
 *  The component of goods details
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
  List,
  Searchbar,
  Title,
  Button,
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

import {useAppDispatch} from '../../hooks';

import AuthContext from '../../../src/components/auth/AuthContext';

import HeaderActivity from '../../components/controls/Header';

import AddFavoritesIcon from '../../icons/AddFavoritesIcon';
import RemFavoritesIcon from '../../icons/RemFavoritesIcon';
import AddIcon from '../../icons/AddIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';

type Props = {
  height: number;
  width: number;
  goodItem: any;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  addToCart: Function;
  addToFavorites: Function;
  navigation: any;
};

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

export default function GoodDetails(props: Props) {
  const {
    height,
    width,
    goodItem,
    theme,
    isFetching,
    addToCart,
    addToFavorites,
    navigation,
  } = props;
  const dispatch = useAppDispatch();

  const {isSignedIn} = React.useContext(AuthContext);

  const [expandedDetailsAction, setExpandedDetailsAction] =
    React.useState(false);
  const handlePressExpandDetailsAction = () =>
    setExpandedDetailsAction(!expandedDetailsAction);
  const [expandedNutritionsAction, setExpandedNutritionsAction] =
    React.useState(false);
  const handlePressExpandNutritionsAction = () =>
    setExpandedNutritionsAction(!expandedNutritionsAction);

  const [qty_in_cart, setQty_in_cart] = useState(goodItem.ordered_qty);
  const [favorite, setFavorite] = useState(goodItem.favorites);

  React.useEffect(() => {
    console.log("GoodDetails React.useEffect: ");
    setQty_in_cart(goodItem.ordered_qty);
    //setFavorite(goodItem.favorites);
  }, [goodItem]); // 👈️ add props as dependencies

  React.useEffect(() => {
    setFavorite(goodItem.favorites);
  }, [goodItem]); // 👈️ add props as dependencies

  const _addToCart = async (qty: number) => {
    if (isSignedIn) {
      var qtyToAdd: number = 0.0;
      if (qty_in_cart) {
        qtyToAdd = qty_in_cart + qty;
      } else {
        qtyToAdd = qtyToAdd + qty;
      }
      setQty_in_cart(qtyToAdd);
      //console.log("_addToCart: ", goodItem._id, qtyToAdd, goodItem.price);
      await dispatch(addToCart(goodItem._id, qtyToAdd, goodItem.price, goodItem.price_info, goodItem.in_stock, false));
    } else {
      await navigation.replace('SignUpSocial');
    }
  };

  const _setToCart = async (qty: number) => {
    console.log('_setToCart: ', isSignedIn, navigation);
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

  const _addToFavorites = async () => {
    if (isSignedIn) {
      const nextFavoriteState = favorite ? !favorite : true;
      setFavorite(nextFavoriteState);
      //console.log("_addToFavorites: ", goodItem._id, nextFavoriteState);
      await dispatch(addToFavorites(goodItem._id, nextFavoriteState));
    } else {
      await navigation.replace('SignUpSocial');
    }
  };

  if (!goodItem) {
    return (
      <View style={theme.act_container}>
        <HeaderActivity isFetching={true} />
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{
        flexGrow: 1,
        padding: 0,
        margin: 0,
      }}>
      <View
        style={{
          flexGrow: 1,
          borderColor: '#E2E2E2',
          backgroundColor: '#F2F3F2',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          //borderWidth: 1,

          marginBottom: 10,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
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
      </View>
      <View
        style={{
          flexGrow: 1,
          marginLeft: 25,
          marginRight: 25,
          //borderColor: '#000000',
          //borderWidth: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            //borderColor: '#000000',
            //borderWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 0.058 * width,
              fontWeight: '700',
              color: '#181725',
            }}>
            {goodItem.Name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              _addToFavorites();
            }}>
            <View style={{padding: 5}}>
              {favorite ? (
                <RemFavoritesIcon
                  color={'#53B175'}
                  width={24}
                  height={24}></RemFavoritesIcon>
              ) : (
                <AddFavoritesIcon
                  color={'#7C7C7C'}
                  width={24}
                  height={24}></AddFavoritesIcon>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            //borderColor: '#000000',
            //borderWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 0.0386 * width,
              fontWeight: '600',
              color: '#7C7C7C',
            }}>
            {goodItem.multiplicity},${goodItem.price}
          </Text>
        </View>
        <View
          style={{
            //borderColor: '#000000',
            //borderWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 40,
          }}>
          {!qty_in_cart ? (
            <TouchableOpacity
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
                    padding: 12,
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
          <Text
            style={{
              fontSize: 0.058 * width,
              fontWeight: '700',
              color: '#181725',
            }}>
            {qty_in_cart
              ? (goodItem.price * qty_in_cart).toFixed(2)
              : goodItem.price}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          marginLeft: 25,
          marginRight: 25,
          //borderColor: '#000000',
          //borderWidth: 1,
          marginTop: 30,
          marginBottom: 8,
        }}>
        <Divider></Divider>
      </View>
      <View
        style={{
          flexGrow: 1,
          marginLeft: 25,
          marginRight: 25,
          //borderColor: '#000000',
          //borderWidth: 1,
          flexDirection: 'column',
        }}>
        <List.Section>
          <List.Accordion
            title={I18n.t('Orders.product_detail')}
            left={props => undefined}
            titleStyle={{
              color: '#181725',
              fontSize: 16,
              fontWeight: '600',
            }}
            style={{
              backgroundColor: '#FDFCFD',
              margin: 0,
              padding: 0,
              borderRadius: 8,
            }}
            expanded={expandedDetailsAction}
            onPress={handlePressExpandDetailsAction}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                //borderColor: '#000000',
                //borderWidth: 1,
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 0.0314 * width,
                  fontWeight: '500',
                  color: '#7C7C7C',
                  lineHeight: 21,
                }}>
                {goodItem.desc}
              </Text>
            </View>
          </List.Accordion>
          <List.Accordion
            title=""
            left={props => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 0,
                  padding: 0,
                  marginLeft: 10,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  minWidth: 0.5 * width,
                }}>
                <Text
                  style={{
                    color: '#181725',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  {I18n.t('Orders.nutritions')}
                </Text>
                {goodItem.nutritions_qty ? (
                  <View
                    style={{
                      backgroundColor: '#EBEBEB',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: '#7C7C7C',
                        fontSize: 9,
                        fontWeight: '600',
                      }}>
                      {goodItem.nutritions_qty}
                    </Text>
                  </View>
                ) : null}
              </View>
            )}
            style={{
              backgroundColor: '#FDFCFD',
              marginTop: 20,
              padding: 0,
              borderRadius: 8,
            }}
            expanded={expandedNutritionsAction}
            onPress={handlePressExpandNutritionsAction}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                //borderColor: '#000000',
                //borderWidth: 1,
                padding: 0,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 0.0314 * width,
                  fontWeight: '500',
                  color: '#7C7C7C',
                  lineHeight: 21,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  margin: 0,
                }}>
                {goodItem.nutritions}
              </Text>
            </View>
          </List.Accordion>
        </List.Section>
      </View>

      {!qty_in_cart ? (
        <Button
          mode="contained"
          style={theme.button}
          labelStyle={theme.button_label}
          onPress={() => {
            _addToCart(1);
          }}>
          {I18n.t('Orders.add_to_cart')}
        </Button>
      ) : null}

      <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
    </ScrollView>
  );
}
