import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RequestHelpBtn from './components/RequestScreen';
import HomeScreen from './components/HomeScreen';
import VolunteerScreen from './components/VolunteerScreen'
import UserContext  from "./UserContext";
import RegisterScreen from './components/RegisterScreen';
import {firebase} from './firebase';
import { auth } from 'firebase';

const Stack = createStackNavigator();

function SignInButton({ navigation, user }) {
  return !user || !user.uid
  ? <Button title="Sign in"
    onPress={() => navigation.navigate('RegisterScreen')}
  />
  : <Button title="Log out"
    onPress={() => firebase.auth().signOut()}
  />
}

export default function App() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth, user) => {
      console.log(auth);
      setAuth(auth);
    });
  }, []);

  useEffect(() => {
    if (auth && auth.uid) {
      const db = firebase.database().ref('users').child(auth.uid);
      const handleData = snap => {
        setUser({
          uid: auth.uid, ...snap.val(),
          name: auth.displayName
        });
      }
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
    } else {
      setUser(null);
    }
  }, [auth]);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              title: "Home",
              headerRight: () => (
                <SignInButton navigation={navigation} user={user} />
              )
            })}
          />
          <Stack.Screen name="Request" component={RequestHelpBtn} />
          <Stack.Screen name="Volunteer" component={VolunteerScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

/*
      <View style={styles.container}>
        <RequestHelpBtn />
      </View>
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
