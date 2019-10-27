/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Router,Scene} from 'react-native-router-flux';
import { YellowBox,Text,View,StyleSheet,Image,AsyncStorage} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { Ionicons } from '@expo/vector-icons';









import Profil from './Profil';
import Giris from './Giris';
import Kayit from './Kayit';
import KayitDetay from './KayitDetay';
import Anasayfa from './Anasayfa';
import Detay from './Detay';
import Duzenle from './Duzenle';
import Chat from './Chat';
import Notify from './Notify';
import Profilbegeniistek from './Profilbegeniistek';
import Profilbegenen from './Profilbegenen';
import Profilbegenilen from './Profilbegenilen';
import Profilx from './Profilx';
import Detaybegeniistek from './Detaybegeniistek';
import Detaybegenen from './Detaybegenen';
import Detaybegenilen from './Detaybegenilen';
import Chatting from './Chatting';
import Start from './Start';
import Intro from './Intro';
import Instagram from './Instagram';
import Chatx from './Chatx';
import Profilbio from './Profilbio';
import ProfilFoto from './ProfilFoto';
import Fotosec from './Fotosec';


function TabIcon(props) {
  return (
  <View >
    <View >
      <Ionicons name="md-home" size={20} style={{color:'#ff5864'}} />
 
    </View>
  </View>
  )
}



function TabIconn(props) {
  return (
  <View >
    <View >
      <Ionicons name="md-contact" size={20} style={{color:	'#ff5864'}} />
 
    </View>
  </View>
  )
}

function TabIconnx(props) {
  return (
  <View >
    <View >
      <Ionicons name="md-chatboxes" size={20} style={{color:	'#ff5864'}} />
 
    </View>
  </View>
  )
}









const Index = () => {

	
    
	

	

	return(
		

		<Router   navigationBarStyle={{backgroundColor: 'white'}} titleStyle={{fontColor : "black",alignSelf:'center'}}  >
			<Scene key='root'>

				<Scene 
				
					key='tabbar'
					tabs
					tabBarStyle={{backgroundColor: 'white' }}
					hideNavBar
					
					

					
					


				>
				

				<Scene key='osu' title='AnaSayfa '  icon={TabIcon} >
				<Scene
				key='start'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Start}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				initial
				hideNavBar
      
				



				
				/>
				<Scene
				key='anasayfa'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Anasayfa}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				
				hideNavBar
      
				



				
				
				/>

				
				
				

				<Scene
				key='giris'			
                
				component={Giris}
				title=' Aga'
				titleStyle={{color: 'white',alignSelf:'center'}}
				
				hideNavBar
        hideTabBar={true}
				



				
				/>
				<Scene
				key='intro'			
                
				component={Intro}
				title=' Aga'
				titleStyle={{color: 'white',alignSelf:'center'}}
				
				hideNavBar
        hideTabBar={true}
				



				
				/>
				<Scene
				key='kayitdetay'			
                
				component={KayitDetay}
				title=' Aga'
				titleStyle={{color: 'white',alignSelf:'center'}}
				
				hideNavBar
        hideTabBar={true}
				



				
				/>
				<Scene
				key='fotosec'			
                
				component={Fotosec}
				title=' Aga'
				titleStyle={{color: 'white',alignSelf:'center'}}
				
				hideNavBar
        hideTabBar={true}
				



				
				/>
				<Scene
				key='kayit'			
                
				component={Kayit}
				title=' Aga'
				titleStyle={{color: 'white',alignSelf:'center'}}
				
				hideNavBar
        hideTabBar={true}
				



				
				/>

		<Scene
				key='detay'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Detay}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='notify'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Notify}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				
				
      
				



				
				/>
				<Scene
				key='instagram'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Instagram}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				
				
      
				



				
				/>
				<Scene
				key='chatting'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Chatting}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>


				
				 

				 

				 






				</Scene>

				<Scene key='xx' title='Mesajlar'  style={{ justifyContent: 'center', alignItems: 'center'  }} icon={TabIconnx}>

					<Scene
				key='chatx'
				component={Chatx}
				title= ''
				hideNavBar
				
				
				 
				/>
				<Scene
				key='chat'
				component={Chat}
				title= ''
				hideNavBar
				
				
				 
				/>
				<Scene
				key='chatting'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Chatting}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				
				
				




				</Scene>

				<Scene key='mu' title='Profil'  style={{ justifyContent: 'center', alignItems: 'center'  }} icon={TabIconn}>

				<Scene
				key='profil'
				component={Profil}
				title= ''
				hideNavBar
				
				
				 
				/>

				<Scene
				key='profilx'
				component={Profilx}
				title= ''
				hideNavBar
				
				
				 
				/>
				
				<Scene
				key='duzenle'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Duzenle}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				
				
      
				



				
				/>
				<Scene
				key='profilfoto'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={ProfilFoto}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				
				
      
				



				
				/>
				<Scene
				key='profilbio'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Profilbio}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				
				
      
				



				
				/>

				<Scene
				key='profilbegeniistek'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Profilbegeniistek}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='detaybegeniistek'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Detaybegeniistek}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='profilbegenen'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Profilbegenen}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='detaybegenen'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Detaybegenen}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='profilbegenilen'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Profilbegenilen}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='detaybegenilen'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Detaybegenilen}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>
				<Scene
				key='chatting'			
                navigationBarStyle={{backgroundColor: 'white'}}
				component={Chatting}
				title=''
				titleStyle={{color: 'black',alignSelf:'center'}}
				hideNavBar
				
      
				



				
				/>





				</Scene>


				

				







			</Scene>
			</Scene>

		</Router>




		);
}



export default Index;










