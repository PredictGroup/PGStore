/**
 * # RemoveUserData.tsx
 *
 *  The container to display the delete account and remove data form
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
import {deleteUserData} from '../../reducers/storedata/storedataActions';
import {deleteUser} from '../../reducers/auth/authActions';
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSettingsParamList, RemoveUserDataScreenRouteProp} from '../../../types';

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
        deleteUserData,
        deleteUser,
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
  route: RemoveUserDataScreenRouteProp;
  navigation: StackNavigationProp<
    AccountSettingsParamList,
    'RemoveUserDataScreen'
  >;
}

const RemoveUserData: React.FC<Props> = ({route, navigation}) => {
  const auth = useAppSelector(Auth);
  const storeData = useAppSelector(StoreData);
  const dispatch = useAppDispatch();

  const [checked, setChecked] = React.useState(false);

  const theme = useTheme();

  let self = this;

  const _removeData = async () => {
    console.log('_removeData');
    dispatch(deleteUserData());
    dispatch(deleteUser());
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
            alignItems: 'flex-start',
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
            {I18n.t('Orders.will_be_deleted')}
          </Text>
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '600',
              color: '#7C7C7C',
              marginTop: 0.0167 * height,
              lineHeight: 21,
            }}>
            {I18n.t('Orders.will_be_deleted_approve')}
          </Text>
          <View
            style={{
              marginTop: 0.0167 * height,
            }}></View>
          <Checkbox.Item
            label="I agree"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            style={{
              backgroundColor: '#FDFCFD',
              //borderWidth: 1,
              borderRadius: 8,
              width: '100%',
              //borderColor: '#000000',
            }}
          />
        </View>

        <Button
          mode="contained"
          disabled={!checked}
          style={checked ? theme.button : theme.button_disabled}
          labelStyle={
            checked ? theme.button_label : theme.button_label_disabled
          }
          onPress={() => {
            _removeData();
          }}>
          {I18n.t('Orders.delete_user_data')}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveUserData);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
