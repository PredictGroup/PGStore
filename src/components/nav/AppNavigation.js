
import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
  
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// export function replace(name){
//   navigationRef.current?.replace(name);
// }

export function goBack(){
  navigationRef.current?.goBack();
}

export function replace(name) {
  navigationRef.current?.dispatch(StackActions.replace(name));
}

export function reset(name){
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}