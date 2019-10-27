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

  constructor(props) {
    super(props);
    this.state = {
       isLogin: '',
     i:'',
     kadix:'',
     s:'',
      kadii : '',
      userz:[],
    };
  }

  

componentWillMount(){
  AsyncStorage.getItem('k').then( value => this.setState({kadix: value}) );


  firebase.database().ref("uye_detay/").orderByChild('kadi').once('value', (snap) => {
      
      snap.forEach((konum) => {
const {kadi} = konum.val();

    if(kadi == this.state.kadix){
      firebase.database().ref("uye_detay/"+kadi+"/sohbet").orderByChild('kadik').once('value', (snap) => {
      let userx = [];
      snap.forEach((konum) => {
        
        const {kadik} = konum.val();

       
 
      

          userx.push({kadik});

          firebase.database().ref("uye_detay/").orderByChild('kadi').once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {

        
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik,token} = konum.val();
        if(kadi == kadik){
          user.push({bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik,token});
        }


        

       
 
      
       

        
  
               
   
    


    
   
      })

 this.setState({userz: user.reverse() });

})
        
       

        
  
               
   
    


    
   
      })

 

})
    }

  })
    })

}


  

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
        <FlatList 
          extraData={this.state}
          data={this.state.userz}
          
          renderItem={({item}) => 
       <ScrollView>
      <TouchableOpacity onPress={() => Actions.chatting({kadi : item.kadi,kadimm : this.state.kadix}) }>
        <View style={styles.row}>
          <Image source={{ uri: item.foto }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.kadi}</Text>
              <Ionicons name="md-arrow-dropright-circle" size={25} style={{color:  '#ff5864'}} />
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
         </ScrollView>

            }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
}); 