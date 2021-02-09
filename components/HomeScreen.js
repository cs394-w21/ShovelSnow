import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import UserContext from '../UserContext';
import {firebase} from '../firebase';


function HomeScreen( { navigation }) {
  const user = useContext(UserContext);

  if(!user) {
    return (
      <View style={styles.HomeScreen}>
        <Text style={styles.Welcome}>Hi, {'\n'}welcome to ShovelSnow!</Text>
        <Image style={styles.Img} source={require('../assets/snowy.png')} resizeMode="contain"/>
        <View style={styles.btnCont}>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.HomeScreen}>
      <Text style={styles.Welcome}>Hi, {'\n'}welcome to ShovelSnow!</Text>
      <Image style={styles.Img} source={require('../assets/snowy.png')} resizeMode="contain"/>
      <View style={styles.btnCont}>
          <Button style={styles.Btn} title="request help" onPress={ () => navigation.navigate('Request') } />
          <Button style={styles.Btn} title="help a neighbor" onPress={ () => navigation.navigate('Volunteer') } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    flexWrap: 'wrap'
  },
  Welcome: {
    padding: 10,
    width: 250,
    fontSize: 37.5,
    fontWeight: 'bold',
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  Btn: {
    borderRadius: 20,
  },
  Img: {
    flex: 1.2,
  }
});


export default HomeScreen;
