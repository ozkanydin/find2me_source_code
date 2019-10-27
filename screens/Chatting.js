import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import {Actions} from 'react-native-router-flux';
console.disableYellowBox = true;
import PropTypes from 'prop-types';
const {width,height} = Dimensions.get('window');
import { Constants, Location, Permissions,Notifications } from 'expo';
//import Image from 'react-native-scalable-image';
import { Ionicons } from '@expo/vector-icons';
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
     only : '',
      k:'',
      token:'',
      title: '',
      body : '',
      foto: '',
      messages: [],
      sayac: 0,
    };
    this.send = this.send.bind(this);
    
    this.renderItem   = this._renderItem.bind(this);
  }



  componentWillMount(){
    AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) );
  AsyncStorage.getItem('k').then( value => this.setState({k: value}) );


  firebase.database().ref('/uye_detay/'+this.props.kadi+"/mesajlar/"+this.props.kadimm+"online/online").set({
                  online: "1",
                  
                  
                 });

firebase.database().ref('/uye_detay/'+this.props.kadimm+"/mesajlar/"+this.props.kadi+"online").orderByChild('online').on('value', (snap) => {
      let user = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {online} = konum.val();
        this.setState({only : online });
 
      

        
  
               
   


    
   
      })


})
 

     firebase.database().ref('/uye_detay/').orderByChild('kadi').once('value', (snap) => {
      let user = [];
      let say = 0;
      snap.forEach((konum) => {
        
        const {kadi,token,foto} = konum.val();
        if(kadi == this.props.kadi){
          user.push({kadi});
          this.setState({token : token});
          this.setState({foto : foto});




        }
 
      

        
  
               
   


    
   
      })


})


     firebase.database().ref('/mesajlar/').once('value', (snap) => {
     
      let user = [];
      let say = 0;
      let sayic = 0;
      snap.forEach((konum) => {

        


        
            
        
        const {idd,imagee,sentt,msgg,tokenn,gidenn} = konum.val();

        if( (sentt == this.props.kadimm && gidenn == this.props.kadi ) || (sentt == this.props.kadi && gidenn == this.props.kadimm )  ){
            say = say + 1;
           var messages = this.state.messages;
           
      messages.push({
        id:idd,
        sent: sentt,
        msg: msgg,
        image:imagee,
        token : tokenn,
        giden : gidenn,
      });
      this.setState({messages:messages});
      this.setState({sayac : this.state.messages.length });

        }


       
          
         




        
 
      

        
  
               
   


    
   
      })


})

     



     

    
     
  }

 componentWillUnmount() {
   firebase.database().ref('/uye_detay/'+this.props.kadi+"/mesajlar/"+this.props.kadimm+"online/online").set({
                  online: "0",
                  
                  
                 });
   
  }

  

  send() {
    if (this.state.msg.length > 0) {
firebase.database().ref('/uye_detay/').orderByChild('kadi').once('value', (snap) => {
      let user = [];
      let say = 0;
      let rast = Math.floor((Math.random() * 99999999999999999) + 1);
      snap.forEach((konum) => {
        
        const {foto,kadi} = konum.val();
        if(kadi == this.props.kadimm){
          firebase.database().ref('/mesajlar/').push({
                  idd: rast,
                  imagee: foto,
                  sentt: kadi,
                  gidenn : this.props.kadi,
                  msgg : this.state.msg,
                  tokenn : this.state.token,
                  
                 });
          firebase.database().ref('/mesajlar/').orderByChild('idd').equalTo(rast).once('value', (snap) => {
     
      let user = [];
      let say = 0;
      let sayic = 0;
      snap.forEach((konum) => {

        


        
            
        
        const {idd,imagee,sentt,msgg,tokenn,gidenn} = konum.val();

        if( (sentt == this.props.kadimm && gidenn == this.props.kadi ) || (sentt == this.props.kadi && gidenn == this.props.kadimm )  ){

           var messages = this.state.messages;
           
      messages.push({
        id:idd,
        sent: sentt,
        msg: msgg,
        image:imagee,
        token : tokenn,
        giden : gidenn,
      });
      this.setState({messages:messages});
 this.setState({msg:'',});
        }
       
          
         




        
 
      

        
  
               
   


    
   
      })


})
         
      firebase.database().ref('/uye_detay/'+this.props.kadi+"/sohbet/"+this.props.kadimm).set({
                  kadik : this.props.kadimm,
                  
                 });
       firebase.database().ref('/uye_detay/'+this.props.kadimm+"/sohbet/"+this.props.kadi).set({
                  kadik : this.props.kadi,
                  
                 });
        if(this.state.only != "1"){

                
                this.setState({title: this.props.kadimm});
                this.setState({body: this.state.msg});
                this.sendPushNotification();

        }
     

        }
        
        
 
      

        
  
               
   


    
   
      })


})

      

    }
  }

  

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body, foto = this.state.foto) {
    this.subscription = Notifications.addListener(this.handleNotification);
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: this.state.token,
        title: this.state.title,
        body: this.state.body,
        ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'max', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    },
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


  _renderItem = ({item}) => {

    if (item.sent !== this.props.kadimm) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{ uri: item.image}} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.rightMsg} >
          <View style={styles.rightBlock} >
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
         
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
      <View style={{width:width,height:80,backgroundColor:'white'}}>
        <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute',
left:     10,
top:      40,}}>
          <Ionicons name="md-arrow-back" size={25} style={{color:  '#ff5864'}} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight : 'bold', position: 'absolute',
left:     55,
top:      40,}}> {this.props.kadi}</Text>
      </View>
          <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
          <ScrollView ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: false});
    }}>
            <FlatList 
              style={styles.list}
              extraData={this.state}
              data={this.state.messages}
              keyExtractor = {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}/>
              </ScrollView>
            <View style={styles.input}>
              <TextInput
                style={{flex: 1 }}
                value={this.state.msg}
                placeholderTextColor = "#696969"
                onChangeText={msg => this.setState({ msg })}
                
                onSubmitEditing={() => this.send()}
                placeholder="Bir mesaj yaz"
                returnKeyType="send"/>
            </View>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius:10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: 'gray',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});  