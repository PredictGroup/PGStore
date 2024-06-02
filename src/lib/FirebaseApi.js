/**
 * # FirebaseApi.js
 *
 * This class interfaces with parse-server using the rest api
 *
 *
 */
'use strict';

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from '../config/config';
import _ from 'underscore';
import Backend from './Backend';

import { Alert } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

// Google SignIn
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { Settings } from 'react-native-fbsdk-next';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { appleAuth } from '@invertase/react-native-apple-authentication';

Settings.initializeSDK();

GoogleSignin.configure({
  webClientId:
    '557264186774-qmio7t71ue9d0dhd57419h6gmlqn2rmd.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

import Toast from 'react-native-root-toast';

export class FirebaseApi extends Backend {
  /**
   * ## FirebaseApi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize() {

  }

  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup(data) {
    return await auth()
      .createUserWithEmailAndPassword(data.email, data.password)

      .then(loggedInUser => {
        //console.log('SignUp Successful!');
        //console.log('loggedInUser111: ', auth().currentUser);

        // Username
        const update = {
          displayName: data.username,
          photoURL: null,
        };
        auth().currentUser.updateProfile(update);

        return loggedInUser;
      })
      .then(UserCredential => {
        return Promise.all([auth().currentUser.getIdToken(), UserCredential]);
      })

      .catch(error => {
        console.log('Register fail with error!');

        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### signupSocial
   *
   * @param data object
   *
   * {social: "google", "facebook"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signupSocial(data) {
    //console.log('signupSocial: ', data);
    switch (data.social) {
      case 'google':
        return await this.signupGoogle()
          .then(loggedInUser => {
            //console.log('signupSocial google: ', loggedInUser);
            return Promise.all([auth().currentUser.getIdToken(), auth().currentUser]);
          })

          .catch(error => {
            console.log('Register fail with error! ', error);

            crashlytics().recordError(error);
            return Promise.reject(error);
          });
        break;

      case 'facebook':
        return await this.signupFacebook()
          .then(loggedInUser => {
            //console.log('signupSocial facebook: ', loggedInUser);
            return Promise.all([auth().currentUser.getIdToken(), auth().currentUser]);
          })
          .catch(error => {
            console.log('Register fail with error! ', error);

            crashlytics().recordError(error);
            return Promise.reject(error);
          });
        break;

      case 'apple':
        return await this.signupApple()
          .then(loggedInUser => {
            //console.log('signupSocial apple: ', loggedInUser);
            return Promise.all([auth().currentUser.getIdToken(), auth().currentUser]);
          })
          .catch(error => {
            console.log('Register fail with error! ', error);

            crashlytics().recordError(error);
            return Promise.reject(error);
          });
        break;

      default:
        throw error;
        break;
    }
  }
  async signupGoogle() {
    return await GoogleSignin.hasPlayServices()
      .then(hasPlayServices => {
        //console.log('hasPlayServices ', hasPlayServices);
        return GoogleSignin.signIn();
      })

      .then(userInfo => {
        //console.log('userInfo ', userInfo);
        return auth.GoogleAuthProvider.credential(userInfo.idToken);
      })

      .then(googleCredential => {
        //console.log('googleCredential ', googleCredential);
        return auth().signInWithCredential(googleCredential);
      })

      .then(UserCredential => {
        //console.log(UserCredential);
        return UserCredential.user;
      })

      .catch(error => {
        console.log('There was an error ', error);

        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }
  async signupFacebook() {
    // Attempt login with permissions
    //    return await manager
    //      .authorize('facebook', {scopes: 'email'})
    LoginManager.setLoginBehavior('web_only');

    return await LoginManager.logInWithPermissions(['public_profile', 'email'])

      .then(result => {
        // if (result.isCancelled) {
        //   throw 'User cancelled the login process';
        // } else {
        //   return AccessToken.getCurrentAccessToken();
        // }
        return AccessToken.getCurrentAccessToken();
      })

      .then(resp => {
        // Create a Firebase credential with the AccessToken
        // return auth.FacebookAuthProvider.credential(
        //   resp.response.credentials.accessToken,
        // );
        //console.log("signupFacebook 1: ", resp);
        if (resp) {
          return auth.FacebookAuthProvider.credential(resp.accessToken);
        }
        else {
          return Promise.reject(resp);
        }
      })
      .then(facebookCredential => {
        //console.log("signupFacebook 2: ", facebookCredential);
        return auth().signInWithCredential(facebookCredential);
        // return auth().currentUser.linkWithCredential(facebookCredential); // if logged in Anonymously
      })

      .then(UserCredential => {
        //console.log("signupFacebook 3: ", UserCredential);
        return UserCredential.user;
      })

      .catch(error => {
        console.log('There was an error ', error);

        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }
  async signupApple() {
    // Start the sign-in request
    return await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

      .then((appleAuthRequestResponse) => {
        if (!appleAuthRequestResponse.identityToken) {
          return Promise.reject('Apple Sign-In failed');
          //throw new Error('Apple Sign-In failed - no identify token returned');
        }
        // Create a Firebase credential from the response
        const {
          user: newUser,
          email,
          nonce,
          identityToken,
          realUserStatus /* etc */,
        } = appleAuthRequestResponse;
        return auth.AppleAuthProvider.credential(identityToken, nonce);
      })

      .then(appleCredential => {
        return auth().signInWithCredential(appleCredential);
      })

      .then(UserCredential => {
        return UserCredential.user;
      })

      .catch(error => {
        console.log('There was an error ', error);

        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login(data) {
    return await auth()
      .signInWithEmailAndPassword(data.email, data.password)

      .then(UserCredential => {
        console.log('UserCredential: ', UserCredential);
        return Promise.all([auth().currentUser.getIdToken(), auth().currentUser]);
      })
      .catch(error => {
        console.warn('Login fail!! ', error);
        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout() {
    var user = auth().currentUser;
    if (user) {
      console.log('User logout 1: ', user.providerData[0].providerId);
      if (user.providerData[0].providerId === 'facebook.com') {
        //manager.deauthorize('facebook');
        LoginManager.logOut();
      }
      if (user.providerData[0].providerId === 'google.com') {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
      }
    }

    return await auth()
      .signOut()
      .then(() => {
        return {};
      })
      .catch(error => {
        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword(data) {
    return await auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        return {};
      })
      .catch(error => {
        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### verifyEmail
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async verifyEmail(data) {
    const user = auth().currentUser;
    user.reload(); // refresh user data
    if (user) {
      if (!user.emailVerified) {
        if (user.providerData[0].providerId === 'password') {
          return await user
            .sendEmailVerification()
            .then(() => {
              auth().signOut();
              Toast.show('Email was send to ' + data.email + '!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true
              });
              return Promise.reject(new Error("Check email verification please!"));
            })
            .catch(error => {
              //crashlytics().recordError(error);
              return Promise.reject(error);
            });
        } else {
          return Promise.all([auth().currentUser.getIdToken(), auth().currentUser]);
        }
      } else {
        return Promise.all([auth().currentUser.getIdToken(), auth().currentUser]);
      }
    } else {
      return Promise.reject(new Error('Check email verification please!'));
    }
  }

  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile(data) {
    var user = await auth().currentUser;

    if (user) {
      return { username: user.displayName, email: user.email, emailVerified: user.emailVerified };
    } else {
      crashlytics().recordError(error);
      return Promise.reject(error);
    }
  }

  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id of Parse.com
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile(userId, data) {
    const update = {
      displayName: data.username,
      photoURL: null,
    };

    return await auth()
      .currentUser.updateProfile(update)
      .then(() => {
        return {};
      })
      .then(() => {
        const user = auth().currentUser;
        if (user.email !== data.email) {
          return user.verifyBeforeUpdateEmail(data.email);
        } else {
          return {};
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### getUserUid
   *
   *
   * @returns user uid
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async getUserUid() {
    const user = auth().currentUser;

    return await this.getFirebaseToken()
      .then(token => {
        //console.log('getFirebaseToken 111: ', user.uid, token);
        return Promise.resolve({
          uid: user.uid,
          token: token,
        });
      })
      .catch(error => {
        console.log('getFirebaseToken error: ', user.uid);
        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  /**
   * ### getUser
   *
   *
   * @returns user
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async getUser() {
    return new Promise(resolve =>
      auth().onAuthStateChanged(user => resolve(user)),
    );
  }

  /**
   * ### getFirebaseToken
   *
   *
   * @returns token
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async getFirebaseToken() {
    if (!auth().currentUser) {
      console.log('getFirebaseToken: not logged in');
      return Promise.reject("not logged in");
    }
    return await auth().currentUser.getIdToken()
      .then(token => {
        //console.log('getFirebaseToken token: ', token);
        return Promise.resolve(token);
      })
      .catch(error => {
        console.log('getFirebaseToken error: ', error);
        crashlytics().recordError(error);
        return error;
      });
  }

  /**
  * ### delete user
  */
  async delete() {
    var user = auth().currentUser;

    return await user.delete()
      .then(() => {
        return Promise.resolve();
      })
      .catch(error => {
        crashlytics().recordError(error);
        return Promise.reject(error);
      });
  }

  // -------------=====-------------
}
// The singleton variable
export let firebaseApi = new FirebaseApi();

// Alert dialog
const createAlert = message => Alert.alert('Error!', message, [{ text: 'Done' }]);
