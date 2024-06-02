/**
 * # BannersList.tsx
 *
 *  The container to display the banners list form
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

import {Alert, Image, Pressable} from 'react-native';
import {StatusBar} from 'expo-status-bar';

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {StoreData, BannersFiltered} from '../../redux/selectors';
import {
  getGoodsShop,
  addToCart,
} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';

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

import FastImage from 'react-native-fast-image';

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
import I18n from '../../lib/i18n';

interface Props {
  onPress?: (elem: any) => void;
}

const BannersList: React.FC<Props> = ({onPress}) => {
  const dispatch = useAppDispatch();
  const storedata = useAppSelector(StoreData);
  const bannersList = useAppSelector(BannersFiltered);

  const theme = useTheme();

  let self = this;

  const [isListRefreshing, setListRefreshing] = React.useState(false);

  const renderBannersItem = ({item}) => (
    <Pressable key={item._id} onPress={() => onPress && onPress(item)}>
      <View
        style={{
          width: 0.9034 * width,
          height: 0.145 * height,
          marginBottom: 0.005 * height,
          marginLeft: 0.0483 * width,
          marginRight: 0.0483 * width,
        }}>
        <FastImage
          source={{
            uri: item.img,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </Pressable>
  );

  let renderFooter = () => {
    return null;
  };

  let handleLoadMore = async () => {
    if (storedata.isFetching) return null;
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentInsetAdjustmentBehavior="automatic"
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={theme.container}>
      <FlatList
        data={bannersList}
        onRefresh={handleLoadMore.bind(self)}
        refreshing={isListRefreshing}
        onEndReached={handleLoadMore.bind(self)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        renderItem={renderBannersItem}
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BannersList);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
