import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MapView from 'react-native-maps';
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
        if (snap.val()) setRequestList(fixRequests(snap.val()))    ;
      }, error => console.log(error));
    }, []);

    console.log(requestList)



    return (
      
      <View>
        {/* <MapView
            style={{flex:1}}
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
    /> */}
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