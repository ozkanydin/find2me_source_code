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
export default class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      kadii : '',
      userz:[],
    };
  }

componentWillMount(){
  this.setState({kadii : this.props.kadi });

        firebase.database().ref("uye_detay").on('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik} = konum.val();
if(kadi == this.props.kadi){
       
       
 
      
        firebase.database().ref("uye_detay/"+this.props.kadi+"/begeni").orderByChild("kadiii").on('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {kadiii,onay} = konum.val();

          




        firebase.database().ref("uye_detay").orderByChild('kadi').equalTo(kadiii).on('value', (snap) => {
      let usera = [];
      snap.forEach((konum) => {
        
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik,token} = konum.val();

       
      
 
       usera.push({bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik,token});

        
  
               
   

 user.push({bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik,token});
    
   
      })

 this.setState({userz: usera.reverse() });

})
          




         
    
   
      })
     

 this.setState({usery: user });

})


        
  
               
   }


    
   
      })

 this.setState({userx: user.reverse() });

})


}
  

  render() {
    return(
      <View style={{ flex: 1 }} >
      <View style={{width:width,height:80,backgroundColor:'white',borderBottomWidth:0.5,borderColor:'black'}}>
        <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute',
left:     10,
top:      40,}}>
          <Ionicons name="md-arrow-back" size={25} style={{color:  '#ff5864'}} />
        </TouchableOpacity>
      </View>
        <FlatList 
          extraData={this.state}
          data={this.state.usery}
          
          renderItem={({item}) => 
       <ScrollView>
      <TouchableOpacity onPress={() => Actions.detaybegenen({kadi : item.kadi,kadimm : this.state.kadii}) }>
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