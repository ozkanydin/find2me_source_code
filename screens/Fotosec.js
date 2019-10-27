import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput,TouchableOpacity,Picker,Dimensions, ImageBackground,TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { ActionPicker } from 'react-native-action-picker';
import {ImagePicker, Permissions, Constants,Notifications} from 'expo';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
console.disableYellowBox = true;
import DatePicker from 'react-native-datepicker';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import Loader from './Loader';
const {width,height} = Dimensions.get('window');
import Imagex from 'react-native-scalable-image';


export default class KayitDetay extends Component {
   


  constructor(props){
    super(props)
    this.state = {date:""}
  }

state = {
      isim:"",
      mail:"",
      kadi:"",
      sifre:"",
      userz:[],
      kadik: '',
      kad: [],
      cinsiyet:"",
      tel: "",
      sehir:"",
      insta : '',
      gel:"",
      bio:"",
      ref:'bos',
      random:'',
       avatarSource: '',
      image:'',
       slideAnimationDialog: false,

      urll: '',
      uploading:'',
      token : null,
      girdifoto:'',

      
      
      
     
    }


  
   
   


  
  signup = (image) => {



let tercih = "";


   
 
 if( image == null ){
    if(this.state.girdifoto == null){
      alert('Boş bırakmayınz!');
    }else{
      alert('Hata oluştu tekrar deneyiniz');
    }
      

      
         }else{

          
          
          
 this.timeoutHandle = setTimeout(()=>{
  <Loader/>
  firebase.database().ref('/uye_detay/'+this.props.kadii).set({
                  kadi: this.props.kadii,
                  foto: this.state.image,
                  
                  
                 });
                 Actions.kayitdetay({kadii: this.props.kadii,foto:this.state.image});
            
         }, 1250);

                 
                  
                 
              }

      
            
            
          
      


  }


   
      

 


   async componentWillMount() {
     
       this.setState({random: "_" + Math.random().toString(36).substr(2, 9)});
    
      

          this.setState({kadi: this.props.kadii });
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
      this.setState({girdifoto:'1'});
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
    .child(this.props.kadii);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

 
   let a =  await snapshot.ref.getDownloadURL();
  this.setState({image: a });

    }
    
};


  
  
 


   

  render() {

   
    return (

      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
<ImageBackground    source={require('./resim21.jpg')} style={{  width: '100%', height: '100%', }}>
<View style={{width:width,height:80,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
  <View style={{position:'absolute',top:38,bottom:2}}>
       <Imagex
        height={27}     
        // height will be calculated automatically
       source={require('./logo.png')}
   />

       </View>

  </View>
<View style={{justifyContent:'center',alignItems:'center'}}>
<Button
  buttonStyle={{
    backgroundColor: 'green',
  borderRadius: 5,
  height: 45,
  margin:5,
  marginTop: 30,
  }}
          title="Profil fotoğrafı ekle"
           onPress={this._pickImage}
        />
</View>
       




                

               
         
            
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.signup(this.state.image)} 
              title="Devam"
            />
           
          
          
          
    
       </ImageBackground>

            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
    );
  }

  
}

