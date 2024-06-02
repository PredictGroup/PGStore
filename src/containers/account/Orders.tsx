/**
 * # Orders.tsx
 *
 *  The container to display the orders list form
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
import {StoreData, MyOrders, lastOrdersPage} from '../../redux/selectors';
import {getOrders} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSettingsParamList, OrdersScreenRouteProp} from '../../../types';

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

import OrdersListItem from '../../components/account/OrdersListItem';
import OrdersListEmpty from '../../components/account/OrdersListEmpty';

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
        getOrders,
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
  route: OrdersScreenRouteProp;
  navigation: StackNavigationProp<AccountSettingsParamList, 'OrdersScreen'>;
}

const Orders: React.FC<Props> = ({route, navigation}) => {
  const storeData = useAppSelector(StoreData);
  const _myOrders = useAppSelector(MyOrders);
  const LastOrdersPage = useAppSelector(lastOrdersPage);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [myOrders, setMyOrders] = React.useState(_myOrders);

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getOrders(LastOrdersPage));

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useEffect(() => {
    //console.log('Orders: ', _myOrders);
    setMyOrders([..._myOrders]);
  }, [_myOrders]);

  let _goToOrderDetails = async (item: any) => {
    console.log('_goToOrderDetails: ', item);
    await navigation.navigate('OrderListScreen', {order: item});
  };

  const renderOrdersItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _goToOrderDetails(item);
      }}>
      <OrdersListItem
        id={item._id}
        item={item}
        status={item.status}
        lines={item.lines}
        height={height}
        width={width}
        arrayIndex={myOrders.findIndex(item => item._id === item._id)}
        isFetching={storeData.isFetching}
        theme={theme}
      />
    </TouchableOpacity>
  );

  const renderOrdersEmptyItem = () => (
    <OrdersListEmpty
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

  let handleLoadMore = () => {
    if (storeData.isFetching) return null;
    // TODO: loading
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
          data={myOrders}
          onRefresh={handleLoadMore.bind(self)}
          refreshing={isListRefreshing}
          onEndReached={handleLoadMore.bind(self)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderOrdersItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderOrdersEmptyItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
