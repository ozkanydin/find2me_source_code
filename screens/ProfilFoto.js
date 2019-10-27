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
       this.setState({random: "_" + Math.random().toString(36).substr(2, 9)});
    this.getPermissionAsync();
    



         

  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Hata oluştu tekrar deneyiniz.');
      }
    }
  }

  
    _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        
    });

    console.log(result);

    if (!result.cancelled) {
        
        

        const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', result.uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref("images")
    .child(this.state.kadimm);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

   let a =  await snapshot.ref.getDownloadURL();
  this.setState({image: a });

    }
};

 signup = () => {

if(this.state.image == ""){
  firebase.database().ref('uye_detay/'+this.state.kadimm).update({
                 foto: this.props.foto,
                 
                 });
  this.setState({gidenfoto : this.props.foto });
}else{
  firebase.database().ref('uye_detay/'+this.state.kadimm).update({
                 foto: this.state.image,
                 
                 });
  this.setState({gidenfoto : this.state.image });
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

<Button
  buttonStyle={{
    backgroundColor: 'green',
  borderRadius: 5,
  height: 45,
  margin:5,
  marginTop: 10,
  }}
          title="Bir fotoğraf seç"
           onPress={this._pickImage}
        />
       



     
         
            
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

