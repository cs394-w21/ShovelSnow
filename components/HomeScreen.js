import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen( { navigation }) {
  return (
    <View style={styles.HomeScreen}>
      <Text>Hello Home</Text>
      <Button title="go to request page" onPress={ () => navigation.navigate('Request') } />
      <Button title="go to volunteer page" onPress={ () => navigation.navigate('Volunteer') } />
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});


export default HomeScreen;