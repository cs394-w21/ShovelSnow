import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen( { navigation }) {
  return (
    <View>
      <Text>Hello Home</Text>
      <Button title="go to request" onPress={ () => navigation.navigate('Request') } />
    </View>
  );
}


export default HomeScreen;