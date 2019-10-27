import React, { Component } from 'react';
import {
  Platform,BackHandler,Dimensions,AsyncStorage,RefreshControl,Switch,StyleSheet,Image,TouchableHighlight, Text,TextInput, View,ScrollView,Button,TouchableOpacity, FlatList,ImageBackground
} from 'react-native';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import {Actions} from 'react-native-router-flux';
console.disableYellowBox = true;
import PropTypes from 'prop-types';
const {width,height} = Dimensions.get('window');
import { Constants, Location, Permissions } from 'expo';
import { robotoWeights } from 'react-native-typography';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveImage from 'react-native-responsive-image';
//import Image from 'react-native-scalable-image';
import ToggleSwitch from 'toggle-switch-react-native';
import Imagex from 'react-native-scalable-image';
export default class Contacts extends Component {

  

  

  render() {

    return(
      <View style={{ flex: 1 }} >
      <View style={{width:width,height:80,backgroundColor:'white',borderBottomWidth:0.5,borderColor:'black',alignItems:'center',justifyContent:'center'}}>

        <View style={{position:'absolute',top:38,bottom:2}}>
       <Imagex
        height={27}     
        // height will be calculated automatically
       source={require('./logo.png')}
   />

       </View>

  </View>

  <View style={{flex:1,}}>  
                 <ImageBackground blurRadius={1}blurStyle='dark'     source={require('./arka.jpg')} style={{  width: '100%', height: '100%', }}>
                 
                 <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center'}}>
                      
                      <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:15}}>Şuan bunun üzerinde çalışıyoruz.</Text>
                      <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:15}}>En kısa zaman da hazır olur.</Text>
                  
                 </View>
           
          
          
          
    
       </ImageBackground>
              </View>  
        
      </View>
    );
  }
}

