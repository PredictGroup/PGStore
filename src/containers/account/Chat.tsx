/**
 * # Chat.tsx
 *
 *  The container to display the chat with support list form
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

import {Alert, Image, KeyboardAvoidingView} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import SendIcon from '../../icons/SendIcon';

/**
 * The actions we need
 */
import {useAppSelector} from '../../hooks';
import {StoreData, Chat, lastChatPage} from '../../redux/selectors';
import {
  getChat,
  setChatRead,
  addToChat,
} from '../../reducers/storedata/storedataActions';
import {useAppDispatch} from '../../hooks';

import React, {useState, useEffect, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSettingsParamList, ChatScreenRouteProp} from '../../../types';

import {ScrollView} from 'react-native-gesture-handler';

import {
  View,
  StyleSheet,
  Platform,
  //ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  KeyboardEvent,
  SectionList,
} from 'react-native';
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
} from 'react-native-paper';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import ChatListItem from '../../components/account/ChatListItem';
import ChatListEmpty from '../../components/account/ChatListEmpty';

/**
 * The Header will display a Image and support Hot Loading
 */
import HeaderActivity from '../../components/controls/Header';
import ChatNewDate from '../../components/account/ChatNewDate';

import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window'); // Screen dimensions in current orientation

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
        getChat,
        setChatRead,
        addToChat,
      },
      dispatch,
    ),
  };
}

/**
 * ### Translations
 */
import I18n from '../../lib/i18n';
import styles from '../../config/styles';

interface Props {
  route: ChatScreenRouteProp;
  navigation: StackNavigationProp<AccountSettingsParamList, 'ChatScreen'>;
}

const ChatScreen: React.FC<Props> = ({route, navigation}) => {
  const storeData = useAppSelector(StoreData);
  const _chat = useAppSelector(Chat);
  const LastChatPage = useAppSelector(lastChatPage);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const [myChat, setMyChat] = React.useState(_chat);
  const [message, setMessage] = React.useState('');

  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [isListRefreshing, setListRefreshing] = React.useState(false);

  let self = this;

  const sectionlst = useRef<SectionList>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardVisible(true); // or some other action
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardVisible(false); // or some other action
  //     },
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      // Remove type here if not using TypeScript
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  React.useEffect(() => {
    async function prepare() {
      await dispatch(getChat(LastChatPage));

      setDataLoaded(true);
    }
    if (!dataLoaded) {
      prepare();
    }
  }, [dataLoaded]);

  React.useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (myChat && myChat.length > 0) {
        for (var i = 0; i < myChat.length; i++) {
          for (var j = 0; j < myChat[i].data.length; j++) {
            if (myChat[i].data[j].active) {
              //console.log('setChatRead: ', _chat[i].data[j]._id);
              dispatch(setChatRead(myChat[i].data[j]._id));
            }
          }
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [myChat]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (myChat && myChat.length > 0 && sectionlst.current) {
        console.log(
          'scrollToLocation: ',
          myChat.length,
          myChat[myChat.length - 1].data.length - 1,
        );
        sectionlst.current?.scrollToLocation({
          animated: true,
          sectionIndex: myChat.length - 1,
          itemIndex: myChat[myChat.length - 1].data.length - 1,
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [myChat]);

  React.useEffect(() => {
    setMyChat([..._chat]);
  }, [_chat]);

  const inputActionHandler = (field: string, payload: string) => {
    if (field === 'message') {
      setMessage(payload);
    }
  };

  let onButtonPress = async () => {
    await dispatch(addToChat(message));
    setMessage('');
  };

  const renderChatItem = ({item}) => (
    <ChatListItem
      id={item._id}
      item={item}
      height={height}
      width={width}
      arrayIndex={myChat.findIndex(item => item._id === item._id)}
      isFetching={storeData.isFetching}
      theme={theme}
    />
  );

  const renderChatEmptyItem = () => (
    <ChatListEmpty
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
      return null;
    }
  };

  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View />
    );
  };

  let handleLoadMore = async () => {
    if (storeData.isFetching) return null;
    if (storeData.endReachedChatPage) return null;

    await dispatch(getChat(LastChatPage));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StatusBar translucent backgroundColor="transparent" />
        <View
          style={{
            padding: 0,
            marginTop: 10,
            marginLeft: 0.0483 * width,
            marginRight: 0.0483 * width,
            borderColor: '#000',
            //borderWidth: 1,
          }}>
          <SectionList
            ref={sectionlst}
            style={{width: 0.9034 * width}}
            //inverted
            nestedScrollEnabled={true}
            ItemSeparatorComponent={FlatListItemSeparator}
            sections={myChat}
            keyExtractor={item => item._id}
            onRefresh={handleLoadMore.bind(self)}
            onEndReached={handleLoadMore.bind(self)}
            onEndReachedThreshold={0.5}
            refreshing={isListRefreshing}
            renderItem={renderChatItem}
            /*             renderSectionHeader={({section}) =>
              myChat[0].title !== section.title ? (
                <ChatNewDate title={section.title}></ChatNewDate>
              ) : null
            } */
            renderSectionHeader={({section}) => (
              <ChatNewDate title={section.title}></ChatNewDate>
            )}
            ListEmptyComponent={renderChatEmptyItem}
            ListFooterComponent={() => renderFooter()}
            stickySectionHeadersEnabled={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: isKeyboardVisible ? 0 : 0.13 * height,
        }}>
        <View
          style={{
            marginTop: 5,
            marginLeft: 0.0483 * width,
            marginRight: 0.0483 * width,
            borderRadius: 5,
            flexDirection: 'row',
            alignContent: 'stretch',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#F4F4F4',
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: '#F4F4F4',
              marginBottom: 10,
            }}>
            <TextInput
              label="Сообщение"
              mode="flat"
              selectionColor="#030303"
              activeUnderlineColor="#030303"
              value={message}
              placeholder="Напишите сообщение"
              style={(theme.input, {flex: 3, backgroundColor: '#F4F4F4'})}
              onChangeText={text => inputActionHandler('message', text)}
              disabled={storeData.isFetching}
              onFocus={() => setKeyboardVisible(true)}
              onBlur={() => setKeyboardVisible(false)}
              onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity
              style={{backgroundColor: '#F4F4F4', marginRight: 10}}
              onPress={onButtonPress}>
              <SendIcon color={'#181725'} width={20} height={20}></SendIcon>
            </TouchableOpacity>
          </View>
          {Platform.OS === 'android' && <KeyboardSpacer />}
        </View>

        {Platform.OS === 'ios' && <KeyboardSpacer />}
        {/*         {Platform.OS === 'android' && (
          <View
            style={{
              marginTop: keyboardHeight,
            }}></View>
        )} */}
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{text: 'Done'}]);
