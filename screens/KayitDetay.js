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
      cinsiyet:null,
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

      
      
      
     
    }


  
   
   


  
  signup = (cinsiyet,date,bio,sehir,tel,insta) => {



let tercih = "";


   
 
 if( this.state.bio == "" || cinsiyet == null || this.state.date === ''|| this.state.sehir === '' || this.state.tel==="" ||   this.state.insta == ""){
      alert('Boş Bırakmayınız');

      
         }else{

          
          if(this.state.cinsiyet == "erkek"){
             tercih  = "kadin";
          }
          if(this.state.cinsiyet == 'kadin'){
            tercih = 'erkek';
          }
          


                 
                  firebase.database().ref('/uye_detay/'+this.props.kadii).set({
                  kadi: this.props.kadii,
                  foto: this.props.foto,
                  cinsiyet: this.state.cinsiyet,
                  date: this.state.date,
                  bio: this.state.bio,
                  sehir: this.state.sehir,
                  tel : this.state.tel,
                  insta : this.state.insta,
                  ref: "bos",
                  tercih: tercih,
                  gizlilik: "acik",
                  token : "x",
                  
                 });
                 Actions.giris();
                 
              }

      
            
            
          
      


  }


   
      

 


   async componentWillMount() {
     
       this.setState({random: "_" + Math.random().toString(36).substr(2, 9)});
    
      

          this.setState({kadi: this.props.kadii });
  }



 


  
  
 


   

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
       


<Picker
  selectedValue={this.state.cinsiyet}
  style={{height: 50, width: 200, alignSelf:'center'}}
  onValueChange={(itemValue) => this.setState({cinsiyet: itemValue})}>
  <Picker.Item label="Cinsiyet" value="" />
  <Picker.Item label="Erkek" value="erkek" />
  <Picker.Item label="Kadın" value="kadin" />
</Picker>

<DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="Doğum günü"
        format="YYYY-MM-DD"
        minDate="1940-01-01"
        maxDate="2020-01-01"
        confirmBtnText="Tamam"
        cancelBtnText="Çıkış"
        customStyles={{
          dateIcon: {
            alignSelf: "center"
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <TextInput placeholder="Hakkında bişeyler yaz." placeholderTextColor="black"  style={styles.loginFormTextInput} value={this.state.bio}
                onChangeText={ (text)=> this.setState({bio: text}) } />
      <TextInput placeholder="Şehir" placeholderTextColor="black"  style={styles.loginFormTextInput} value={this.state.sehir}
                onChangeText={ (text)=> this.setState({sehir: text}) } />
<TextInput placeholder="Telefon Numarası" placeholderTextColor="black"  style={styles.loginFormTextInput} value={this.state.tel}
                onChangeText={ (text)=> this.setState({tel: text}) } />
<TextInput placeholder="İnstagram Kullanıcı Adınız" placeholderTextColor="black"  style={styles.loginFormTextInput} value={this.state.insta}
                onChangeText={ (text)=> this.setState({insta: text}) } />
                <TouchableOpacity
                onPress={() => {
              this.setState({
                slideAnimationDialog: true,
              });
            }} 

                ><Text style={{fontSize : 11,paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,}}>Neden İnstagram Kullanıcı Adı ?</Text></TouchableOpacity>
              
                <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          dialogTitle={<DialogTitle title="Neden İnstagram Kullanıcı Adı ?" />}
          
          >
          <DialogContent>
            <Text>
              İnsanlarla hızlı ve çabuk bir şekilde iletişime geçmek için mesajlaşma dışında diğer tercih olacağı için istiyoruz.
              Hesabınızı gizli şekilde tuttuğunuz sürece onay vermediğiniz kullanıcılar göremeyecektir.
            </Text>
          </DialogContent>
        </Dialog>

                

               
         
            
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.signup(this.state.cinsiyet,this.state.date,this.state.bio,this.state.sehir,this.state.tel,this.state.insta)} 
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

