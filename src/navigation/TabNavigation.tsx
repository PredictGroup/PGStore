/**
 * # TabNavigation.tsx
 *
 *  The container to display the tabs form
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

/**
 * The actions we need
 */
import {useAppSelector} from '../hooks';
import {
  Auth,
  Device,
  StoreData,
  qtyInCart,
  lastCartPage,
  qtyUnreadMessages,
  qtyUnreadChat,
  UserArea,
  UserWarehouse,
} from '../redux/selectors';
import {checkOrCreateNewUser, logout} from '../reducers/auth/authActions';
import {getCart, getMessages, getChat, getBanners,} from '../reducers/storedata/storedataActions';
import {useAppDispatch} from '../hooks';

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    device: state.device,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        checkOrCreateNewUser,
        logout,
        getCart,
        getMessages,
        getChat,
        getBanners,
      },
      dispatch,
    ),
  };
}

import React, {useRef, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions, StackActions} from '@react-navigation/native';
import {RootStackParamList} from '../../types';

import {AppState, Text, View} from 'react-native';
import {
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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '../../types';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';

import ShopIcon from '../icons/ShopIcon';
import ExploreIcon from '../icons/ExploreIcon';
import CartIcon from '../icons/CartIcon';
import FavoriteIcon from '../icons/FavoriteIcon';
import AccountIcon from '../icons/AccountIcon';

import ShopScreen from '../containers/shop/Shop';
import AccountSettingsScreen from '../containers/account/Settings';
import ExploreScreen from '../containers/explore/Explore';
import CartScreen from '../containers/cart/Cart';
import FavoriteScreen from '../containers/favorites/Favorites';

// function ShopScreen() {
//   const theme = useTheme();
//   return (
//     <SafeAreaView style={theme.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Shop!</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// function AccountScreen() {
//   const theme = useTheme();
//   return (
//     <SafeAreaView style={theme.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Account!</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// function ExploreScreen() {
//   const theme = useTheme();
//   return (
//     <SafeAreaView style={theme.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Explore!</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// function FavoriteScreen() {
//   const theme = useTheme();
//   return (
//     <SafeAreaView style={theme.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Favorite!</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// function CartScreen() {
//   const theme = useTheme();
//   return (
//     <SafeAreaView style={theme.container}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Cart!</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'TabNavigation'>;
}

const TabMain: React.FC<Props> = ({navigation}) => {
  const auth = useAppSelector(Auth);
  const device = useAppSelector(Device);
  const storeData = useAppSelector(StoreData);
  const totalInCart = useAppSelector(qtyInCart);
  const totalUnreadMessages = useAppSelector(qtyUnreadMessages);
  const totalUnreadChat = useAppSelector(qtyUnreadChat);
  const LastCartPage = useAppSelector(lastCartPage);
  const dispatch = useAppDispatch();

  const userArea = useAppSelector(UserArea);
  const userWarehouse = useAppSelector(UserWarehouse);

  //+ при загрузке или перезагрузке приложения делаем проверку токена
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [isAppReloaded, setAppReloaded] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');

        if (auth.FirebaseUID) {
          dispatch(checkOrCreateNewUser(auth.FirebaseUID, '', device.uniqueID, userArea, userWarehouse));
        } else {
          console.log('TabNavigation logout: ', auth.FirebaseUID);
          dispatch(logout());
        }
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    if (isAppReloaded) {
      setAppReloaded(false);
      //console.log('AppState setAppReloaded', appState.current, isAppReloaded);

      let timeout = 1000;

      if (auth.FirebaseUID) {
        dispatch(checkOrCreateNewUser(auth.FirebaseUID, '', device.uniqueID, userArea, userWarehouse));
      } else {
        console.log('TabNavigation logout: ', auth.FirebaseUID);
        dispatch(logout());
      }
      //dispatch(checkOrCreateNewUser(auth.FirebaseUID, '', device.uniqueID, userArea, userWarehouse));
      if(!auth.createdUser){
        timeout = 3500;
      }
      setTimeout(() => {
        if (auth.createdUser && !storeData.isFetching) {
          dispatch(getCart(0));
          dispatch(getMessages(0));
          dispatch(getChat(0));
          //dispatch(getBanners());
        }
      }, timeout);
    }
  }, [isAppReloaded]);
  //- при загрузке или перезагрузке приложения делаем проверку токена

  return (
    <Tab.Navigator
      initialRouteName="ShopTab"
      //backBehavior='none'
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'ShopTab') {
            iconName = focused ? (
              <ShopIcon color={color} width={50} height={42} />
            ) : (
              <ShopIcon color={color} width={50} height={42} />
            );
          } else if (route.name === 'ExploreTab') {
            iconName = focused ? (
              <ExploreIcon color={color} width={50} height={42} />
            ) : (
              <ExploreIcon color={color} width={50} height={42} />
            );
          } else if (route.name === 'CartTab') {
            iconName = focused ? (
              <CartIcon color={color} width={50} height={42} />
            ) : (
              <CartIcon color={color} width={50} height={42} />
            );
          } else if (route.name === 'FavoriteTab') {
            iconName = focused ? (
              <FavoriteIcon color={color} width={64} height={42} />
            ) : (
              <FavoriteIcon color={color} width={64} height={42} />
            );
          } else if (route.name === 'AccountTab') {
            iconName = focused ? (
              <AccountIcon color={color} width={63} height={42} />
            ) : (
              <AccountIcon color={color} width={63} height={42} />
            );
          }

          // You can return any component that you like here!
          return iconName;
        },
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#53B175',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#fff',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          minHeight: 95,
          paddingTop: 5,
          shadowColor: 'rgba(85, 94, 88, 0.09)',
          shadowOffset: {width: 4, height: -5},
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        },
        //unmountOnBlur: true,
      })}>
      <Tab.Screen
        name="ShopTab"
        component={ShopScreen}
        options={{headerShown: false}}
        listeners={({navigation}) => ({
          tabPress: e => {
            console.log('Tab ShopTab pressed');
          },
        })}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{headerShown: false}}
        listeners={({navigation}) => ({
          tabPress: e => {
            console.log('Tab ExploreTab pressed');
          },
        })}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarBadge: totalInCart ? totalInCart : undefined,
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountSettingsScreen}
        options={{
          headerShown: false,
          tabBarBadge: (totalUnreadMessages + totalUnreadChat) ? (totalUnreadMessages + totalUnreadChat) : undefined,
        }}
      />
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TabMain);
