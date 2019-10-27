/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,BackHandler,Dimensions,AsyncStorage,StyleSheet,Alert,Linking, Text,TextInput, View,ScrollView,Button,TouchableOpacity,TouchableHighlight, FlatList,ImageBackground} from 'react-native';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import {Actions} from 'react-native-router-flux';
console.disableYellowBox = true;
import PropTypes from 'prop-types';
const {width,height} = Dimensions.get('window');
import { Constants, Location, Permissions,Notifications } from 'expo';
import Image from 'react-native-scalable-image';
import { Ionicons } from '@expo/vector-icons';
class Detay extends Component {

state = {
  kaddi: '',
  k:'',
  begendi : null,
  onay : null,
  begenii : null,
  gizlilikk : '',
  token: null,
      notification: null,
      title: '',
      body: '',
      isimi : '',
      age_now:'',
      fotox : '',
      bio: '',
      tokeni : '',
      insta : '',


}

componentWillMount ()
{
  AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) );
  AsyncStorage.getItem('k').then( value => this.setState({k: value}) );
  this.setState({kaddi: this.props.kadi });
  

   firebase.database().ref('/uye/').orderByChild('kadii').once('value', (snap) => {
      let user = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadii,isimm} = konum.val();
        if(kadii == this.state.kaddi){
          user.push({kadii,isimm});
          this.setState({isimi : isimm});




        }
 
      

        
  
               
   


    
   
      })


})

  firebase.database().ref('/uye_detay/').orderByChild('kadi').once('value', (snap) => {
      let user = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadi,gizlilik,date,foto,bio,token,insta} = konum.val();
        if(kadi == this.props.kadi){
          this.setState({gizlilikk : gizlilik});
          this.setState({fotox : foto });
          this.setState({bio : bio });
          this.setState({tokeni : token });
          this.setState({insta : insta });
          

           var today = new Date();
    var birthDate = new Date(date);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    this.setState({age_now : age_now});
   
           firebase.database().ref('/uye_detay/'+kadi+"/begeniistek/").orderByChild('kadiii').once('value', (snap) => {
      let user = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadiii,onay} = konum.val();
        if(kadiii == this.props.kadimm){
          this.setState({begendi : true});
          
          say = 1;
        }

        if(say == 0){
          this.setState({begendi : false });
        }
        
       if(kadiii == this.state.k && onay == 1){
          this.setState({onay : true });
       }
 
       user.push({kadiii,onay});

        
  
               
   


    
   
      })


})

           firebase.database().ref('/uye_detay/'+kadi+"/begeni/").orderByChild('kadiii').once('value', (snap) => {
      let user = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadiii,onay} = konum.val();
        if(kadiii == this.props.kadimm){
          this.setState({begenii : true});
          
          say = 1;
        }

        if(say == 0){
          this.setState({begenii : false });
        }
        
       
 
       user.push({kadiii,onay});

        
  
               
   


    
   
      })


})

        }
        
        
       
 
       user.push({kadi});

        
  
               
   


    
   
      })


})
}

begeniistek = () =>{
  if(this.state.begendi !== true){

   
    firebase.database().ref('/uye_detay/'+this.state.kaddi+"/begeni/"+this.state.k).set({
                  kadiii: this.state.k,
                 
                  
                 });
    firebase.database().ref('/uye_detay/'+this.state.k+"/begendiklerin/"+this.state.kaddi).set({
                  kadiii: this.state.kaddi,
                  
                  
                 });
    firebase.database().ref('/uye_detay/'+this.state.k+"/begeni/"+this.state.kaddi).set({
                  kadiii: this.state.kaddi,
                  
                  
                 });
     firebase.database().ref('/uye_detay/'+this.state.k+"/begeniistek/"+this.state.kaddi).remove();
      firebase.database().ref('/uye_detay/'+this.state.k+"/begeniistek/"+this.state.kaddi).set({
                  kadiii: this.state.kaddi,
                  onay: 1,
                  
                  
                 });
                this.setState({begendi:true});
                this.setState({title: this.state.k});
    this.setState({body: "Profilinizi beğendi."});
     this.sendPushNotification();

  }
  if(this.state.begendi == true){

     firebase.database().ref('/uye_detay/'+this.state.kaddi+"/begeni/"+this.state.k).remove();    
     firebase.database().ref('/uye_detay/'+this.state.k+"/begendiklerin/"+this.state.kaddi).remove();
      firebase.database().ref('/uye_detay/'+this.state.k+"/begeniistek/"+this.state.kaddi).remove();
                this.setState({begendi:false});

                if(this.state.onay == true){
                  this.setState({onay : false });
                }



  }
  
}

begeni = () =>{
//notifactions bölümü
  


  if(this.state.begenii !== true){

     firebase.database().ref('/uye_detay/'+this.state.kaddi+"/begeni/"+this.state.k).set({
                  kadiii: this.state.k,
                 
                  
                 });
    firebase.database().ref('/uye_detay/'+this.state.k+"/begendiklerin/"+this.state.kaddi).set({
                  kadiii: this.state.kaddi,
                  
                  
                 });
    firebase.database().ref('/uye_detay/'+this.state.k+"/begeni/"+this.state.kaddi).set({
                  kadiii: this.state.kaddi,
                  
                  
                 });
     firebase.database().ref('/uye_detay/'+this.state.k+"/begeniistek/"+this.state.kaddi).remove();
      firebase.database().ref('/uye_detay/'+this.state.k+"/begeniistek/"+this.state.kaddi).set({
                  kadiii: this.state.kaddi,
                  onay: 1,
                  
                  
                 });
    this.setState({title: this.state.k});
    this.setState({body: "Profilinizi beğendi."});
                this.setState({begenii:true});
                this.sendPushNotification();
               

  }
  if(this.state.begenii == true){

    firebase.database().ref('/uye_detay/'+this.state.kaddi+"/begeni/"+this.state.k).remove();    
     firebase.database().ref('/uye_detay/'+this.state.k+"/begendiklerin/"+this.state.kaddi).remove();
      firebase.database().ref('/uye_detay/'+this.state.k+"/begeniistek/"+this.state.kaddi).remove();
                this.setState({begenii:false});

                



  }
  
}



  sendPushNotification(token = this.state.tokeni, title = this.state.title, body = this.state.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: this.state.title,
        body: this.state.body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  handleNotification = notification => {
    this.setState({
      notification,
    });
  };
  _handlePress = () => {
    Linking.openURL('https://instagram.com/'+this.state.insta);
    
  };


//*****************************altta isim ve yas yok düzelt.********************************************

  render() {
    
    
    return (
  

  <ScrollView style={styles.scrollContainer}>
  <View style={{width:width,height:80,backgroundColor:'white'}}>
        <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute',
left:     10,
top:      40,}}>
          <Ionicons name="md-arrow-back" size={25} style={{color:  '#ff5864'}} />
        </TouchableOpacity>
      </View>
        <View style={styles.container}>
          <View style={styles.box}>
              <Image
        height={350}     
        // height will be calculated automatically
       source={{uri: this.state.fotox}}
   />
            
          </View>
          <View style={{borderRadius:10,backgroundColor:'white',margin:10}}>
          {this.state.gizlilikk === "acik" ? <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginTop:10}}>

              <View style={{flex:2.6/5,justifyContent:'center'}}>
              <Text style={styles.name}>{this.state.isimi} , {this.state.age_now} </Text>

              </View>

              <View style={{flex:0.8/5,justifyContent:'center'}}>
              <TouchableOpacity onPress={this.begeni}>
                  {this.state.begenii? <Ionicons name="md-heart" size={23} style={{color:  '#ff5864'}} />  :
                        <Ionicons name="md-heart-empty" size={23} style={{color:  '#ff5864'}} />
                      }
                </TouchableOpacity>

              </View>

              <View style={{flex:0.8/5,justifyContent:'center'}}>
              <TouchableOpacity onPress={() => alert('Şuan bunun üzerinde çalışıyoruz. En kısa zaman da hazır olur.')}><Ionicons name="md-chatboxes" size={23} style={{color:  '#ff5864'}} />
                </TouchableOpacity>
              </View>

              <View style={{flex:0.8/5,justifyContent:'center'}}>
                  <TouchableOpacity onPress={this._handlePress }><Ionicons name="logo-instagram" size={23} style={{color:  '#ff5864'}} />
                    </TouchableOpacity>
                      
                  </View> 



              </View> 

                 :


              


                 <View>
               {this.state.onay?  
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginTop:10}}>

                  <View style={{flex:2.6/5,justifyContent:'center'}}>
                    <Text style={styles.name}>{this.state.isimi} , {this.state.age_now} </Text>

                  </View>
                  <View style={{flex:0.8/5,justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.begeniistek}>
                      {this.state.begendi? <Ionicons name="md-heart" size={23} style={{color:  '#ff5864'}} />  :
                        <Ionicons name="md-heart-empty" size={23} style={{color:  '#ff5864'}} />
                      }
                      </TouchableOpacity>

                  </View>

                  <View style={{flex:0.8/5,justifyContent:'center'}}>
                  <TouchableOpacity onPress={() => alert('Şuan bunun üzerinde çalışıyoruz. En kısa zaman da hazır olur.')}><Ionicons name="md-chatboxes" size={23} style={{color:  '#ff5864'}} />
                    </TouchableOpacity>
                      
                  </View> 
                   <View style={{flex:0.8/5,justifyContent:'center'}}>
                  <TouchableOpacity onPress={this._handlePress }><Ionicons name="logo-instagram" size={23} style={{color:  '#ff5864'}} />
                    </TouchableOpacity>
                      
                  </View> 
                </View>




                :
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginTop:10}}>

                <View style={{flex:3/5,justifyContent:'center'}}>
                  <Text style={styles.name}>{this.state.isimi} , {this.state.age_now} </Text>

                </View>
                    <View style={{flex:0.5/5,justifyContent:'center'}}>
                      <TouchableOpacity onPress={this.begeniistek}>
                        {this.state.begendi? <Ionicons name="md-heart" size={23} style={{color:  '#ff5864'}} />  :
                          <Ionicons name="md-heart-empty" size={23} style={{color:  '#ff5864'}} />
                        }
                        </TouchableOpacity>

                    </View>

                  <View style={{flex:1.5/5,justifyContent:'center'}}>
                  {this.state.begendi? <Text>Beğeni isteği gönderildi.</Text>  :
                     <Text>Gizli Hesap iletişime geçmek için beğenebilirsiniz.</Text>
                    }
                      
                  </View> 
                </View>


               }
               </View>

               
              
              



               
               }
          
         
          <Text style={styles.bio}>{this.state.bio}</Text>

          </View>
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
  },
  container:{
   
  },
  box: {
   
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: .2,
    width:width,
    height:350,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2,
    
  },
  profileImage:{
    width:300,
    height:300,
    marginBottom:20,
    flex: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
  name:{
    fontSize:26,
   
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'black',
  },
   bio:{
    fontSize:20,
    marginTop:5,
    marginLeft: 8,
    color: 'black',
    marginBottom:10,
  },
  buttonContainer:{
    flexDirection:'row',
    marginTop:20,
  },

  button: {
    width:60,
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderRadius:30,
    margin:10,
    shadowColor: 'black',
    shadowOpacity: .8,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  buttonMessage: {
    backgroundColor: "#00BFFF",
  },
  buttonLike: {
    backgroundColor: "#228B22",
  },
  buttonLove: {
    backgroundColor: "#FF1493",
  },
  buttonCall: {
    backgroundColor: "#40E0D0",
  },
  icon: {
    width:35,
    height:35,
  }
}); 

export default Detay;




