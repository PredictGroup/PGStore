import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import TabNavigation from './navigation/TabNavigation';
import SelectLocation from './containers/settings/SelectLocation';
import AllowNotifications from './containers/settings/AllowNotifications';

/**
 * ### Translations
 */
import I18n from './lib/i18n';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectLocation"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        key="SelectLocation"
        name="SelectLocation"
        component={SelectLocation}
        options={{title: I18n.t('App.select_location')}}
      />
      <Stack.Screen
        key="AllowNotifications"
        name="AllowNotifications"
        component={AllowNotifications}
        options={{title: I18n.t('Orders.allow_notifications')}}
      />
      <Stack.Screen key="Root" name="Root" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default Auth;
