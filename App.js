import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RequestHelpBtn from './components/RequestScreen';
import HomeScreen from './components/HomeScreen';
import VolunteerScreen from './components/VolunteerScreen'
import DetailedRequestScreen from './components/DetailedRequestScreen'
import { UserContext } from "./UserContext";
import RegisterScreen from './components/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const user = useContext(UserContext);

  function SignInButton({ navigation, user }) {
    //TODO: implement sign in button
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" 
            component={HomeScreen} 
            options={({navigation}) => ({
              title: "Home",
              headerRight: () => {
                <SignInButton navigation={navigation} user={user} />
              }
            })}
          />
          <Stack.Screen name="Request" component={RequestHelpBtn} />
          <Stack.Screen name="Volunteer" component={VolunteerScreen} />
          <Stack.Screen name="RequestScreen" component={DetailedRequestScreen} />
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
