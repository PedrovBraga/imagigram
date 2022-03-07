import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from './components/auth/redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducers, applyMiddleware(thunk));

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main';
import Add from './components/Main/Add';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDThWPpum5lda7TLIQk5PAB6b7EE3ufXPg",
  authDomain: "authentication2-3f69b.firebaseapp.com",
  projectId: "authentication2-3f69b",
  storageBucket: "authentication2-3f69b.appspot.com",
  messagingSenderId: "405561558305",
  appId: "1:405561558305:web:092c79292c637cdd1d2a60"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {
      if(!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });

  }, []);

  const Loading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Carregando...</Text>
    </View>
  );

  const LoggedOut = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }}/>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const LoggedIn = () => (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name='Landing' component={Landing}/>
          <Stack.Screen name='Main' component={Main} options={{ headerShown: false }}/>
          <Stack.Screen name='Add' component={Add}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );


  if(isLoading){
    return (<Loading/>);
  }
  if(isLoggedIn){
    return (<LoggedIn />);
  }
  return (<LoggedOut />);

};

export default App;
