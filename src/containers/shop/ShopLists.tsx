/**
 * # ShopLists.tsx
 *
 *  The container to display the shop lists
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Alert, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {
  Auth,
  StoreData,
  goodsShopFiltered,
  ExclusiveGoodsFiltered,
  BestsellingGoodsFiltered,
  GroceriesGoodsFiltered,
} from '../../redux/selectors';
import {
  getGoodsShop,
  getGroupsShop,
  addToCart,
  getBanners,
} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import React, {useRef, useState, useEffect} from 'react';

import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ShopParamList, BottomTabParamList} from '../../../types';

import {View, StyleSheet, Platform, ScrollView, Text} from 'react-native';
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

import LocationIcon from '../../icons/LocationIcon';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';
import HorizontalListGoods from '../../components/shop/HorizontalListGoods';

import BannersList from '../../components/banners/BannersList';
import BannersModal from '../../components/banners/BannersModal';
import {Modalize} from 'react-native-modalize';

import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    storedata: state.storedata,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        getGoodsShop,
        getGroupsShop,
        addToCart,
        getBanners,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';
import CONFIG from '../../config/config';

interface Props {
  navigation: StackNavigationProp<ShopParamList, 'ShopListsScreen'>;
}

const ShopLists: React.FC<Props> = ({navigation}) => {
  const auth = useAppSelector(Auth);
  const storedata = useAppSelector(StoreData);
  const GoodsShopFiltered = useAppSelector(goodsShopFiltered);
  const exclusiveGoodsFiltered = useAppSelector(ExclusiveGoodsFiltered);
  const bestsellingGoodsFiltered = useAppSelector(BestsellingGoodsFiltered);
  const groceriesGoodsFiltered = useAppSelector(GroceriesGoodsFiltered);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const bannersModalRef = React.useRef<Modalize>(null);
  const [currentBanner, setCurrentBanner] = React.useState();

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getBanners());
      await dispatch(
        getGoodsShop([
          CONFIG.PGSTORE_CONSTANTS.exclusive_group_id,
          CONFIG.PGSTORE_CONSTANTS.bestselling_group_id,
          CONFIG.PGSTORE_CONSTANTS.groceries_group_id,
        ]),
      );

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useEffect(() => {
    const unsubscribe = navigation.setOptions({headerShown: false});

    return unsubscribe;
  }, [navigation]);

  let onSearch = async () => {
    console.log('onSearch: ', searchQuery);

    await navigation.navigate('SearchGoodsScreen', {searchText: searchQuery});
  };

  if (!dataLoaded) {
    return (
      <View style={theme.act_container}>
        <HeaderActivity isFetching={true} />
      </View>
    );
  }

  return (
    <SafeAreaView style={theme.container}>
      <StatusBar translucent backgroundColor="transparent" />
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
            //borderColor: '#000',
            //borderWidth: 1,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../images/logo.png')}
            style={{
              width: 0.0614 * height,
              height: 0.0614 * height,
              marginTop: 0.01 * height,
            }}
          />

          <View
            style={{
              marginTop: 0.009 * height,
            }}></View>
          {/* <HeaderActivity isFetching={auth.form.isFetching} /> */}
          <View
            style={{
              //borderColor: '#000',
              //borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 0.009 * height,
              marginLeft: 0.0483 * width,
              marginRight: 0.0483 * width,
              paddingLeft: 0,
              paddingRight: 0,
            }}>
            <LocationIcon
              color={'#4C4F4D'}
              width={18}
              height={18}></LocationIcon>
            <Text
              style={{
                fontSize: 0.0434 * width,
                fontWeight: '400',
                color: '#4C4F4D',
                marginLeft: 8,
              }}>
              {auth.userArea}
              {', '}
              {auth.userWarehouse}
            </Text>
          </View>
          <View
            style={{
              //borderColor: '#000',
              //borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 0.02232 * height,
              marginLeft: 0.0483 * width,
              marginRight: 0.0483 * width,
            }}>
            <Searchbar
              placeholder={I18n.t('Orders.search_store')}
              onChangeText={onChangeSearch}
              value={searchQuery}
              onSubmitEditing={onSearch}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: 1 * width,
              //height: 0.132 * height,
              marginTop: 0.0223 * height,
            }}>
            <BannersList
              onPress={banner => {
                if (banner.html_desc.length > 0) {
                  setCurrentBanner(banner);
                  bannersModalRef.current?.open();
                }
              }}></BannersList>
          </View>
          {/*           <View
            style={{
              width: 1 * width,
              height: 0.132 * height,
              marginTop: 0.0223 * height,
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={require('../../../images/PGStoreBanner1.png')}
            />
          </View> */}
        </View>

        <HorizontalListGoods
          height={height}
          width={width}
          goodsList={exclusiveGoodsFiltered}
          navigation={navigation}
          group_id={CONFIG.PGSTORE_CONSTANTS.exclusive_group_id}
          theme={theme}
          isFetching={storedata.isFetching}
          blockName={'Exclusive Offer'}
          blockTitle={I18n.t('Orders.exclusive_offer')}
          addToCart={addToCart}></HorizontalListGoods>

        <HorizontalListGoods
          height={height}
          width={width}
          goodsList={bestsellingGoodsFiltered}
          navigation={navigation}
          group_id={CONFIG.PGSTORE_CONSTANTS.bestselling_group_id}
          theme={theme}
          isFetching={storedata.isFetching}
          blockName={'Best Selling'}
          blockTitle={I18n.t('Orders.best_selling')}
          addToCart={addToCart}></HorizontalListGoods>

        <HorizontalListGoods
          height={height}
          width={width}
          goodsList={groceriesGoodsFiltered}
          navigation={navigation}
          group_id={CONFIG.PGSTORE_CONSTANTS.groceries_group_id}
          theme={theme}
          isFetching={storedata.isFetching}
          blockName={'Groceries'}
          blockTitle={I18n.t('Orders.groceries')}
          addToCart={addToCart}></HorizontalListGoods>

        <View
          style={{
            marginTop: 0.12 * height,
          }}></View>
      </ScrollView>
      <BannersModal ref={bannersModalRef} banner={currentBanner} />
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopLists);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
