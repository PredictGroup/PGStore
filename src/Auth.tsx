import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import Login from './containers/init/Login';
import ConnectionErr from './containers/error/ConnectionErr';
import Register from './containers/init/Register';
import ForgotPassword from './containers/init/ForgotPassword';
import SignUpSocial from './containers/init/SignUpSocial';
import Registered from './containers/init/Registered';
import TabNavigationInit from './navigation/TabNavigationInit';
import InitSelectLocation from './containers/init/settings/SelectLocation';


/**
 * ### Translations
 */
import I18n from './lib/i18n';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignUpSocial"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        key="Login"
        name="Login"
        component={Login}
        options={{title: I18n.t('App.login')}}
      />
      <Stack.Screen
        key="Register"
        name="Register"
        component={Register}
        options={{title: I18n.t('App.register')}}
      />
      <Stack.Screen
        key="Registered"
        name="Registered"
        component={Registered}
        options={{title: I18n.t('App.success')}}
      />
      <Stack.Screen
        key="ForgotPassword"
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: I18n.t('App.recovery')}}
      />
      <Stack.Screen
        key="SignUpSocial"
        name="SignUpSocial"
        component={SignUpSocial}
        options={{title: I18n.t('App.signup')}}
      />
      <Stack.Screen
        key="InitSelectLocation"
        name="InitSelectLocation"
        component={InitSelectLocation}
        options={{title: I18n.t('App.select_location')}}
      />
      <Stack.Screen
        key="RootInit"
        name="RootInit"
        component={TabNavigationInit}
      />
    </Stack.Navigator>
  );
};

export default Auth;
