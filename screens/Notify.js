import React, { Component } from 'react';
import { StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,} from 'react-native';
import { Constants , Permissions,Notifications} from 'expo';
import InstagramLogin from './Instagram';

export default class App extends Component {
 constructor(props) {
    super(props);
    this.state = {
      token: null,
      
    };
  }

  

  render() {
    return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: 'orange',
            height: 30, width: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => this.instagramLogin.show()}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
        </TouchableOpacity>
        <Text style={{ margin: 10 }}>Token: {this.state.token}</Text>
        {this.state.failure && <View>
          <Text style={{ margin: 10 }}>failure: {JSON.stringify(this.state.failure)}</Text>
        </View>}
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          clientId="f4df819204fb4464b2659ba1b3da5489"
          redirectUrl="http://www.instagram.com"
          scopes={['basic']}
          onLoginSuccess={token => this.setState({ token })}
          onLoginFailure={data => this.setState({ failure: data })}
        />
      </View>
    );
  }
}

