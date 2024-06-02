/**
 * # MessagesListItem.tsx
 *
 *  The component item of messages list item
 *
 */
"use strict";

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
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
} from "react-native-paper";

import { useAppDispatch } from "../../hooks";

type Props = {
  id: any;
  item: any;
  arrayIndex: number;
  height: number;
  width: number;
  theme: ReactNativePaper.Theme;
  isFetching: boolean;
};

/**
 * ### Translations
 */
import I18n from "../../lib/i18n";

export default function MessagesListItem(props: Props) {
  const { id, item, arrayIndex, height, width, theme, isFetching } = props;

  const dispatch = useAppDispatch();

  // if (isFetchhing) {
  //   return null;
  // }

  return (
    <View
      key={id}
      style={{
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <View
        style={{
          width: 0.1 * width,
          height: 0.09 * height,
          margin: 0.04 * width,
          //borderColor: '#000000',
          //borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
            aspectRatio: 1,
            //borderColor: "#000000",
            //borderWidth: 1,
          }}
          source={require("../../../images/message-icon.png")}
        />
      </View>
      <View
        style={{
          borderColor: "#000000",
          //borderWidth: 1,
          flexDirection: "column",
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: 0.04 * width,
            paddingLeft: 5,
            paddingRight: 5,
            borderColor: "#000000",
            //borderWidth: 1,
            //alignItems: 'flex-start',
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 0.0387 * width,
              fontWeight: item.active ? "700" : "400",
              color: "#181725",
              marginBottom: 7,
            }}
          >
            {item.message_text}
          </Text>
        </View>
        <Text
          style={{
            paddingLeft: 5,
            fontSize: 0.0338 * width,
            fontWeight: item.active ? "700" : "400",
            color: "#7C7C7C",
          }}
        >
          {item.date_ts
            ? new Date(
                item.date_ts[0],
                item.date_ts[1] - 1,
                item.date_ts[2],
                item.date_ts[3],
                item.date_ts[4],
                item.date_ts[5],
                item.date_ts[6]
              ).toLocaleDateString()
            : null}{" "}
          {item.date_ts
            ? new Date(
                item.date_ts[0],
                item.date_ts[1] - 1,
                item.date_ts[2],
                item.date_ts[3],
                item.date_ts[4],
                item.date_ts[5],
                item.date_ts[6]
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : null}
        </Text>
      </View>
    </View>
  );
}
