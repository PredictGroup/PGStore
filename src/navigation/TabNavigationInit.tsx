/**
 * # TabNavigationInit.tsx
 *
 *  The container to display the tabs form (not logged in Tabs)
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
import {Auth, Device, StoreData} from '../redux/selectors';
import {useAppDispatch} from '../hooks';

import {getBanners,} from '../reducers/storedata/storedataActions';

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
    ...bindActionCreators({getBanners}, dispatch),
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
import {InitBottomTabParamList} from '../../types';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';

import ShopIcon from '../icons/ShopIcon';
import ExploreIcon from '../icons/ExploreIcon';
import CartIcon from '../icons/CartIcon';
import FavoriteIcon from '../icons/FavoriteIcon';
import AccountIcon from '../icons/AccountIcon';

import InitShopScreen from '../containers/init/shop/Shop';
import InitExploreScreen from '../containers/init/explore/Explore';

function InitAccountScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={theme.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Account!</Text>
      </View>
    </SafeAreaView>
  );
}

function InitFavoriteScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={theme.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Favorite!</Text>
      </View>
    </SafeAreaView>
  );
}

function InitCartScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={theme.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Cart!</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator<InitBottomTabParamList>();

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'TabNavigation'>;
}

const InitTabMain: React.FC<Props> = ({navigation}) => {
  const auth = useAppSelector(Auth);
  const device = useAppSelector(Device);
  const storeData = useAppSelector(StoreData);

  const dispatch = useAppDispatch();

  const [isAppReloaded, setAppReloaded] = useState(true);


  useEffect(() => {
    if (isAppReloaded) {
      setAppReloaded(false);

      let timeout = 1000;
      setTimeout(() => {

          //dispatch(getBanners());
        
      }, timeout);
    }
  }, [isAppReloaded]);

  return (
    <Tab.Navigator
      initialRouteName="InitShopTab"
      //backBehavior='none'
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'InitShopTab') {
            iconName = focused ? (
              <ShopIcon color={color} width={50} height={42} />
            ) : (
              <ShopIcon color={color} width={50} height={42} />
            );
          } else if (route.name === 'InitExploreTab') {
            iconName = focused ? (
              <ExploreIcon color={color} width={50} height={42} />
            ) : (
              <ExploreIcon color={color} width={50} height={42} />
            );
          } else if (route.name === 'InitCartTab') {
            iconName = focused ? (
              <CartIcon color={color} width={50} height={42} />
            ) : (
              <CartIcon color={color} width={50} height={42} />
            );
          } else if (route.name === 'InitFavoriteTab') {
            iconName = focused ? (
              <FavoriteIcon color={color} width={64} height={42} />
            ) : (
              <FavoriteIcon color={color} width={64} height={42} />
            );
          } else if (route.name === 'InitAccountTab') {
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
        name="InitShopTab"
        component={InitShopScreen}
        options={{headerShown: false}}
        listeners={({navigation}) => ({
          tabPress: e => {
            console.log('Tab ShopTab pressed');
          },
        })}
      />
      <Tab.Screen
        name="InitExploreTab"
        component={InitExploreScreen}
        options={{headerShown: false}}
        listeners={({navigation}) => ({
          tabPress: e => {
            console.log('Tab ExploreTab pressed');
          },
        })}
      />
      <Tab.Screen
        name="InitCartTab"
        component={InitCartScreen}
        options={{
          headerShown: false,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.replace('SignUpSocial');
          },
        })}
      />
      <Tab.Screen
        name="InitFavoriteTab"
        component={InitFavoriteScreen}
        options={{headerShown: false}}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.replace('SignUpSocial');
          },
        })}
      />
      <Tab.Screen
        name="InitAccountTab"
        component={InitAccountScreen}
        options={{
          headerShown: false,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.replace('SignUpSocial');
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InitTabMain);
