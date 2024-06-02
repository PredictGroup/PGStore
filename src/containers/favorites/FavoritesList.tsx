/**
 * # FavoritesList.tsx
 *
 *  The container to display the favorites list form
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
import {StoreData, MyFavorites, lastFavoritesPage} from '../../redux/selectors';
import {
  getFavorites,
  addToFavorites,
} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FavoritesParamList} from '../../../types';

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

import FavoritesListItem from '../../components/favorites/FavoritesListItem';
import FavoritesListEmpty from '../../components/favorites/FavoritesListEmpty';

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
        getFavorites,
        addToFavorites,
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
  navigation: StackNavigationProp<FavoritesParamList, 'FavoritesListScreen'>;
}

const FavoritesList: React.FC<Props> = ({navigation}) => {
  const storeData = useAppSelector(StoreData);
  const _myFavorites = useAppSelector(MyFavorites);
  const LastFavoritesPage = useAppSelector(lastFavoritesPage);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [myFavorites, setMyFavorites] = React.useState(_myFavorites);

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getFavorites(LastFavoritesPage));

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useEffect(() => {
    //console.log('FavoritesList: ', _myFavorites);
    setMyFavorites([..._myFavorites]);
  }, [_myFavorites]);

  let _goToGoodsDetails = async (id: string) => {
    //console.log('_goToGoodsDetails: ', id);
    await navigation.navigate('GoodsDetailsScreen', {good_id: id});
  };

  let onSearch = async () => {
    console.log('onSearch: ', searchQuery);
  };

  const renderFavoritesItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _goToGoodsDetails(item.goodDetails[0]._id);
      }}>
      <FavoritesListItem
        id={item._id}
        item={item}
        active={item.active}
        goodDetails={item.goodDetails[0]}
        height={height}
        width={width}
        arrayIndex={myFavorites.findIndex(item => item._id === item._id)}
        isFetching={storeData.isFetching}
        theme={theme}
        addToFavorites={addToFavorites}
      />
    </TouchableOpacity>
  );

  const renderFavoritesEmptyItem = () => (
    <FavoritesListEmpty
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
            marginTop: 0.12 * height,
          }}></View>
      );
    }
  };

  let handleLoadMore = async () => {
    if (storeData.isFetching) return null;
    if (storeData.endReachedFavoritesPage) return null;

    await dispatch(getFavorites(LastFavoritesPage));
  };

  return (
    <View style={theme.container}>
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
        {/* <View
           style={{
             marginBottom: 0.02232 * height,
             //borderColor: '#000',
             //borderWidth: 1,
           }}>
           <Searchbar
             placeholder="Search store"
             onChangeText={onChangeSearch}
             value={searchQuery}
             onSubmitEditing={onSearch}
           />
         </View> */}
        <FlatList
          data={myFavorites}
          onRefresh={handleLoadMore.bind(self)}
          refreshing={isListRefreshing}
          onEndReached={handleLoadMore.bind(self)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderFavoritesItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderFavoritesEmptyItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
