/**
 * ChatNewDate.tsx
 *
 * component chat summary information
 */
"use strict";
/**
 * ## Imports
 *
 * Redux
 */
import { useSelector, useDispatch, useStore, shallowEqual } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  UIManager,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  Avatar,
  Button,
  Banner,
  Card,
  List,
  Text,
  TextInput,
  Chip,
  Divider,
  Checkbox,
  RadioButton,
  useTheme,
  ActivityIndicator,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  Modal,
  IconButton,
  DataTable,
  withTheme,
  Title,
} from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import config from "../../config/config";

export default function ChatNewDate(props) {
  const theme = useTheme();
  const self = this;

  return (
    <View style={theme.container}>
      <View
        style={{
          backgroundColor: "#FDFCFD",
          marginTop: 0.0295 * height,
          marginBottom: 0.0295 * height,
          //marginLeft: 0.043 * width,
          //marginRight: 0.043 * width,
          width: 0.9034 * width,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Divider
          style={{
            flex: 1,
            borderColor: "#4F4F4F",
            borderWidth: 0.5,
            maxWidth: 100,
          }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: "#4F4F4F",
            textAlign: "center",
          }}
        >
          {props.title}
        </Text>
        <Divider
          style={{
            flex: 1,
            borderColor: "#4F4F4F",
            borderWidth: 0.5,
            maxWidth: 100,
          }}
        />
      </View>
    </View>
  );
}
