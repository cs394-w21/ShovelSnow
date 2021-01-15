import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {firebase} from '../firebase'


function VolunteerScreen() {
    const [requestList, setRequestList] = useState({ requests: [] });

    const fixRequests = json => ({
      ...json,
      requests: Object.values(json.requests)
    });

    useEffect(() => {
      const db = firebase.database().ref();
      db.on('value', snap => {
        if (snap.val()) setRequestList(fixRequests(snap.val()));
      }, error => console.log(error));
    }, []);

    const markers = [
      {
        latlng: { latitude: 37.78825 , longitude: -122.4324},
        title: 'marker1',
        description: 'marker1 desc'
      }, 
      {
        latlng: { latitude: 37.7883 , longitude: -122.433},
        title: 'marker2',
        description: 'marker2 desc'
      }
    ];

    return (
      <View>
        <MapView
          style={{flex:1}}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }} 
        >
          {markers.map((marker, index) => {
            return (
              <Marker 
                key={index}
                coordinate={marker.latlng}
                title={marker.title} 
                description={marker.description}
              />
            );
          })}
        </MapView>
      <Text>{ requestList.requests.length === 0 ? 'loading' : requestList.requests[0].user }</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    VolunteerScreen: {
      flex: 4,

    },
  });
  

export default VolunteerScreen;