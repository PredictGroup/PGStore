/**
 * # OrderList.tsx
 *
 *  The container to display the order list
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
import {useAppSelector} from '../../../hooks';
import {
  StoreData,
  MyCart,
  sumInCart,
  lastCartPage,
} from '../../../redux/selectors';
import {getUserInfo} from '../../../reducers/auth/authActions';
import {getCart, addToCart} from '../../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSettingsParamList, OrderListScreenRouteProp} from '../../../../types';

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

import OrderListItem from '../../../components/account/order/OrderListItem';
import OrderListEmpty from '../../../components/account/order/OrderListEmpty';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../../components/controls/Header';

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
import I18n from '../../../lib/i18n';
import styles from '../../../config/styles';

interface Props {
  route: OrderListScreenRouteProp;
  navigation: StackNavigationProp<AccountSettingsParamList, 'OrderListScreen'>;
}

const OrderList: React.FC<Props> = ({route, navigation}) => {
  const {order} = route.params;

  const storeData = useAppSelector(StoreData);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [myList, setMyList] = React.useState(order.lines);

  const [isListRefreshing, setListRefreshing] = React.useState(false);

  let self = this;

  const renderOrderItem = ({item}) => (
      <OrderListItem
        id={item.good_id}
        item={item}
        goodDetails={order.goods.find(itm => itm._id === item.objGoodId)}
        height={height}
        width={width}
        isFetching={storeData.isFetching}
        theme={theme}
      />
  );

  const renderOrderEmptyItem = () => (
    <OrderListEmpty
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

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentInsetAdjustmentBehavior="automatic"
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
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
          data={myList}
          //onRefresh={handleLoadMore.bind(self)}
          //refreshing={isListRefreshing}
          //onEndReached={handleLoadMore.bind(self)}
          //onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderOrderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderOrderEmptyItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
