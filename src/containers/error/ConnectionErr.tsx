/**
 * # ConnectionErr.tsx
 *
 *  The connection error form
 *
 */
'use strict';

/**
 * The necessary components from React
 */
import React, {PureComponent} from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  Avatar,
  Button,
  Banner,
  List,
  Text,
  Chip,
  Divider,
  useTheme,
  ActivityIndicator,
  Dialog,
  Paragraph,
  RadioButton,
  Switch,
  withTheme,
  Title,
} from 'react-native-paper';

import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import * as AppNavigation from '../../components/nav/AppNavigation';

import _ from 'underscore';

const {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation
const ratio = width / 434; // is actual image width

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

export default function ConnectionErr({route, navigation}) {
  const {error} = route.params;
  const theme = useTheme();
  return (
    <SafeAreaView style={theme.container}>
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
              source={require('../../../images/goods_bag.png')}
            />
          </View>
          <View
            style={{
              marginTop: 0.1446 * height,
            }}></View>
          <HeaderActivity isFetching={false} />
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
              {I18n.t('Orders.connection_failed')}
            </Text>
            <Text
              style={{
                fontSize: 0.0387 * width,
                fontWeight: '600',
                color: '#7C7C7C',
                marginTop: 0.0167 * height,
                textAlign: 'center',
              }}>
              {JSON.stringify(error)}
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
      </ScrollView>
      <View
        style={{
          marginTop: 0.12 * height,
        }}></View>
    </SafeAreaView>
  );
}
