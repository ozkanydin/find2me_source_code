import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput,TouchableOpacity, ImageBackground,TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { ActionPicker } from 'react-native-action-picker';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
console.disableYellowBox = true;
import Imagex from 'react-native-scalable-image';

export default class Kayit extends Component {

state = {


      isim:"",
      mail:"",
      kadi:"",
      sifre:"",
      userz:[],
      kadik: '',
      kad: [],
      var : '',
      
      
      
     
    }


  
   
    
  
  signup = (isim,mail,kadi,sifre) => {

let x = 0;

   
 
 if(this.state.isim === '' || this.state.mail=== "" || this.state.kadi === ''|| this.state.sifre === ''){
      alert('Boş Bırakmayınız')
      return true;
         }else{

firebase.database().ref("uye").orderByChild("kadii").once('value', (snap) => {
      
      snap.forEach((users) => {

        const {kadii} = users.val();
        
       if(kadii == this.state.kadi){
        this.setState({var : "1"});
       }

       
       


        
         })
       
           
      

       
    })
              }
              if(this.state.var == "" ){
                 firebase.database().ref('/uye').push({
                  isimm: this.state.isim,
                  kadii: this.state.kadi,
                  
                  sifree: this.state.sifre
                 });
                 Actions.fotosec({kadii : this.state.kadi});
              }else{
                alert('Kullanıcı adı kullanımda.')
              }

      
            
            


          } 


      


  
   
      

 


   

  render() {
    return (

      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
<ImageBackground    source={require('./resim21.jpg')} style={{  width: '100%', height: '100%', }}>
<View style={{marginTop:150,marginBottom:30,alignSelf:'center'}}>
 <Imagex
        height={42}     
        // height will be calculated automatically
       source={require('./logo5.png')}
   />
  </View>


<TextInput placeholder="İsim" placeholderTextColor="black" style={styles.loginFormTextInput}  value={this.state.isim}
                onChangeText={ (text)=> this.setState({isim: text}) } />

<TextInput placeholder="Mail Adresi" placeholderTextColor="black"  style={styles.loginFormTextInput} value={this.state.mail}
                onChangeText={ (text)=> this.setState({mail: text}) } />

          <TextInput placeholder="Kullanıcı Adı" placeholderTextColor="black" style={styles.loginFormTextInput}  value={this.state.kadi}
                onChangeText={ (text)=> this.setState({kadi: text}) } />

            <TextInput placeholder="Şifre" placeholderTextColor="black" style={styles.loginFormTextInput} secureTextEntry={true}  value={this.state.sifre}
                onChangeText={ (text)=> this.setState({sifre: text}) }/>

            
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.signup(this.state.isim,this.state.mail,this.state.kadi,this.state.sifre)} 
              title="Kayıt Ol"
            />
           
          
          
          
    
       </ImageBackground>

            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
    );
  }

  
}

