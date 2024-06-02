/**
 * # SuccessScreen.tsx
 *
 *  The container to display the seccess form
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
import {Auth, StoreData} from '../../redux/selectors';
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
  CartTabScreenProps,
  SuccessScreenRouteProp,
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
  route: SuccessScreenRouteProp;
  navigation: StackNavigationProp<CartParamList, 'SuccessScreen'>;
}

const SuccessScreen: React.FC<Props> = ({route, navigation}) => {
  const storeData = useAppSelector(StoreData);
  const _Auth = useAppSelector(Auth);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      //await dispatch(getGoodByID(good_id));

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
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          //borderColor: '#000',
          //borderWidth: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 0.1 * height,
            width: 0.72 * width,
            height: 0.268 * height,
            //borderColor: '#000000',
            //borderWidth: 1,
            alignItems: 'center',
          }}>
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
            source={require('../../../images/success1.png')}
          />
        </View>
        <View
          style={{
            marginTop: 0.1446 * height,
          }}></View>
        <HeaderActivity isFetching={_Auth.form.isFetching} />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: width,
            paddingLeft: 25,
            paddingRight: 25,
            marginBottom: 40,
          }}>
          <Text
            style={{
              fontSize: 0.0629 * width,
              fontWeight: '600',
              color: '#030303',
            }}>
            Your Order has been accepted
          </Text>
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '600',
              color: '#7C7C7C',
              marginTop: 0.0167 * height,
              textAlign: 'center',
            }}>
            {I18n.t('Orders.item_processed')}
          </Text>
        </View>
      </View>
      <Button
        labelStyle={{
          fontSize: 0.0387 * width,
          fontWeight: '600',
          color: '#181725',
        }}
        mode="text"
        uppercase={false}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'ShopTab'}],
          })
        }>
        {I18n.t('Orders.back_to_home')}
      </Button>
      <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessScreen);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
