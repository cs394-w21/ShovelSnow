import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RequestHelpBtn from './components/RequestScreen';
import HomeScreen from './components/HomeScreen';
import VolunteerScreen from './components/VolunteerScreen'
import DetailedRequestScreen from './components/DetailedRequestScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Request" component={RequestHelpBtn} />
        <Stack.Screen name="Volunteer" component={VolunteerScreen} />
        <Stack.Screen name="RequestScreen" component={DetailedRequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
