/**
 * # FavoritesListItem.tsx
 *
 *  The component item of groups item
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

type Props = {
  id: any;
  item: any;
  active: boolean;
  goodDetails: any;
  arrayIndex: number;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
  addToFavorites: Function;
};

export default function FavoritesListItem(props: Props) {
  const {
    id,
    item,
    active,
    goodDetails,
    arrayIndex,
    height,
    width,
    theme,
    isFetching,
    addToFavorites,
  } = props;

  const [favorite, setFavorite] = useState(goodDetails.favorites);
  const dispatch = useAppDispatch();

  //console.log('FavoritesListItem: ', active, goodDetails);

  // if (isFetchhing) {
  //   return null;
  // }

  let _removeFromFavorites = async () => {
    console.log('_removeFromFavorites: ', item.good_id);
    setFavorite(false);
    await dispatch(addToFavorites(item.good_id, false));
  };

  return (
    <View
      key={id}
      style={{
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 0.1208 * width,
            height: 0.095 * height,
            margin: 0.064 * width,
            //borderColor: '#000000',
            //borderWidth: 1,
            alignItems: 'center',
          }}>
          {goodDetails.imgUrl ? (
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
              source={{
                uri: `${goodDetails.imgUrl}`,
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            //borderColor: '#000000',
            //borderWidth: 1,
            alignItems: 'flex-start',
            flexDirection: 'column',
            //marginTop: 0.04 * width,
            marginLeft: 0.04 * width,
          }}>
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: '700',
              color: '#181725',
              marginBottom: 7,
              maxWidth: 0.4 * width,
            }}>
            {goodDetails.Name}
          </Text>
          <Text
            style={{
              fontSize: 0.0338 * width,
              fontWeight: '500',
              color: '#7C7C7C',
            }}>
            {goodDetails.multiplicity},${goodDetails.price}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderColor: '#000000',
          //borderWidth: 1,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexDirection: 'column',
          marginRight: 0.064 * width,
          height: 0.07 * height,
        }}>
        <TouchableOpacity onPress={_removeFromFavorites}>
          <View style={{padding: 5}}>
            <RemoveIcon width={14} height={14} color={'#B3B3B3'}></RemoveIcon>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 0.0435 * width,
            fontWeight: '600',
            color: '#181725',
          }}>
          {goodDetails.price}
        </Text>
      </View>
    </View>
  );
}
