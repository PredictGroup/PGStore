/**
 * # ExploreGroups.tsx
 *
 *  The container to display the groups of goods form
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
import {StoreData} from '../../redux/selectors';
import {getGroupsExplore} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ExploreParamList, ExploreGroupsScreenRouteProp} from '../../../types';

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

import ExploreGroupsItem from '../../components/explore/ExploreGroupsItem';
import ExploreGroupsEmpty from '../../components/explore/ExploreGroupsEmpty';

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
        getGroupsExplore,
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
  route: ExploreGroupsScreenRouteProp;
  navigation: StackNavigationProp<ExploreParamList, 'ExploreGroupsScreen'>;
}

const ExploreGroupsScreen: React.FC<Props> = ({route, navigation}) => {
  const storeData = useAppSelector(StoreData);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getGroupsExplore('', true));

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  let _goToGoods = async (id: string) => {
    console.log('_goToGoods: ', id);
    await navigation.navigate('GoodsScreen', {group_id: id});
  };

  let onSearch = async () => {
    console.log('onSearch: ', searchQuery);

    await navigation.navigate('SearchGoodsScreen', {searchText: searchQuery});
  };

  const renderGroupsItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _goToGoods(item._id);
      }}>
      <ExploreGroupsItem
        id={item._id}
        item={item}
        name={item.name}
        imgUrl={item.imgUrl}
        color={item.color}
        borderColor={item.borderColor}
        isExplore={item.isExplore}
        Active={item.Active}
        height={height}
        width={width}
        arrayIndex={storeData.groupsExploreFiltered.findIndex(
          item => item._id === item._id,
        )}
        isFetching={storeData.isFetching}
        theme={theme}
      />
    </TouchableOpacity>
  );

  const renderGroupsEmptyItem = () => (
    <ExploreGroupsEmpty
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
      return null;
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
          alignContent: 'center',
          borderColor: '#000',
          //borderWidth: 1,
        }}>
        <View
          style={{
            marginBottom: 0.02232 * height,
            //borderColor: '#000',
            //borderWidth: 1,
          }}>
          <Searchbar
            placeholder={I18n.t('Orders.search_store')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={onSearch}
          />
        </View>
        <FlatList
          numColumns={2}
          data={storeData.groupsExploreFiltered}
          onRefresh={handleLoadMore.bind(self)}
          refreshing={isListRefreshing}
          onEndReached={handleLoadMore.bind(self)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderGroupsItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderGroupsEmptyItem}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreGroupsScreen);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
