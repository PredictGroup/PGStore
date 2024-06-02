/**
 *
 *
 * PGStore
 * https://predictgroup.com
 *
 *
 * @format
 */

import {Asset} from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

import {RootSiblingParent} from 'react-native-root-siblings';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store, persistor} from './src/config/configureStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import {
  InitialState,
  NavigationContainer,
  NavigationContext,
  NavigationRouteContext,
} from '@react-navigation/native';
import {navigationRef} from './src/components/nav/AppNavigation';
import AuthContext from './src/components/auth/AuthContext';
import {useAppDispatch} from './src/hooks';

import * as React from 'react';
import {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
  Snackbar,
  Button,
  Paragraph,
  Dialog,
  Portal,
  withTheme,
} from 'react-native-paper';
import styles_other from './src/config/styles';

import Auth from './src/Auth';
import Main from './src/Main';

import logoImage from './images/logo.png';
const logoImageUri = Image.resolveAssetSource(logoImage).uri;

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const CustomDarkTheme: ReactNativePaper.Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
  fonts: {
    ...DarkTheme.fonts,
  },
  animation: {
    ...DarkTheme.animation,
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#53B175',
    background: '#ffffff', // plum
    accent: '#5383EC',
    text: '#222233',
    disabled: '#F2F3F2',
    //backdrop: '#D8D8D8',
  },
  roundness: 8,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontWeight: 'normal',
    },
  },
  animation: {
    ...DefaultTheme.animation,
  },
  ...styles_other,
};

const PreferencesContext = React.createContext<any>(null);

export default function App() {
  return (
    <AnimatedAppLoader image={logoImageUri}>
      <MainScreen />
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({children, image}) {
  const [isSplashReady, setSplashReady] = useState(true);

  // useEffect(() => {
  //   async function prepare() {
  //     await Asset.fromModule(image.uri).downloadAsync().then(({ uri }) => {
  //       console.log('Finished downloading to ', uri);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     }); //fromURI
  //     setSplashReady(true);
  //   }

  //   prepare();
  // }, [image]);

  // if (!isSplashReady) {
  //   return null;
  // }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({children, image}) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#fff',
              opacity: animation,
            },
          ]}>
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={{ uri: logoImageUri }}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: undefined | string;
};

type Action =
  | {type: 'RESTORE_TOKEN'; token: undefined | string}
  | {type: 'SIGN_IN'; token: string}
  | {type: 'SIGN_OUT'};

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

function MainScreen() {
  const [theme, setTheme] =
    React.useState<ReactNativePaper.Theme>(CustomDefaultTheme);

  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >();
  const [isReady, setIsReady] = React.useState(false);
  const routeNameRef = React.useRef();

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () => {
        setTheme(theme =>
          theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme,
        );
      },
      theme,
    }),
    [theme],
  );

  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: undefined,
    },
  );

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      //console.log("onAuthStateChanged: ", user.providerData)
      if (user.providerData[0].providerId === 'password') {
        if (user.emailVerified) {
          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      } else {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      }
    } else {
      //dispatch({type: 'RESTORE_TOKEN', token: 'dummy-auth-token'}); // для теста изменить для статуса "авторизован"
      dispatch({type: 'SIGN_OUT'});
    } //token: 'dummy-auth-token' / undefined
    //console.log("onAuthStateChanged: ", user, state.userToken);
  }

  React.useEffect(() => {
    // const timer = setTimeout(() => {
    //   dispatch({type: 'RESTORE_TOKEN', token: undefined});
    // }, 1000);

    // return () => clearTimeout(timer);
    let user = auth().currentUser;
    if (user) {
      //console.log('useEffect: ', user);
      user.reload(); // refresh user data
      user = auth().currentUser;
      if(!user){
        dispatch({type: 'SIGN_OUT'});
      }
    } else {
      //console.log('useEffect: SIGN_OUT');
      dispatch({type: 'SIGN_OUT'});
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const isSignedIn = state.userToken !== undefined;

  const authContext = React.useMemo(
    () => ({
      isSignedIn,
      signIn: () => dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'}),
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [isSignedIn],
  );

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const state = await AsyncStorage.getItem(PERSISTENCE_KEY)
          .then(savedStateString => {
            return JSON.parse(savedStateString);
          })
          .then(json => {
            if (json) {
              setInitialState(json);
              //console.log("Set initial State: ", json);
            }
          });
      } catch (e) {
        // ignore error
        console.log('Initial State error: ', e);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <PreferencesContext.Provider value={preferences}>
                <AuthContext.Provider value={authContext}>
                  <NavigationContainer
                    ref={navigationRef}
                    initialState={initialState}
                    onReady={() => {
                      routeNameRef.current =
                        navigationRef.current.getCurrentRoute().name;
                    }}
                    onStateChange={async state => {
                      const previousRouteName = routeNameRef.current;
                      const currentRouteName =
                        navigationRef.current.getCurrentRoute().name;

                      // analytics here
                      routeNameRef.current = currentRouteName;

                      await AsyncStorage.setItem(
                        PERSISTENCE_KEY,
                        JSON.stringify(state),
                      );
                    }}>
                    {!isSignedIn ? <Auth></Auth> : <Main></Main>}
                  </NavigationContainer>
                </AuthContext.Provider>
              </PreferencesContext.Provider>
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </RootSiblingParent>
    </Provider>
  );
}
