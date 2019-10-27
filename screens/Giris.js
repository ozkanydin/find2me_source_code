import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View,BackHandler, TextInput,TouchableOpacity,AsyncStorage,ImageBackground,TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
console.disableYellowBox = true;
import Image from 'react-native-scalable-image';
export default class Giris extends Component {

  state = {
      
     kadi: '',
      sifre: '',
   }
   constructor(props) {
    super(props);
    this.state = {
      isLogin: '',
     i:'',
     k:'',
     s:'',
     say : '',



    }
  }
  


  
  session(status: string) {
    
    AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) )
    
  }
  setData(i,k,s){
      AsyncStorage.setItem('i', i);
      this.setState({ i: i});
      AsyncStorage.setItem('k', k);
      this.setState({ k: k });
      AsyncStorage.setItem('s', s);
      this.setState({ s: s });
     
   }

   
signin = (kadi,sifre) => {


   firebase.database().ref("uye").orderByChild("kadii").once('value', (snap) => {
      let user = [];
      let say  = 0;
      let sayx = 0;
      snap.forEach((uye) => {

        const {isimm,kadii,sifree} = uye.val();
        if(sifree === sifre && kadii == kadi){
        user.push({isimm,kadii,sifree});
        user.push({isimm,kadii,sifree});
        AsyncStorage.setItem('isLogin', 'true');
        this.setData(isimm,kadii,sifree);
        Actions.anasayfa()
        sayx = 1;
        

  
        }else{
          say = 1;
        }

        
            
         

      })
if(say == 1 && sayx !== 1){
          alert('Tekrar Deneyiniz')
        }
      
    })


   



    
   

    
}

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  }
  goBack = () => {
    BackHandler.exitApp();

  }


   

  

  render() {


    return (

      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
<ImageBackground    source={require('./resim21.jpg')} style={{  width: '100%', height: '100%', }}>
<View style={{marginTop:150,marginBottom:30,alignSelf:'center'}}>
 <Image
        height={42}     
        // height will be calculated automatically
       source={require('./logo5.png')}
   />
  </View>
          <TextInput placeholder="Kullanıcı Adı" value={this.state.kadi}
                onChangeText={ (text)=> this.setState({kadi: text}) } placeholderTextColor="black" style={styles.loginFormTextInput} />
            <TextInput placeholder="Şifre" value={this.state.sifre}
                onChangeText={ (text)=> this.setState({sifre: text}) } placeholderTextColor="black" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
               onPress={() => this.signin(this.state.kadi,this.state.sifre)} 
              title="Giriş Yap"
            />
            <TouchableOpacity style={{alignSelf: 'center',marginTop:5,}} onPress={ () => Actions.kayit() } >
            <Text style={{color:'white'}}>Bir hesabın yok mu? Kayıt ol</Text>
            </TouchableOpacity>
          
          
          
    
       </ImageBackground>

            
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress() {

  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
}
