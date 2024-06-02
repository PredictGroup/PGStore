/**
 * # GoodsScreen.tsx
 *
 *  The container to display the goods form
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
  ExclusiveGoodsFiltered,
  BestsellingGoodsFiltered,
  GroceriesGoodsFiltered,
  lastGoodShopPage,
} from '../../../redux/selectors';
import {
  getGoodsShop,
  addToCart,
} from '../../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShopParamList, ShopGoodsScreenRouteProp} from '../../../../types';

import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
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

import ExploreGoodsItem from '../../../components/explore/ExploreGoodsItem';
import ExploreGoodsEmpty from '../../../components/explore/ExploreGoodsEmpty';

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
        getGoodsShop,
        addToCart,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../../lib/i18n';

interface Props {
  route: ShopGoodsScreenRouteProp;
  navigation: StackNavigationProp<ShopParamList, 'GoodsScreen'>;
}

const GoodsScreen: React.FC<Props> = ({route, navigation}) => {
  const {blockName, blockTitle, groupGoodsFiltered} = route.params;

  const storeData = useAppSelector(StoreData);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const exclusiveGoodsFiltered = useAppSelector(ExclusiveGoodsFiltered);
  const bestsellingGoodsFiltered = useAppSelector(BestsellingGoodsFiltered);
  const groceriesGoodsFiltered = useAppSelector(GroceriesGoodsFiltered);

  const LastGoodShopPage = useAppSelector(lastGoodShopPage);

  const [goodList, setGoodsList] = React.useState(groupGoodsFiltered);

  const [isListRefreshing, setListRefreshing] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  let self = this;

  React.useEffect(() => {
    const unsubscribe = navigation.setOptions({title: blockTitle});

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    //console.log('GoodsScreen: ', blockName, exclusiveGoodsFiltered);
    switch (blockName) {
      case 'Exclusive Offer':
        setGoodsList([...exclusiveGoodsFiltered]);
        break;
      case 'Best Sellingr':
        setGoodsList([...bestsellingGoodsFiltered]);
        break;
      case 'Groceries':
        setGoodsList([...groceriesGoodsFiltered]);
        break;
      default:
        setGoodsList([...groupGoodsFiltered]);
    }
  }, [
    groupGoodsFiltered,
    exclusiveGoodsFiltered,
    bestsellingGoodsFiltered,
    groceriesGoodsFiltered,
  ]);

  //console.log('GoodsScreen: ', route);

  let _goToGoodsDetails = async (id: string) => {
    //console.log('_goToGoodsDetails: ', id);
    await navigation.navigate('GoodsDetailsScreen', {good_id: id});
  };

  let onSearch = async () => {
    console.log('onSearch: ', searchQuery);
  };

  const renderGoodsItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _goToGoodsDetails(item._id);
      }}>
      <ExploreGoodsItem
        id={item._id}
        item={item}
        name={item.Name}
        article={item.Article}
        barcode={item.Barcode}
        imgUrl={item.imgUrl}
        price={item.price}
        isWeight={item.isWeight}
        multiplicity={item.multiplicity}
        in_stock={item.in_stock}
        active={item.active}
        height={height}
        width={width}
        addToCart={addToCart}
        arrayIndex={goodList.findIndex(item => item._id === item._id)}
        isFetching={storeData.isFetching}
        theme={theme}
      />
    </TouchableOpacity>
  );

  const renderGoodsEmptyItem = () => (
    <ExploreGoodsEmpty
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
            height: 0.01 * height,
            //borderColor: '#000',
            //borderWidth: 1,
          }}></View>
      );
    }
  };

  let handleLoadMore = async () => {
    if (storeData.isFetching) return null;
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentInsetAdjustmentBehavior="automatic"
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={theme.container}>
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
          //borderColor: '#000',
          //borderWidth: 1,
        }}>
        {/*  <View
          style={
            {
              //borderColor: '#000',
              //borderWidth: 1,
            }
          }>
          <Searchbar
            placeholder="Search store"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={onSearch}
          />
        </View>  */}
        <FlatList
          numColumns={2}
          data={goodList}
          onRefresh={handleLoadMore.bind(self)}
          refreshing={isListRefreshing}
          onEndReached={handleLoadMore.bind(self)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderGoodsItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderGoodsEmptyItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <View
          style={{
            marginTop: 0.12 * height,
          }}></View>
      </View>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodsScreen);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
