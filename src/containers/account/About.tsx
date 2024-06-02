/**
 * # About.tsx
 *
 *  The container to display the about data form
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
import {useAppDispatch} from '../../hooks';

import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSettingsParamList, AboutScreenRouteProp} from '../../../types';

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
    ...bindActionCreators({}, dispatch),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

interface Props {
  route: AboutScreenRouteProp;
  navigation: StackNavigationProp<AccountSettingsParamList, 'AboutScreen'>;
}

const AboutScreen: React.FC<Props> = ({route, navigation}) => {
  const auth = useAppSelector(Auth);
  const storeData = useAppSelector(StoreData);
  const dispatch = useAppDispatch();

  const [checked, setChecked] = React.useState(false);

  const theme = useTheme();

  let self = this;

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
            alignItems: 'center',
            width: width,
            paddingLeft: 25,
            paddingRight: 25,
            marginBottom: 40,
          }}>
          <Image
            source={require('../../../images/logo.png')}
            style={{
              width: 0.2 * height,
              height: 0.2 * height,
              marginTop: 0.03125 * height,
              marginBottom: 0.03125 * height,
            }}
          />
          <Text
            style={{
              fontSize: 0.0629 * width,
              fontWeight: '600',
              color: '#030303',
            }}>
            PGStore ver. 2.0.0
          </Text>
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '600',
              color: '#7C7C7C',
              marginTop: 0.0167 * height,
              lineHeight: 21,
            }}>
            www.predictgroup.com
          </Text>
        </View>

        <Button
          labelStyle={{
            fontSize: 0.0387 * width,
            fontWeight: '600',
            color: '#181725',
          }}
          mode="text"
          uppercase={false}
          onPress={() => navigation.goBack()}>
          {I18n.t('Orders.go_back')}
        </Button>
        <View
          style={{
            marginTop: 0.12 * height,
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
