import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


function VolunteerScreen() {
    return (
        <MapView
            style={{flex:1}}
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
  />
    )
}

const styles = StyleSheet.create({
    VolunteerScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
  });
  

export default VolunteerScreen;