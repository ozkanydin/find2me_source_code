/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,BackHandler,Dimensions,AsyncStorage,RefreshControl,Switch,StyleSheet,Image,TouchableHighlight, Text,TextInput, View,ScrollView,Button,TouchableOpacity, FlatList,ImageBackground} from 'react-native';
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
class Profil extends Component {

constructor(props) {
    super(props);
    this.state = {
      isLogin: '',
     i:'',
     k:'',
     s:'',
     biox: '',
     fotox: '',
     
      userz:[],
      gizlilik: '',
      aciklama : '',
 durum: null,
 a: "a",
 kadimm:'',
 begeniisteksayi:'',
 begendiklerinsayi:'',
 begenisayi:'',
 profilgidenfoto : '',
 profilgidenbio : '',

 
      





    }
  }



 
  componentWillMount(){


   


    AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) );
    AsyncStorage.getItem('k').then( value => this.setState({kadimm: value}) );
     AsyncStorage.getItem('i').then( value => this.setState({i: value}) );

    

     


firebase.database().ref("uye_detay").once('value', (snap) => {
      
      snap.forEach((konum) => {
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik} = konum.val();
        
        if(kadi == this.state.kadimm){
        firebase.database().ref("uye_detay").orderByChild('kadi').equalTo(this.state.kadimm).on('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik} = konum.val();

        if(gizlilik == "acik"){
                  this.setState({gizlilik : "Herkese Açık Hesap" });
                  this.setState({durum : true });
                  this.setState({aciklama : 'Hesabın açıkken, kullanıcılar seninle iletişime geçebilir.' });
        }
        if(gizlilik == "gizli"){
           firebase.database().ref("uye_detay/"+this.state.kadimm+"/begeniistek").orderByChild('kadiii').on('value', (snap) => {
      let usera = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadiii,onay} = konum.val();

       if(onay == 0){
        say = say + 1;
       }
      
 
       usera.push({kadiii,onay});

        
  
       this.setState({begeniisteksayi: say });
    
   
      })



})
                    this.setState({gizlilik : "Gizli Hesap" });
                    this.setState({durum : false });
                    this.setState({aciklama : 'Hesabın gizliyken, sadece karşılıklı beğenileştiğin kullanıcılar seninle iletişime geçebilir.' });
        }
       
 
       user.push({bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik});
        this.setState({biox : bio });
        this.setState({fotox : foto });

        
          firebase.database().ref("uye_detay/"+this.state.kadimm+"/begeni").orderByChild('kadiii').on('value', (snap) => {
        
      let usera = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadiii,onay} = konum.val();

       
        say = say + 1;
       
      
 
       usera.push({kadiii,onay});

        
  
       this.setState({begenisayi: say });
    
   
      })



})

            firebase.database().ref("uye_detay/"+this.state.kadimm+"/begendiklerin").orderByChild('kadiii').on('value', (snap) => {
      let usera = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadiii,onay} = konum.val();

       
        say = say + 1;
       
      
 
       usera.push({kadiii,onay});

        
  
       this.setState({begendiklerinsayi: say });
    
   
      })



})
  
             


    
   
      })

 this.setState({userz: user.reverse() });

})

   }
         })


})

       
      

        
  
               
   
    


    
   

 

  }
  onPress = () => {
   this.setState({a : "b" });
  }


ac = () => {
  
    this.setState({durum : true });
    this.setState({gizlilik :"Herkese Açık Hesap"});
    this.setState({aciklama: 'Hesabın açıkken, kullanıcılar seninle iletişime geçebilir.'});
    firebase.database().ref('uye_detay/'+this.state.kadimm).update({
                 gizlilik: "acik",
                 });
    this.setState({a: "b"});

 


}

 gizle = () => {
  this.setState({durum : false });
    this.setState({gizlilik : "Gizli Hesap"});
    this.setState({aciklama: 'Hesabın gizliyken, sadece onayladığın kullanıcılar seninle iletişime geçebilir.' });
     firebase.database().ref('uye_detay/'+this.state.kadimm).update({
                 gizlilik: "gizli",
                 });
    this.setState({a: "b"});
  }
  
  clearAsyncStorage = async() => {
    AsyncStorage.clear();
    Actions.giris();
}





  render() {

   
    
    
    return (
  
  <View style={{flex:1,alignSelf:'center',justifyContent:'center'}} >

  <View style={{width:width,height:80,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
      <View style={{position:'absolute',top:38,bottom:2}}>
       <Imagex
        height={27}     
        // height will be calculated automatically
       source={require('./logo.png')}
   />

       </View>

  </View>
       
       <FlatList

      data={this.state.userz}
      extraData = {this.state}
      renderItem={({item}) => 
       <View style={{flex:1,}}>
      <View style={{ flexDirection: 'row',marginLeft:10,marginTop:10,}}>
          <View style={{width: width/3}}>

          
           <Image
      style={{
    flex: 1,
    alignSelf: 'stretch',
    width: 100,
    height: 100,borderRadius: 100,borderWidth: 2,borderColor: 'white'
  }}
       source={{ uri: item.foto }}
   />
           
   

          </View>
           <View style={{width: width*2/3,alignSelf:'center',}}>


             {this.state.durum? <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginTop:10}}>

              

              <View style={{flex:1/2,justifyContent:'center'}}>
              <TouchableOpacity onPress={() => Actions.profilbegenen({kadi: this.state.kadimm})}>
                  <Text style={{fontSize:15,alignSelf:'center'}} >{this.state.begenisayi}</Text>
                  <Text style={{fontSize:15,}} > Beğenen</Text>
                </TouchableOpacity>

              </View>

              <View style={{flex:1/2,justifyContent:'center'}}>
              <TouchableOpacity onPress={() => Actions.profilbegenilen({kadi: this.state.kadimm})}>
              <Text style={{fontSize:15,alignSelf:'center'}} >{this.state.begendiklerinsayi}</Text>
                  <Text style={{fontSize:15,}} > Beğenilen</Text>
                </TouchableOpacity>
              </View>



              </View>  : <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginTop:10}}>

              <View style={{flex:1/3.5,justifyContent:'center'}}>
              <TouchableOpacity onPress={() => Actions.profilbegeniistek({kadi: this.state.kadimm})}>
              <Text style={{fontSize:13,alignSelf:'center'}} >{this.state.begeniisteksayi}</Text>
                  <Text style={{fontSize:13,}} >Beğeni</Text><Text style={{fontSize:13,}} >İstekleri</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex:1/3.5,justifyContent:'center'}}>
              <TouchableOpacity onPress={() => Actions.profilbegenen({ kadi: this.state.kadimm })}>
              <Text style={{fontSize:13,alignSelf:'center'}} >{this.state.begenisayi}</Text>
                  <Text style={{fontSize:13,}} > Beğenen</Text>
                </TouchableOpacity>

              </View>

              <View style={{flex:1/3.5,justifyContent:'center'}}>
              <TouchableOpacity onPress={() => Actions.profilbegenilen({kadi: this.state.kadimm})}>
              <Text style={{fontSize:13,alignSelf:'center'}} >{this.state.begendiklerinsayi}</Text>
                  <Text style={{fontSize:13,}} > Beğenilen</Text>
                </TouchableOpacity>
              </View>



              </View> 
               
                
              }
             

           
           </View>
         
          


     
    
   
            
            </View>

            <View style={{flex:1 }}>
              <View style={{marginLeft:12,marginTop:5,}} >
              <Text style={{fontWeight: 'bold',}} >{this.state.i}</Text>
              <Text >{item.bio}</Text>

              </View>
              <View style={{marginTop:20,justifyContent:'center',marginLeft:10,marginRight:10}}>
             
              <TouchableOpacity onPress={() => Actions.duzenle({bio:this.state.biox , foto:this.state.fotox}) }  style={{backgroundColor:'#F1F0F0',borderRadius:5,borderWidth:0.4,borderColor:'black'}}>
                <Text style={{marginTop:3,marginBottom:3,color:'black',alignSelf:'center'}}>Profili Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.clearAsyncStorage} style={{backgroundColor:'#F1F0F0',marginTop:5,borderRadius:5,borderWidth:0.4,borderColor:'black'}}>
                <Text style={{marginTop:3,marginBottom:3,color:'black',alignSelf:'center'}}>Çıkış Yap</Text>
              </TouchableOpacity>
              </View>
<View style={{marginLeft:25,marginRight:25,marginTop:15,borderWidth:0.4,borderColor:'black',}}>
              </View>
              <View style={{marginTop: 8,alignSelf:'center'}}>

              <Text style={{alignSelf:'center',fontWeight:'bold'}}> {this.state.gizlilik}   </Text>
              {this.state.durum?<TouchableOpacity onPress={this.gizle} ><Text style={{alignSelf:'center',color:'blue'}}> Hesabı Gizle </Text></TouchableOpacity>:<TouchableOpacity  onPress={this.ac}><Text style={{alignSelf:'center',color:'blue'}}> Hesabı Aç </Text></TouchableOpacity>}
        <Text style={{alignSelf:'center',margin:5,fontSize:11}}>{this.state.aciklama}</Text>
              </View>

              

              <View>
              
              
              


              </View>

            </View>

            </View>


      
        
      
      
      


      }



      />
      

            
         

            

      </View>
  
   



      );
  }
}









export default Profil;




