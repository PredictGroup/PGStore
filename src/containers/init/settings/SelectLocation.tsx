/**
 * # SelectLocation.js
 *
 *
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
  Auth,
  StoreData,
  AreasDropDownItems,
  WarehousesDropDownItems,
} from '../../../redux/selectors';
import {
  saveAreaAndWarehouse,
  saveAreaAndWarehouseSuccess,
  onAuthFormFieldChange,
  logout,
} from '../../../reducers/auth/authActions';
import {
  getAreas,
  getWarehouses,
} from '../../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../../../types';

import {View, StyleSheet, Platform, ScrollView, Text} from 'react-native';
import {
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
import {Dropdown} from 'react-native-element-dropdown';

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
    storedata: state.storedata,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        getAreas,
        getWarehouses,
        saveAreaAndWarehouse,
        saveAreaAndWarehouseSuccess,
        onAuthFormFieldChange,
        logout,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../../lib/i18n';

const {SELECT_LOCATION} = require('../../../config/constants').default;

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'SelectLocation'>;
}

const SelectLocation: React.FC<Props> = ({navigation}) => {
  const areasDropDownItems = useAppSelector(AreasDropDownItems);
  const warehousesDropDownItems = useAppSelector(WarehousesDropDownItems);
  const _Auth = useAppSelector(Auth);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  let self = this;

  const [valueAreas, setValueAreas] = React.useState(null);
  const [isFocusAreas, setIsFocusAreas] = React.useState(false);
  const [valueWarehouses, setValueWarehouses] = React.useState(null);
  const [isFocusWarehouses, setIsFocusWarehouses] = React.useState(false);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!_Auth.FirebaseUID) {
  //       console.log('SelectLocation logout 2 sec!!!: ', _Auth.FirebaseUID);
  //       dispatch(logout());
  //     }
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getWarehouses());
      await dispatch(getAreas());

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  const inputActionHandler = async (field: string, payload: string) => {
    console.log('inputActionHandler', field, payload);
    await dispatch(onAuthFormFieldChange(field, payload, SELECT_LOCATION));
  };

  /**
   * When the button is pressed, send the info to server
   */
  let onButtonPress = async () => {
    await dispatch(
      saveAreaAndWarehouseSuccess({
        area: _Auth.form.fields.area,
        warehouse: _Auth.form.fields.store,
      }),
    );

    navigation.replace('RootInit');
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
          <View
            style={{
              width: 0.543 * height,
              height: 0.1897 * height,
              marginTop: 0.0781 * height,
            }}>
            <Image
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={require('../../../../images/selectLocation.png')}
            />
          </View>

          <View
            style={{
              marginTop: 0.0446 * height,
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
              {I18n.t('Orders.select_location')}
            </Text>
            <Text
              style={{
                fontSize: 0.0387 * width,
                fontWeight: '600',
                color: '#7C7C7C',
                marginTop: 0.0167 * height,
                textAlign: 'center',
              }}>
              {I18n.t('Orders.switch_location')}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            width: width,
            paddingLeft: 25,
            paddingRight: 25,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#7C7C7C',
              marginBottom: 10,
            }}>
            {I18n.t('Orders.your_area')}
          </Text>
          <Dropdown
            style={[styles.dropdown, isFocusAreas && {borderColor: '#53B175'}]}
            itemTextStyle={styles.textItemsStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={areasDropDownItems}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusAreas ? I18n.t('Orders.select_item') : '...'}
            searchPlaceholder={I18n.t('Orders.search')}
            value={valueAreas}
            onFocus={() => setIsFocusAreas(true)}
            onBlur={() => setIsFocusAreas(false)}
            onChange={item => {
              setValueAreas(item.value);
              setIsFocusAreas(false);
              inputActionHandler('area', item.label);
            }}
          />
        </View>

        <View
          style={{
            marginTop: 25,
            width: width,
            paddingLeft: 25,
            paddingRight: 25,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#7C7C7C',
              marginBottom: 10,
            }}>
            {I18n.t('Orders.your_store')}
          </Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocusWarehouses && {borderColor: '#53B175'},
            ]}
            itemTextStyle={styles.textItemsStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={warehousesDropDownItems}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isFocusWarehouses ? I18n.t('Orders.select_item') : '...'
            }
            searchPlaceholder={I18n.t('Orders.search')}
            value={valueWarehouses}
            onFocus={() => setIsFocusWarehouses(true)}
            onBlur={() => setIsFocusWarehouses(false)}
            onChange={item => {
              setValueWarehouses(item.value);
              setIsFocusWarehouses(false);
              inputActionHandler('store', item.label);
            }}
          />
        </View>

        <View style={{marginTop: 10}}></View>

        <Button
          mode="contained"
          style={
            !_Auth.form.isValid || _Auth.form.isFetching
              ? theme.button_disabled
              : theme.button
          }
          labelStyle={
            !_Auth.form.isValid || _Auth.form.isFetching
              ? theme.button_label_disabled
              : theme.button_label
          }
          disabled={!_Auth.form.isValid || _Auth.form.isFetching}
          onPress={onButtonPress.bind(self)}
          accessibilityLabel="Submit">
          {I18n.t('Orders.submit')}
        </Button>

        <View
          style={{
            marginBottom: 0.0279 * height,
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#E2E2E2',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    color: '#000',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  textItemsStyle: {
    color: '#000',
  },
});
