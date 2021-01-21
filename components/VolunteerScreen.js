import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {firebase} from '../firebase'



function VolunteerScreen() {
    const [requestList, setRequestList] = useState({ 'requests' : []});

    const fixRequests = (json) => {
      return {
        ...json,
        requests: Object.values(json['requests'])
      };
    };

    useEffect(() => {
      const db = firebase.database().ref();
      db.on('value', snap => {
        if (snap.val()) {
          setRequestList(fixRequests(snap.val()));
          console.log('requestList :>> ', requestList['requests']);
        }
      }, error => console.log(error));
    }, []);


    return (
        <MapView
          style={{flex:1}}
          initialRegion={{
          latitude: 42.045597,
          longitude: -87.688568,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }} 
        >
          {
            requestList['requests'].map((marker, index) => {
              return (
                <Marker 
                  key={index}
                  coordinate={{"latitude": marker.latitude, "longitude": marker.longitude}}
                  title={marker.user} 
                  description={marker.time}
                />
              );
            })
          }
        </MapView>
    );
}
const styles = StyleSheet.create({
    VolunteerScreen: {
      flex: 1,

    },
  });
  

export default VolunteerScreen;