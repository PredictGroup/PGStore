/**
 * # TimeSlotsItem.tsx
 *
 *  The component item of time slots item
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

import {useAppDispatch} from '../../hooks';

import RemoveIcon from '../../icons/RemoveIcon';
import AddIcon from '../../icons/AddIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';

type Props = {
  id: any;
  item: any;
  selectedTimeSlot: any;
  arrayIndex: number;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  setTimeSlots: Function;
};

export default function TimeSlotsItem(props: Props) {
  const {
    id,
    item,
    selectedTimeSlot,
    arrayIndex,
    height,
    width,
    theme,
    isFetching,
    setTimeSlots,
  } = props;

  const dispatch = useAppDispatch();

  const [SelectedTimeSlot, setSelectedTimeSlot] = useState(selectedTimeSlot);
  const [selected, setSelected] = useState(false);

  //console.log('CartListItem: ', goodDetails);

  // if (isFetchhing) {
  //   return null;
  // }

  React.useEffect(() => {
    if (selectedTimeSlot) {
      if (selectedTimeSlot === item) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }else{
      setSelected(false);
    }
    setSelectedTimeSlot(selectedTimeSlot);
  }, [selectedTimeSlot, item]); // 👈️ add props as dependencies

  const _setTimeSlot = async () => {
    if (selectedTimeSlot) {
      if (selectedTimeSlot !== item) {
        setSelectedTimeSlot(item);
        await dispatch(setTimeSlots(item));
      } else {
        setSelectedTimeSlot(null);
        await dispatch(setTimeSlots(null));
        setSelected(false);
      }
    } else {
      setSelectedTimeSlot(item);
      await dispatch(setTimeSlots(item));
    }
  };

  return (
    <View
      key={id}
      style={{
        backgroundColor: '#E2E2E2',
        borderColor: selected ? '#53B175' : '#E2E2E2',
        borderWidth: 1,
        borderRadius: 9,
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 0.048 * width,
        paddingTop: 0.048 * width,
        //paddingLeft: 0.0426 * width,
        //paddingRight: 0.0426 * width,
        marginRight: 0.02 * width,
        marginBottom: 0.02 * width,
        width: 0.27 * width,
      }}>
      <Text
        style={{
          fontSize: 0.027 * width,
          fontWeight: selected ? '600' : '500',
          color: selected ? '#53B175' : '#181725',
          marginLeft: 13,
          marginRight: 13,
        }}>
        {item.Desc}
      </Text>
    </View>
  );
}
