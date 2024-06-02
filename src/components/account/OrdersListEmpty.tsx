/**
 * # OrdersListEmpty.tsx
 *
 *  The component item of orders list empty
 *
 */
'use strict';

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Paragraph,
  Switch,
  Divider,
  Searchbar,
  Title,
  Button,
  TextInput,
  Checkbox,
  HelperText,
  useTheme,
} from 'react-native-paper';

type Props = {
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
};

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';

export default function OrdersListEmpty(props: Props) {
  const {height, width, theme, isFetching} = props;

  //console.log('OrdersListEmpty: ', index, height, width, isFetching);

  // if (isFetchhing) {
  //   return null;
  // }

  return (
    <View
      style={{
        borderColor: '#E2E2E2',
        borderRadius: 18,
        borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isFetching ? null : (
        <Paragraph style={theme.title_text_empty}>
          {I18n.t('Orders.no_orders')}
        </Paragraph>
      )}
    </View>
  );
}
