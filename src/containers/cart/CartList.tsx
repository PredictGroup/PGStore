/**
 * # CartList.tsx
 *
 *  The container to display the cart list form
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
  StoreData,
  MyCart,
  sumInCart,
  lastCartPage,
} from '../../redux/selectors';
import {getUserInfo} from '../../reducers/auth/authActions';
import {getCart, addToCart} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {CartParamList, CartListScreenRouteProp} from '../../../types';

import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Paragraph,
  Switch,
  Searchbar,
  Divider,
  Title,
  Button,
  TextInput,
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

import CartListItem from '../../components/cart/CartListItem';
import CartListEmpty from '../../components/cart/CartListEmpty';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';

import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    storeData: state.storeData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        getCart,
        addToCart,
        getUserInfo,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';
import styles from '../../config/styles';

interface Props {
  route: CartListScreenRouteProp;
  navigation: StackNavigationProp<CartParamList, 'CartListScreen'>;
}

const CartList: React.FC<Props> = ({route, navigation}) => {
  const storeData = useAppSelector(StoreData);
  const _myCart = useAppSelector(MyCart);
  const _sumInCart = useAppSelector(sumInCart);
  const LastCartPage = useAppSelector(lastCartPage);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [myCart, setMyCart] = React.useState(_myCart);
  const [SumInCart, setSumInCart] = React.useState(_sumInCart);

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getCart(LastCartPage));
      await dispatch(getUserInfo());

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useEffect(() => {
    //console.log('CartList: ', _myCart);
    setMyCart([..._myCart]);
    setSumInCart(_sumInCart);
  }, [_myCart, _sumInCart]);

  let _goToGoodsDetails = async (id: string) => {
    //console.log('_goToGoodsDetails: ', id);
    await navigation.navigate('GoodsDetailsScreen', {good_id: id});
  };

  const renderCartItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _goToGoodsDetails(item.goodDetails[0]._id);
      }}>
      <CartListItem
        id={item._id}
        item={item}
        active={item.active}
        goodDetails={item.goodDetails[0]}
        height={height}
        width={width}
        arrayIndex={myCart.findIndex(item => item._id === item._id)}
        isFetching={storeData.isFetching}
        theme={theme}
        addToCart={addToCart}
      />
    </TouchableOpacity>
  );

  const renderCartEmptyItem = () => (
    <CartListEmpty
      height={height}
      width={width}
      theme={theme}
      isFetching={storeData.isFetching}
    />
  );

  let renderFooter = () => {
    if (storeData.isFetching) {
      return <HeaderActivity isFetching={storeData.isFetching} />;
    } else {
      return (
        <View
          style={{
            marginBottom: 0.07732 * height,
            //borderColor: '#000',
            //borderWidth: 1,
          }}></View>
      );
    }
  };

  let handleLoadMore = async () => {
    if (storeData.isFetching) return null;
    if (storeData.endReachedCartPage) return null;

    await dispatch(getCart(LastCartPage));
  };

  const _goToCheckOut = async () => {
    //console.log('_goToCheckOut: ', myCart);
    await navigation.navigate('CheckOutScreen');
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentInsetAdjustmentBehavior="automatic"
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {myCart && SumInCart !== 0 ? (
        <Button
          mode="contained"
          style={theme.button}
          labelStyle={theme.button_label}
          onPress={() => {
            _goToCheckOut();
          }}>
          {I18n.t('Orders.go_to_checkout')} = {SumInCart.toFixed(2)}
        </Button>
      ) : null}
      <View
        style={{
          marginTop: 0.02 * height,
        }}></View>
      <View
        style={{
          flexGrow: 1,
          padding: 0,
          marginTop: 10,
          marginLeft: 0.0483 * width,
          marginRight: 0.0483 * width,
          flexDirection: 'column',
          alignContent: 'flex-start',
          borderColor: '#000',
          //borderWidth: 1,
        }}>
        <FlatList
          style={{width: 0.9034 * width}}
          data={myCart}
          onRefresh={handleLoadMore.bind(self)}
          refreshing={isListRefreshing}
          onEndReached={handleLoadMore.bind(self)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderCartItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderCartEmptyItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
