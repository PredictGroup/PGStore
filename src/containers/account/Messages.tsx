/**
 * # Messages.tsx
 *
 *  The container to display the messages list form
 *
 */
"use strict";
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Alert, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";

/**
 * The actions we need
 */
import { useAppSelector } from "../../hooks";
import {
  StoreData,
  Messages,
  lastMessagesPage,
  endReachedMessagesPage,
} from "../../redux/selectors";
import {
  getMessages,
  setMessageRead,
} from "../../reducers/storedata/storedataActions";
import { useAppDispatch } from "../../hooks";

import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AccountSettingsParamList,
  MessagesScreenRouteProp,
} from "../../../types";

import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Paragraph,
  Switch,
  Searchbar,
  Divider,
  Title,
  Button,
  TextInput,
  Checkbox,
  HelperText,
  useTheme,
} from "react-native-paper";

import MessagesListItem from "../../components/account/MessagesListItem";
import MessagesListEmpty from "../../components/account/MessagesListEmpty";

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from "../../components/controls/Header";

import { Dimensions } from "react-native";
var { height, width } = Dimensions.get("window"); // Screen dimensions in current orientation

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    storeData: state.storeData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        getMessages,
        setMessageRead,
      },
      dispatch
    ),
  };
}

/**
 * ### Translations
 */
import I18n from "../../lib/i18n";
import styles from "../../config/styles";

interface Props {
  route: MessagesScreenRouteProp;
  navigation: StackNavigationProp<AccountSettingsParamList, "MessagesScreen">;
}

const MessagesScreen: React.FC<Props> = ({ route, navigation }) => {
  const storeData = useAppSelector(StoreData);
  const _messages = useAppSelector(Messages);
  const LastMessagesPage = useAppSelector(lastMessagesPage);
  const EndReachedMessagesPage = useAppSelector(endReachedMessagesPage);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [myMessages, setMyMessages] = React.useState(_messages);

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  let self = this;

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getMessages(LastMessagesPage));

      //setDataLoaded(true); // закомментил для проверки, пусть снова обновляется каждый раз
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useEffect(() => {
    setMyMessages([..._messages]);

    setTimeout(() => {
      if (_messages) {
        _messages.forEach((element) => {
          if (element.active) {
            dispatch(setMessageRead(element._id));
          }
        });
      }
    }, 3000);
  }, [_messages]);

  let _goToMessageDetails = async (id: string) => {
    //dispatch(setMessageRead(id));
    //await navigation.navigate('MessageDetailsScreen', {message_id: id});
  };

  const renderOrdersItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        _goToMessageDetails(item._id);
      }}
    >
      <MessagesListItem
        id={item._id}
        item={item}
        height={height}
        width={width}
        arrayIndex={myMessages.findIndex((item) => item._id === item._id)}
        isFetching={storeData.isFetching}
        theme={theme}
      />
    </TouchableOpacity>
  );

  const renderOrdersEmptyItem = () => (
    <MessagesListEmpty
      height={height}
      width={width}
      theme={theme}
      isFetching={storeData.isFetching}
    />
  );

  let renderFooter = () => {
    if (storeData.isFetching) {
      return <HeaderActivity isFetching={storeData.isFetching} />;
    } else {
      return (
        <View
          style={{
            marginBottom: 0.07732 * height,
            //borderColor: '#000',
            //borderWidth: 1,
          }}
        ></View>
      );
    }
  };

  let handleLoadMore = async () => {
    if (storeData.isFetching || EndReachedMessagesPage) return null;

    await dispatch(getMessages(LastMessagesPage));
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentInsetAdjustmentBehavior="automatic"
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flexGrow: 1,
          padding: 0,
          marginTop: 10,
          marginLeft: 0.0483 * width,
          marginRight: 0.0483 * width,
          flexDirection: "column",
          alignContent: "flex-start",
          borderColor: "#000",
          //borderWidth: 1,
        }}
      >
        <FlatList
          style={{ width: 0.9034 * width }}
          data={myMessages}
          onRefresh={handleLoadMore.bind(self)}
          refreshing={isListRefreshing}
          onEndReached={handleLoadMore.bind(self)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          renderItem={renderOrdersItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={renderOrdersEmptyItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

// Alert dialog
const createAlert = (message) =>
  Alert.alert("Error!", message, [{ text: "Done" }]);
