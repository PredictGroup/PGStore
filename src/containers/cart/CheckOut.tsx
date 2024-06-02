/**
 * # CheckOut.tsx
 *
 *  The container to display the check out form
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

import 'intl';
import 'intl/locale-data/jsonp/en';
import {
  en,
  // nl,
  // de,
  // pl,
  // pt,
  //enGB,
  registerTranslation,
} from 'react-native-paper-dates';
registerTranslation('en', en);
import {DatePickerModal} from 'react-native-paper-dates';

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {
  StoreData,
  MyCart,
  sumInCart,
  TimeSlots,
  SelectedTimeSlot,
  PaymentMethods,
  DeliveryVariants,
  UserInfo,
} from '../../redux/selectors';
import {
  getCart,
  setTimeSlots,
  getTimeSlots,
  getPaymentMethods,
  getDeliveryVariants,
  addToOrders,
} from '../../reducers/storedata/storedataActions';
import {getUserInfo} from '../../reducers/auth/authActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {CartParamList, CheckOutScreenRouteProp} from '../../../types';

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
  Button,
  Switch,
  Searchbar,
  Divider,
  Title,
  List,
  TextInput,
  Checkbox,
  HelperText,
  RadioButton,
  useTheme,
} from 'react-native-paper';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';
import TimeSlotsEmpty from '../../components/cart/TimeSlotsEmpty';
import TimeSlotsItem from '../../components/cart/TimeSlotsItem';

import CredCardIcon from '../../icons/CredCardIcon';

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
        setTimeSlots,
        getTimeSlots,
        getPaymentMethods,
        getDeliveryVariants,
        addToOrders,
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
  route: CheckOutScreenRouteProp;
  navigation: StackNavigationProp<CartParamList, 'CheckOutScreen'>;
}

const CheckOut: React.FC<Props> = ({route, navigation}) => {
  const storeData = useAppSelector(StoreData);

  const userInfo = useAppSelector(UserInfo);

  const _myCart = useAppSelector(MyCart);
  const _sumInCart = useAppSelector(sumInCart);
  const timeSlots = useAppSelector(TimeSlots);
  const _selectedTimeSlot = useAppSelector(SelectedTimeSlot);
  const paymentMethods = useAppSelector(PaymentMethods);
  const deliveryVariants = useAppSelector(DeliveryVariants);
  const dispatch = useAppDispatch();

  const [strPaymentMethod, setPaymentMethod] = React.useState(undefined);
  const [strDeliveryVariants, setDeliveryVariants] = React.useState(undefined);
  const [valuePaymentMethod, setValPaymentMethod] = React.useState(undefined);
  const [valueDeliveryVariants, setValDeliveryVariants] =
    React.useState(undefined);

  const [address, setAddress] = React.useState(
    userInfo ? userInfo.address : undefined,
  );
  const [phone, setPhone] = React.useState(
    userInfo ? userInfo.phone : undefined,
  );

  const [expandedDeliveryAction, setExpandedDeliveryAction] =
    React.useState(true);
  const handlePressExpandDeliveryAction = () =>
    setExpandedDeliveryAction(!expandedDeliveryAction);
  const [expandedPaymentAction, setExpandedPaymentAction] =
    React.useState(true);
  const handlePressExpandPaymentAction = () =>
    setExpandedPaymentAction(!expandedPaymentAction);
  const [expandedPromoAction, setExpandedPromoAction] = React.useState(false);
  const handlePressExpandPromoAction = () =>
    setExpandedPromoAction(!expandedPromoAction);
  const [expandedTotalAction, setExpandedTotalAction] = React.useState(true);
  const handlePressExpandTotalAction = () =>
    setExpandedTotalAction(!expandedTotalAction);
  const [expandedLocationAction, setExpandedLocationAction] =
    React.useState(true);
  const handlePressExpandLocationAction = () =>
    setExpandedLocationAction(!expandedLocationAction);

  // + date picker
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [open]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
      console.log('Selected date: ', date?.toLocaleDateString());
    },
    [date, open],
  );
  // - date picker

  const theme = useTheme();

  const [myCart, setMyCart] = React.useState(_myCart);
  const [SumInCart, setSumInCart] = React.useState(_sumInCart);
  const [selectedTimeSlot, setSelectedTimeSlot] =
    React.useState(_selectedTimeSlot);

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getPaymentMethods());
      await dispatch(getDeliveryVariants());
      await dispatch(getTimeSlots());

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useEffect(() => {
    setMyCart([..._myCart]);
    setSumInCart(_sumInCart);
    setSelectedTimeSlot(_selectedTimeSlot);
  }, [_myCart, _sumInCart]);

  const _placeOrder = async () => {
    console.log(
      '_placeOrder: ',
      address,
      date.toISOString(),
      selectedTimeSlot._id,
      valueDeliveryVariants._id,
      valuePaymentMethod._id,
      myCart,
    );
    await dispatch(
      addToOrders(
        phone,
        address,
        date.toISOString(),
        selectedTimeSlot._id,
        valueDeliveryVariants._id,
        valuePaymentMethod._id,
        myCart,
        valueDeliveryVariants.price + SumInCart,
        valueDeliveryVariants.price,
      ),
    );

    await navigation.replace('SuccessScreen');
  };

  const inputActionHandler = async (field: string, payload: string) => {
    //console.log('inputActionHandler 111', field, payload);
    if (field === 'address') {
      setAddress(payload);
    }
    if (field === 'phone') {
      setPhone(payload);
    }
    if (field === 'promocode') {
    }
  };

  let onSearch = async () => {
    console.log('onSearch: ', searchQuery);
  };

  const _setTimeSlot = async (item: any) => {
    if (selectedTimeSlot) {
      if (selectedTimeSlot !== item) {
        setSelectedTimeSlot(item);
        await dispatch(setTimeSlots(item));
      } else {
        setSelectedTimeSlot(undefined);
        await dispatch(setTimeSlots(undefined));
      }
    } else {
      setSelectedTimeSlot(item);
      await dispatch(setTimeSlots(item));
    }
  };

  const renderTimeSlotsItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        _setTimeSlot(item);
      }}>
      <TimeSlotsItem
        id={item._id}
        item={item}
        selectedTimeSlot={selectedTimeSlot}
        height={height}
        width={width}
        setTimeSlots={setTimeSlots}
        arrayIndex={timeSlots.findIndex(item => item._id === item._id)}
        isFetching={storeData.isFetching}
        theme={theme}
      />
    </TouchableOpacity>
  );

  const renderTimeSlotsEmptyItem = () => (
    <TimeSlotsEmpty
      height={height}
      width={width}
      theme={theme}
      isFetching={storeData.isFetching}
    />
  );

  const _setPaymentMethod = (value: string) => {
    setPaymentMethod(value);
    const index = paymentMethods.map(i => i._id).indexOf(value);
    setValPaymentMethod(paymentMethods[index]);
    console.log('_setPaymentMethod: ', valuePaymentMethod);
  };

  const _setDeliveryVariants = (value: string) => {
    setDeliveryVariants(value);
    const index = deliveryVariants.map(i => i._id).indexOf(value);
    setValDeliveryVariants(deliveryVariants[index]);
    console.log('_setDeliveryVariants: ', valueDeliveryVariants);
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
          padding: 0,
          marginTop: 10,
          marginLeft: 0.0483 * width,
          marginRight: 0.0483 * width,
          flexDirection: 'column',
          alignContent: 'flex-start',
          borderColor: '#000',
          //borderWidth: 1,
        }}>
        <View
          style={{
            //flexGrow: 1,
            //borderColor: '#000000',
            //borderWidth: 1,
            flexDirection: 'column',
          }}>
          <List.Section>
            <List.Accordion
              title={I18n.t('Orders.expected_dt')}
              style={{
                backgroundColor: '#FDFCFD',
                marginTop: 20,
                padding: 0,
                borderRadius: 8,
              }}
              titleStyle={{
                color: '#181725',
                fontSize: 16,
                fontWeight: '600',
              }}
              expanded={expandedDeliveryAction}
              onPress={handlePressExpandDeliveryAction}>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  padding: 0,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 0.0314 * width,
                    fontWeight: '500',
                    color: '#7C7C7C',
                    lineHeight: 21,
                    //borderColor: '#000000',
                    //borderWidth: 1,
                    margin: 0,
                  }}>
                  {I18n.t('Orders.select_delivery_dt')}
                </Text>
                <>
                  <Button
                    style={date ? theme.button2 : theme.button_disabled2}
                    labelStyle={
                      date ? theme.button_label : theme.button_label_disabled
                    }
                    onPress={() => setOpen(true)}
                    uppercase={false}
                    mode="outlined">
                    {date
                      ? date.toLocaleDateString()
                      : I18n.t('Orders.pick_a_date')}
                  </Button>
                  <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={date}
                    onConfirm={onConfirmSingle}
                    label={I18n.t('Orders.select_delivery_d')} // optional, default 'Select time'
                    validRange={{
                      startDate: new Date(), // optional
                      //endDate: new Date(), // optional
                      //disabledDates: [new Date()] // optional
                    }}
                    // onChange={} // same props as onConfirm but triggered without confirmed by user
                    // saveLabel="Save" // optional
                    // uppercase={false} // optional, default is true
                    // label="Select date" // optional
                    // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                  />
                </>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 5,
                  }}>
                  <ScrollView horizontal={true}>
                    <FlatList
                      numColumns={3}
                      data={timeSlots}
                      refreshing={isListRefreshing}
                      renderItem={renderTimeSlotsItem}
                      keyExtractor={item => item._id}
                      ListEmptyComponent={renderTimeSlotsEmptyItem}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                    />
                  </ScrollView>
                </View>
                <HelperText
                  style={{}}
                  type="error"
                  visible={!selectedTimeSlot || !date}>
                  {I18n.t('Orders.dt_required')}
                </HelperText>
              </View>
            </List.Accordion>
            <List.Accordion
              title={I18n.t('Orders.delivery_location')}
              style={{
                backgroundColor: '#FDFCFD',
                marginTop: 20,
                padding: 0,
                borderRadius: 8,
              }}
              titleStyle={{
                color: '#181725',
                fontSize: 16,
                fontWeight: '600',
              }}
              expanded={expandedLocationAction}
              onPress={handlePressExpandLocationAction}>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  padding: 0,
                }}>
                <RadioButton.Group
                  onValueChange={value => _setDeliveryVariants(value)}
                  value={strDeliveryVariants}>
                  {(
                    Object.values(deliveryVariants) as typeof deliveryVariants[]
                  ).map(variant => (
                    <RadioButton.Item
                      style={{
                        backgroundColor: '#FDFCFD',
                        padding: 4,
                        //borderRadius: 8,
                      }}
                      key={variant._id}
                      label={variant.desc}
                      value={variant._id}
                    />
                  ))}
                </RadioButton.Group>
                <HelperText
                  style={{}}
                  type="error"
                  visible={!valueDeliveryVariants}>
                  {I18n.t('Orders.var_required')}
                </HelperText>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 0.0314 * width,
                    fontWeight: '500',
                    color: '#7C7C7C',
                    lineHeight: 21,
                    //borderColor: '#000000',
                    //borderWidth: 1,
                    margin: 0,
                  }}>
                  {I18n.t('Orders.fill_address')}
                </Text>
                <TextInput
                  style={theme.input2}
                  label={I18n.t('Orders.address')}
                  value={address}
                  placeholder={I18n.t('Orders.enter_address')}
                  onChangeText={text => inputActionHandler('address', text)}
                  error={!address}
                  disabled={storeData.isFetching}
                  accessibilityLabel="address"
                  keyboardType="default"
                />
                <HelperText style={{}} type="error" visible={!address}>
                  {I18n.t('Orders.address_required')}
                </HelperText>
                <TextInput
                  style={theme.input2}
                  label={I18n.t('Orders.phone')}
                  value={phone}
                  placeholder={I18n.t('Orders.enter_phone')}
                  onChangeText={text => inputActionHandler('phone', text)}
                  error={!phone}
                  disabled={storeData.isFetching}
                  accessibilityLabel="phone"
                  keyboardType="default"
                />
                <HelperText style={{}} type="error" visible={!phone}>
                  {I18n.t('Orders.phone_required')}
                </HelperText>
              </View>
            </List.Accordion>
            <List.Accordion
              title={I18n.t('Orders.payment_method')}
              style={{
                backgroundColor: '#FDFCFD',
                marginTop: 20,
                padding: 0,
                borderRadius: 8,
              }}
              titleStyle={{
                color: '#181725',
                fontSize: 16,
                fontWeight: '600',
              }}
              expanded={expandedPaymentAction}
              onPress={handlePressExpandPaymentAction}>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  padding: 0,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 0.0314 * width,
                    fontWeight: '500',
                    color: '#7C7C7C',
                    lineHeight: 21,
                    //borderColor: '#000000',
                    //borderWidth: 1,
                    margin: 0,
                  }}>
                  {I18n.t('Orders.select_payment_method')}
                </Text>
                <RadioButton.Group
                  onValueChange={value => _setPaymentMethod(value)}
                  value={strPaymentMethod}>
                  {(
                    Object.values(paymentMethods) as typeof paymentMethods[]
                  ).map(method => (
                    <RadioButton.Item
                      style={{
                        backgroundColor: '#FDFCFD',
                        padding: 4,
                        //borderRadius: 8,
                      }}
                      key={method._id}
                      label={method.desc}
                      value={method._id}
                    />
                  ))}
                </RadioButton.Group>
                <HelperText
                  style={{}}
                  type="error"
                  visible={!valuePaymentMethod}>
                  {I18n.t('Orders.payment_method_required')}
                </HelperText>
              </View>
            </List.Accordion>
            <List.Accordion
              title={I18n.t('Orders.promo_code')}
              style={{
                backgroundColor: '#FDFCFD',
                marginTop: 20,
                padding: 0,
                borderRadius: 8,
              }}
              titleStyle={{
                color: '#181725',
                fontSize: 16,
                fontWeight: '600',
              }}
              expanded={expandedPromoAction}
              onPress={handlePressExpandPromoAction}>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  padding: 0,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 0.0314 * width,
                    fontWeight: '500',
                    color: '#7C7C7C',
                    lineHeight: 21,
                    //borderColor: '#000000',
                    //borderWidth: 1,
                    margin: 0,
                  }}>
                  {I18n.t('Orders.promo_code_desc')}
                </Text>
                <TextInput
                  style={theme.input2}
                  label={I18n.t('Orders.promo_code')}
                  //value=""
                  placeholder={I18n.t('Orders.promo_code_desc')}
                  onChangeText={text => inputActionHandler('promocode', text)}
                  error={false}
                  disabled={storeData.isFetching}
                  accessibilityLabel="promocode"
                  keyboardType="default"
                />
                <HelperText style={{}} type="error" visible={false}>
                  " "
                </HelperText>
              </View>
            </List.Accordion>
            <List.Accordion
              title={I18n.t('Orders.total_cost')}
              style={{
                backgroundColor: '#FDFCFD',
                marginTop: 20,
                padding: 0,
                borderRadius: 8,
              }}
              titleStyle={{
                color: '#181725',
                fontSize: 16,
                fontWeight: '600',
              }}
              expanded={expandedTotalAction}
              onPress={handlePressExpandTotalAction}>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  //borderColor: '#000000',
                  //borderWidth: 1,
                  padding: 0,
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 0.0314 * width,
                    fontWeight: '500',
                    color: '#7C7C7C',
                    lineHeight: 21,
                    //borderColor: '#000000',
                    //borderWidth: 1,
                    margin: 0,
                  }}></Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 0.01 * height,
                    //borderColor: '#000000',
                    //borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 0.0435 * width,
                      fontWeight: '500',
                      color: '#181725',
                      marginLeft: 14,
                      marginRight: 14,
                    }}>
                    {I18n.t('Orders.subtotal')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 0.0435 * width,
                      fontWeight: '500',
                      color: '#181725',
                      marginLeft: 14,
                      marginRight: 14,
                    }}>
                    {SumInCart.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 0.01 * height,
                  }}>
                  <Text
                    style={{
                      fontSize: 0.0435 * width,
                      fontWeight: '500',
                      color: '#181725',
                      marginLeft: 14,
                      marginRight: 14,
                    }}>
                    {I18n.t('Orders.delivery_total')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 0.0435 * width,
                      fontWeight: '500',
                      color: '#181725',
                      marginLeft: 14,
                      marginRight: 14,
                    }}>
                    {valueDeliveryVariants
                      ? valueDeliveryVariants.price.toFixed(2)
                      : 0.0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 0.02 * height,
                  }}>
                  <Text
                    style={{
                      fontSize: 0.0435 * width,
                      fontWeight: '600',
                      color: '#181725',
                      marginLeft: 14,
                      marginRight: 14,
                    }}>
                    {I18n.t('Orders.total')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 0.0435 * width,
                      fontWeight: '600',
                      color: '#181725',
                      marginLeft: 14,
                      marginRight: 14,
                    }}>
                    {valueDeliveryVariants
                      ? (valueDeliveryVariants.price + SumInCart).toFixed(2)
                      : SumInCart.toFixed(2)}
                  </Text>
                </View>
              </View>
            </List.Accordion>
          </List.Section>
          <View
            style={{
              marginTop: 0.05 * height,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#7C7C7C',
                fontSize: 9,
                fontWeight: '600',
              }}>
              {I18n.t('Orders.agree_terms')}
            </Text>
          </View>
        </View>
      </View>

      {myCart && SumInCart !== 0 ? (
        <Button
          mode="contained"
          style={
            address &&
            selectedTimeSlot &&
            date &&
            valueDeliveryVariants &&
            valuePaymentMethod
              ? theme.button
              : theme.button_disabled
          }
          labelStyle={
            address &&
            selectedTimeSlot &&
            date &&
            valueDeliveryVariants &&
            valuePaymentMethod
              ? theme.button_label
              : theme.button_label_disabled
          }
          disabled={
            !address ||
            !selectedTimeSlot ||
            !date ||
            !valueDeliveryVariants ||
            !valuePaymentMethod
          }
          onPress={() => {
            _placeOrder();
          }}>
          {I18n.t('Orders.place_order')}
        </Button>
      ) : null}
      <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
