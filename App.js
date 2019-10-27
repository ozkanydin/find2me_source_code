import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './screens/index';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
export default class App extends React.Component {
  componentWillMount(){

     var firebaseConfig = {
    apiKey: "AIzaSyBjooVORjhT5HsWZtTZvFt9DrjDZ2dRKpw",
    authDomain: "find2me-f227c.firebaseapp.com",
    databaseURL: "https://find2me-f227c.firebaseio.com",
    projectId: "find2me-f227c",
    storageBucket: "find2me-f227c.appspot.com",
    messagingSenderId: "1060732416879",
    appId: "1:1060732416879:web:71066fc61a7aa56c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  }

  render() {
    return (
      <Start />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
