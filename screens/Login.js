/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,BackHandler,Dimensions,AsyncStorage,StyleSheet, Text,TextInput, View, Image,ScrollView,Button,TouchableOpacity, FlatList,ImageBackground} from 'react-native';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import {Actions} from 'react-native-router-flux';
console.disableYellowBox = true;
import PropTypes from 'prop-types';
const {width,height} = Dimensions.get('window');
import { Constants, Location, Permissions } from 'expo';


class Login extends Component {
state = {

    latitude: null,
    longitude: null,
    k: '',
    userz:[],
    lon1:'',
    lat: null,
    lon: null,
    me: 0,
    d: 0,
    lat1: 0,
    usery:[]

}



   

componentWillMount(){


  

        AsyncStorage.getItem('k').then( value => this.setState({k: value}) );
        firebase.database().ref("uye_detay/").orderByChild('kadii').equalTo("vvv").once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,date,foto,yas,isimm,kadii,gunn,latitudee,longitudee,mesafe,cinsiyet,tercih} = konum.val();

       
 
      


          user.push({bio,date,foto,yas,isimm,kadii,gunn,latitudee,longitudee,mesafe,cinsiyet,tercih});
        
       

        
  
               
   
    


    
   
      })

 this.setState({userz: user.reverse() });

})
      

        
  
               
   
    


    
   
      







}




  render() {
    
    
    return (
  

  

<View style={{alignSelf:'center',justifyContent:'center'}} >
        
        <Text>asdasdasdxx</Text>
        <FlatList

      data={this.state.userz}
      renderItem={({item}) => 


      <Text>asdasdasd</Text>
      


      
      
      
      


      }



      />
       
    </View>
  

    

   



      );
  }
}









export default Login;




