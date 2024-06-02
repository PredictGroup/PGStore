/**
 * # UserDetails.tsx
 *
 *  The container to display the user details form
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
import {Auth, UserInfo} from '../../redux/selectors';
import {getUserInfo, updateUserInfo} from '../../reducers/auth/authActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AccountSettingsParamList,
  UserDetailsScreenRouteProp,
} from '../../../types';

import {View, StyleSheet,Platform, ScrollView, Text} from 'react-native';
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

import LogoutIcon from '../../icons/LogoutIcon';

/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../../components/controls/ItemCheckbox';
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
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        getUserInfo,
        updateUserInfo,
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
  route: UserDetailsScreenRouteProp;
  navigation: StackNavigationProp<
    AccountSettingsParamList,
    'UserDetailsScreen'
  >;
}

const UserDetails: React.FC<Props> = ({route, navigation}) => {
  const auth = useAppSelector(Auth);
  const userInfo = useAppSelector(UserInfo);
  const dispatch = useAppDispatch();

  const [dataLoaded, setDataLoaded] = React.useState(false);

  const [userPhone, setUserPhone] = React.useState(
    userInfo ? userInfo.phone : undefined,
  );
  const [userAddress, setUserAddress] = React.useState(
    userInfo ? userInfo.address : undefined,
  );

  const theme = useTheme();

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getUserInfo());

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  const _updateData = async () => {
    console.log('_updateData: ', userPhone, userAddress);
    if (!userPhone && !userAddress) {
      return;
    }
    await dispatch(updateUserInfo(userPhone, userAddress));
  };

  const inputActionHandler = async (field: string, payload: string) => {
    //console.log('inputActionHandler 111', field, payload);
    if (field === 'address') {
      setUserAddress(payload);
    }
    if (field === 'phone') {
      setUserPhone(payload);
    }
  };

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
            flexDirection: 'column',
            alignItems: 'stretch',
            width: width,
            paddingLeft: 25,
            paddingRight: 25,
            marginBottom: 40,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              paddingRight: 25,
              marginRight: 25,
            }}>
            {auth.userInfo ? auth.userInfo.username : ""}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              paddingRight: 25,
              marginRight: 25,
            }}>
            {auth.userInfo ? auth.userInfo.email : ""}
          </Text>
          <View
          style={{
            marginBottom: 10,
          }}></View>
          <Divider></Divider>
          <View
          style={{
            marginBottom: 0.0457 * height,
          }}></View>
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
            value={userAddress}
            placeholder={I18n.t('Orders.enter_address')}
            onChangeText={text => inputActionHandler('address', text)}
            error={!userAddress}
            disabled={auth.isFetching}
            accessibilityLabel="address"
            keyboardType="default"
          />
          <HelperText style={{}} type="error" visible={!userAddress}>
            {I18n.t('Orders.address_required')}
          </HelperText>
          <TextInput
            style={theme.input2}
            label={I18n.t('Orders.phone')}
            value={userPhone}
            placeholder={I18n.t('Orders.enter_phone')}
            onChangeText={text => inputActionHandler('phone', text)}
            error={!userPhone}
            disabled={auth.isFetching}
            accessibilityLabel="phone"
            keyboardType="default"
          />
          <HelperText style={{}} type="error" visible={!userPhone}>
            {I18n.t('Orders.phone_required')}
          </HelperText>
        </View>

        <Button
          mode="contained"
          disabled={!auth.isFetching && !userAddress} // && userPhone
          style={
            !auth.isFetching && userAddress // && userPhone
              ? theme.button
              : theme.button_disabled
          }
          labelStyle={
            !auth.isFetching && userAddress // && userPhone
              ? theme.button_label
              : theme.button_label_disabled
          }
          onPress={() => {
            _updateData();
          }}>
          {I18n.t('Orders.submit')}
        </Button>
        <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
