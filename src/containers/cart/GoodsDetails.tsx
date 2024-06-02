/**
 * # GoodsDetailsScreen.tsx
 *
 *  The container to display the goods details form
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
import {StoreData, GoodsDetails} from '../../redux/selectors';
import {
  getGoodByID,
  addToCart,
  addToFavorites,
} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CartParamList,
  CartGoodsDetailsScreenRouteProp,
} from '../../../types';

import {View, StyleSheet, Platform, ScrollView, Text} from 'react-native';
import {
  Avatar,
  Paragraph,
  Switch,
  Divider,
  Title,
  Button,
  TextInput,
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';
import GoodDetails from '../../components/shop/GoodDetails';

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
        getGoodByID,
        addToCart,
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

interface Props {
  route: CartGoodsDetailsScreenRouteProp;
  navigation: StackNavigationProp<CartParamList, 'GoodsDetailsScreen'>;
}

const GoodsDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const {good_id} = route.params;

  const storeData = useAppSelector(StoreData);
  const goodsDetails = useAppSelector(GoodsDetails);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getGoodByID(good_id));

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  if (!dataLoaded) {
    return (
      <View style={theme.act_container}>
        <HeaderActivity isFetching={true} />
      </View>
    );
  }

  return (
    <View style={theme.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <GoodDetails
        height={height}
        width={width}
        goodItem={goodsDetails}
        theme={theme}
        isFetching={storeData.isFetching}
        addToCart={addToCart}
        addToFavorites={addToFavorites}
        navigation={navigation}></GoodDetails>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetailsScreen);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
