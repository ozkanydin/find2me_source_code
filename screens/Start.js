
import React, {Component} from 'react';
import {Platform,BackHandler,Dimensions,AsyncStorage,RefreshControl,StyleSheet,Image, Text,TextInput, View,ScrollView,Button,TouchableOpacity, FlatList,ImageBackground} from 'react-native';
import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import {Actions} from 'react-native-router-flux';
console.disableYellowBox = true;
import PropTypes from 'prop-types';
const {width,height} = Dimensions.get('window');
import { Constants, Location, Permissions } from 'expo';
import { robotoWeights,sanFranciscoWeights } from 'react-native-typography';
import { Ionicons } from '@expo/vector-icons';
import Giris from './Giris';
import RNExitApp from 'react-native-exit-app';
import Imagex from 'react-native-scalable-image';


export default class Start extends Component {
	
	 constructor(props) {
    super(props);
    this.state = {
      isLogin: '',
      yet:'',
       i:'',
     k:'',
     s:'',
     refreshing: false,
     latitude: null,
     longitude: null,
      lon1: null,
      d: 0,
      userx:[],
      lat: null,
      lon: null,
      me:0,
      userz:[],
      uye_isim: '',
      date:'',
      foto:'',
      bio : '',
      age_now:'',
      yol : '',
      cinsiyet:'',
      tercih : '',
      te : '',
      referans:null,
      refxx:'',
      gizz : '',
      tokenn : '',
    }
  }
  

  componentDidMount(){
    AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) );
   
  }
  
  session(status: string) {
    AsyncStorage.setItem('isLogin', status);
    AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) )
    alert('session')
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

  
 
   


  _onRefresh = () => {
    
    this.setState({refreshing: true});

     navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
         const longitude = JSON.stringify(position.coords.longitude);

        this.setState({ latitude: latitude });
        this.setState({ longitude: longitude });
       
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000}
    );
     var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var gun = date+"-"+month+"-"+year;

if(this.state.latitude == null){
  alert('Konumunuzu açmayı unutmayın! ')
}

firebase.database().ref("konum/"+gun).orderByChild('kadii').once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {kadii,gunn,latitudee,longitudee,mesafe} = konum.val();

       if(gunn == gun && kadii == this.state.k){

          lat1 = latitudee;
    lat2 = this.state.latitude;
    lon1 = longitudee;
    lon2 = this.state.longitude;
    
     var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1) * (Math.PI/180) ;  // deg2rad below
  var dLon = (lon2-lon1) * (Math.PI/180) ; 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180) ) * Math.cos(lat2 * (Math.PI/180) ) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km


    
    

    var son_mesafe = d + parseFloat(mesafe,10) ;

this.setState({d: son_mesafe});



       }

        
  
               
   
    


    
   
      })



})
 var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var gun = date+"-"+month+"-"+year;

 firebase.database().ref("konum/"+gun).orderByChild('kadii').equalTo(this.state.k).once('value', (snap) => {
      let userx = [];
      snap.forEach((konum) => {
        
        const {kadii,gunn,latitudee,longitudee,mesafe,tercih} = konum.val();

       userx.push({kadii,gunn,latitudee,longitudee,mesafe,tercih});
        this.setState({lat: latitudee});
        this.setState({lon: longitudee});
        this.setState({me: mesafe});   
        this.setState({te : tercih}); 
  

        
        firebase.database().ref("konum/"+gun).orderByChild('kadii').once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,date,foto,yas,isimm,kadii,gunn,latitudee,longitudee,mesafe,cinsiyet,token} = konum.val();

       
 
      

        lat1 = this.state.lat;
    lat2 = latitudee
    lon1 = this.state.lon;
    lon2 = longitudee;
    me1 = mesafe;
    me2 = this.state.me;

    
      
    
     var R = 6371; // Radius of the earth in km
    
  var dLat = (lat2-lat1) * (Math.PI/180) ;  // deg2rad below
  var dLon = (lon2-lon1) * (Math.PI/180) ; 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180) ) * Math.cos(lat2 * (Math.PI/180) ) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

       
        var top = parseFloat(me1,10) + parseFloat(me2,10) + 0.2;
        if(d <= top && kadii != this.state.k && this.state.te == cinsiyet ){

          user.push({bio,date,foto,yas,isimm,kadii,gunn,latitudee,longitudee,mesafe,token});
        }
       

        
  
               
   
    


    
   
      })

 this.setState({userz: user.reverse() });

})
      

        
  
               
   
    


    
   
      })

this.setState({usery: userx.reverse() });
})

   


firebase.database().ref("uye").orderByChild("kadii").equalTo(this.state.k).once('value', (snap) => {
      let user = [];
      snap.forEach((uye) => {

        const {isimm,kadii,sifree} = uye.val();
        
        user.push({isimm,kadii,sifree});
        this.setState({uye_isim : isimm});
       
         

      })

      
    })

     firebase.database().ref("uye_detay").orderByChild("kadi").equalTo(this.state.k).once('value', (snap) => {
      let user = [];
      snap.forEach((uye) => {

        const {bio,cinsiyet,date,foto,kadi,sehir,tel,tercih,gizlilik,token} = uye.val();
        
        user.push({bio,cinsiyet,date,foto,kadi,sehir,tel,tercih});
        this.setState({date : date});
        this.setState({foto : foto});
        this.setState({bio : bio});
        this.setState({cinsiyet : cinsiyet});
        this.setState({tercih : tercih});
        this.setState({gizz : gizlilik});
        this.setState({tokenn : token});
        
           var today = new Date();
    var birthDate = new Date(date);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    this.setState({age_now : age_now});
         

      })

      
    })



 firebase.database().ref("konum/").orderByChild("kadii").once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {kadii,gunn,latitudee,longitudee,mesafe} = konum.val();

        if(this.state.latitude != null){

        if(gunn == gun && kadii == this.state.k){

      

   
    
  firebase.database().ref('/konum/'+gun+"/"+this.state.k).update({
                  kadii: this.state.k,
                  latitudee :this.state.latitude,
                  longitudee: this.state.longitude,
                  gunn : gun,
                  mesafe : this.state.d,
                  isimm : this.state.uye_isim,
                  foto : this.state.foto,
                  bio : this.state.bio,
                  date : this.state.date,
                  yas : this.state.age_now,
                  cinsiyet : this.state.cinsiyet,
                  tercih : this.state.tercih,
                  gizlilik: this.state.gizz,
                  token : this.state.tokenn,
                 });


        }else{
             

           firebase.database().ref('/konum/'+gun+"/"+this.state.k).set({
                  kadii: this.state.k,
                  latitudee :this.state.latitude,
                  longitudee: this.state.longitude,
                  gunn : gun,
                  mesafe : this.state.d,
                  isimm : this.state.uye_isim,
                  foto : this.state.foto,
                  bio : this.state.bio,
                  date : this.state.date,
                  yas : this.state.age_now,
                  cinsiyet : this.state.cinsiyet,
                  tercih : this.state.tercih,
                  gizlilik : this.state.gizz,
                  token : this.state.tokenn,


                 });


        }
      }
               
   
    


    
   
      })



})

  

      .then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount(){
    if(this.state.latitude == null && this.state.isLogin == true){
      alert('Konumunuzu açmayı unutmayın!');
     }
  }

  componentWillMount(){


   



    AsyncStorage.getItem('isLogin').then( value => this.setState({isLogin: value}) );
    AsyncStorage.getItem('k').then( value => this.setState({k: value}) );

    

      firebase.database().ref("uye_detay").once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik} = konum.val();
if(kadi == this.state.k){
  
        if(ref == "bos"){
                  this.setState({referans : true });
                 
        }else{
          this.setState({referans: false});
        }
        
       
 
       user.push({bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik});

        
  
               
   }


    
   
      })


})
    


     navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
         const longitude = JSON.stringify(position.coords.longitude);

        this.setState({ latitude: latitude });
        this.setState({ longitude: longitude });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000}
    );
     

       var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year
var gun = date+"-"+month+"-"+year;

 firebase.database().ref("konum/"+gun).orderByChild('kadii').equalTo(this.state.k).once('value', (snap) => {
      let userx = [];
      snap.forEach((konum) => {
        
        const {kadii,gunn,latitudee,longitudee,mesafe} = konum.val();

       userx.push({kadii,gunn,latitudee,longitudee,mesafe});
        this.setState({lat: latitudee});
        this.setState({lon: longitudee});
        this.setState({me: mesafe});    
  

        
        firebase.database().ref("konum/"+gun).orderByChild('kadii').once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,date,foto,yas,isimm,kadii,gunn,latitudee,longitudee,mesafe} = konum.val();

       
 
      

        lat1 = this.state.lat;
    lat2 = latitudee
    lon1 = this.state.lon;
    lon2 = longitudee;
    me1 = mesafe;
    me2 = this.state.me;

    
      
    
     var R = 6371; // Radius of the earth in km
    
  var dLat = (lat2-lat1) * (Math.PI/180) ;  // deg2rad below
  var dLon = (lon2-lon1) * (Math.PI/180) ; 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180) ) * Math.cos(lat2 * (Math.PI/180) ) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

       
        var top = parseFloat(me1,10) + parseFloat(me2,10);
        if(d <= top && kadii != this.state.k ){
         
          user.push({bio,date,yas,foto,isimm,kadii,gunn,latitudee,longitudee,mesafe});
        }
       

        
  
               
   
    


    
   
      })

 this.setState({userz: user.reverse() });

})
      

        
  
               
   
    


    
   
      })

this.setState({usery: userx.reverse() });
})

 

  }


  
  reff = () =>{
    let sayff = null;
     firebase.database().ref("uye_detay").once('value', (snap) => {
      let user = [];
      snap.forEach((konum) => {
        
        const {bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik} = konum.val();
        
        if(kadi == this.state.refxx && kadi !== this.state.k ){
           firebase.database().ref('uye_detay/'+this.state.k).update({
                 ref: this.state.refxx,
                 });
            sayff =  1;
         }else{
          sayff = 0;
         }
         
         

 user.push({bio,cinsiyet,date,foto,kadi,ref,sehir,tel,tercih,gizlilik});
    
   
      })


})
    if(sayff == 0 ){
          alert('Girdiğiniz kullanıcı adına ait üye bulunamadı.');
         }
         this.setState({referans: false});
    

  }
  
  render() {
    if(this.state.isLogin == 'true') {
    	
      return (
         <View style={{flex:1}}>



  <View style={{width:width,height:80,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>

       <View style={{position:'absolute',top:38,bottom:2}}>
       <Imagex
        height={27}     
        // height will be calculated automatically
       source={require('./logo.png')}
   />

       </View>

  </View>

             {this.state.referans? 

              <View style={{flex:1,}}>  
                 <ImageBackground blurRadius={1}blurStyle='dark'     source={require('./c.jpg')} style={{  width: '100%', height: '100%', }}>
                 <View style={{margin:10,borderWidth:2,borderColor:'white'}}>
                 <Text style={{marginLeft:8,margin:5,fontSize:40,fontWeight: 'bold',color:'white'}}>Sınır Yok</Text>
                 <Text style={{marginLeft:8,margin:5,fontSize:40,fontWeight: 'bold',color:'white'}}>Ücret Yok</Text>
                 </View>
                 <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center'}}>
                      <Text style={{color:'white',alignSelf:'center',fontSize:15}}>Diğer uygulamalar gibi sınırları ücretle aşma, </Text>
                      <Text style={{color:'white',alignSelf:'center',fontWeight:'bold',fontSize:15}}>hemen bir arkadaşını üye yapıp, kullanıcı adını gir ve</Text>
                      <Text style={{color:'white',alignSelf:'center',fontSize:15}}>Ücretsiz premium üye ol.</Text>
                      <TextInput placeholder="Üyenin kullanıcı adı" placeholderTextColor="black"  style={{marginTop:15,}} value={this.state.refxx}
                onChangeText={ (text)=> this.setState({refxx: text}) } />
                <TouchableOpacity onPress={this.reff}>
                  <Text style={{fontWeight:'bold',color:'black',marginBottom:20,marginTop:5,}}>  Tamamla</Text>
                </TouchableOpacity>
                 </View>
           
          
          
          
    
       </ImageBackground>
              </View>  
              :
               
                
              
         
            <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
         >
        
 <Text style={{alignSelf:'center',fontSize:13,marginTop:10}}>Bugün görmüş olduğun kişiler listelenir.</Text>   
 <Text style={{alignSelf:'center',fontSize:13}}>Konumunuzu açmayı unutmayın</Text>      
<Text style={{alignSelf:'center',fontSize:13}}>Yeni kişileri görmek için kaydırın.</Text>


          <FlatList
      extraData = {this.state}
      data={this.state.userz}
      renderItem={({item}) => 
       
      <View style={styles.GridViewBlockStyle}>
 
   <View style={{alignItems:'center',justifyContent:'center'}}>
   <Imagex
      height={215}
       source={{ uri: item.foto }}
      
   />
   </View>
   <TouchableOpacity onPress={() => Actions.detay({item})}>

   <View  style={{marginTop:5,left:5,marginBottom:5, }}>
    
  <Text style={robotoWeights.medium}><Ionicons name="md-search" size={19} style={{color:'#ff5864',}} />  {item.isimm}, {item.yas}</Text>

    </View>
     </TouchableOpacity>
  


     
    
   
            
            </View>


      
      
      
      


      }


numColumns={2}
      />
      

            </ScrollView>
         

            }

      </View>
      );
    } else{
      Actions.giris()

    } if(this.state.isLogin != "true" && this.state.yet != 'ogrenci' || this.state.yet != 'admin') {
    	Actions.giris({k: "1"})
      return (
       <View style={{alignSelf:'center'}}>
        	
          
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0
 
},
 
GridViewBlockStyle: {
 
 
  flex:1,
  
  height: 250,
  width:width/2,
  margin: 10,
  backgroundColor: 'white',borderRadius: 10,borderWidth: 2,borderColor: 'white',

 
}
,
 
GridViewInsideTextItemStyle: {
 
   color: '#fff',
   padding: 10,
   fontSize: 18,
   justifyContent: 'center',
   
 },
});

