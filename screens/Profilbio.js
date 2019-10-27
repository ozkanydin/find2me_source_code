import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput,TouchableOpacity,Picker,AsyncStorage, ImageBackground,TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { ActionPicker } from 'react-native-action-picker';
import {ImagePicker, Permissions, Constants} from 'expo';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
console.disableYellowBox = true;
import DatePicker from 'react-native-datepicker';




export default class Duzenle extends Component {
   


  

state = {
      
      kadimm:"",
      
      bio:"",
      
      random:'',
       avatarSource: '',
      image:'',
      imagee : '',

      urll: '',
      uploading:'',
      gidenfoto : '',
      gidenbio : '',

      
      
      
     
    }


  
   
    


  
 

   
      

 


    componentWillMount() {

      AsyncStorage.getItem('k').then( value => this.setState({kadimm: value}) );
      
    



         

  }

  
 signup = () => {

if(this.state.bio == ""){

  firebase.database().ref('uye_detay/'+this.state.kadimm).update({
                 
                 bio: this.props.bio,

                 });
  this.setState({gidenbio : this.props.bio });

}else{
  firebase.database().ref('uye_detay/'+this.state.kadimm).update({
                 
                 bio: this.state.bio,

                 });
  this.setState({gidenfoto : this.state.bio });

}
 
 
      
            
            
          Actions.pop({gidenfoto : this.state.gidenfoto , gidenbio : this.state.gidenbio });
      


  }

  
  
 


   

  render() {
   let { image } = this.state;
    return (

      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
<ImageBackground    source={require('./resim21.jpg')} style={{  width: '100%', height: '100%', }}>


       



      <TextInput placeholder="Hakkında bişeyler yaz." placeholderTextColor="black"  style={styles.loginFormTextInput} value={this.state.bio}
                onChangeText={ (text)=> this.setState({bio: text}) } />

         
            
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.signup()} 
              title="Tamamla"
            />
           
          
          
          
    
       </ImageBackground>

            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
    );
  }

  
}

