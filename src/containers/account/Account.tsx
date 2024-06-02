/**
 * # Account.tsx
 *
 *  The container to display the account form
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
import {
  Auth,
  StoreData,
  qtyUnreadMessages,
  qtyUnreadChat,
} from '../../redux/selectors';
import {logout} from '../../reducers/auth/authActions';
import {logoutClear} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSettingsParamList, AccountScreenRouteProp} from '../../../types';

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

import LogoutIcon from '../../icons/LogoutIcon';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';
import AccountSelectButton from '../../components/account/AccountSelectButton';

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
        logout,
        logoutClear,
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
  route: AccountScreenRouteProp;
  navigation: StackNavigationProp<AccountSettingsParamList, 'AccountScreen'>;
}

const Account: React.FC<Props> = ({route, navigation}) => {
  const auth = useAppSelector(Auth);
  const storeData = useAppSelector(StoreData);
  const totalUnreadMessages = useAppSelector(qtyUnreadMessages);
  const totalUnreadChat = useAppSelector(qtyUnreadChat);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  let self = this;

  /**
   * When the button is pressed, send the info to server
   */
  let onButtonPress = async () => {
    await dispatch(logout())
      .then(() => {
        dispatch(logoutClear());
      })
      .catch(error => {
        createAlert(error.message);
      });
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
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 25,
            marginLeft: 25,
            marginRight: 25,
          }}>
          <Avatar.Image size={0.1546 * width} source={auth.AvatarIcon} />
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'column',
              marginLeft: 0.0483 * width,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                paddingRight: 25,
                marginRight: 25,
              }}>
              {auth.DisplayName}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                paddingRight: 25,
                marginRight: 25,
              }}>
              {auth.DisplayEmail}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 0.0457 * height,
            marginBottom: 0.0457 * height,
          }}>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.messages')}
            badge_val={totalUnreadMessages}
            navigation={navigation}
            navigateTo="MessagesScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.orders')}
            badge_val={undefined}
            navigation={navigation}
            navigateTo="OrdersScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.favorite_title')}
            badge_val={undefined}
            navigation={navigation}
            navigateTo="FavoritesScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.user_details')}
            badge_val={undefined}
            navigation={navigation}
            navigateTo="UserDetailsScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.chat')}
            badge_val={totalUnreadChat}
            navigation={navigation}
            navigateTo="ChatScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.remove_user')}
            badge_val={undefined}
            navigation={navigation}
            navigateTo="RemoveUserDataScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
          <AccountSelectButton
            height={height}
            width={width}
            name={I18n.t('Orders.about_title')}
            badge_val={undefined}
            navigation={navigation}
            navigateTo="AboutScreen"
            theme={theme}
            isFetching={storeData.isFetching}></AccountSelectButton>
          <Divider></Divider>
        </View>
        <Button
          icon={() => (
            <LogoutIcon color={'#53B175'} width={18} height={18}></LogoutIcon>
          )}
          mode="contained"
          style={theme.button_disabled}
          labelStyle={theme.button_label_disabled}
          onPress={onButtonPress.bind(self)}
          accessibilityLabel="Logout button">
          {I18n.t('App.logout')}
        </Button>
        <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
