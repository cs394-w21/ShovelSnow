import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import {firebase} from '../firebase'
import JobList from './JobList';

function VolunteerScreen() {
    const [requestList, setRequestList] = useState({ 'requests' : []});
    const [jobList, setJobList] = useState({ 'jobs': [] });

    const fixRequests = (json) => {
      return {
        ...json,
        requests: Object.values(json['requests'])
      };
    };

    const fixJobs = (job) => {
      return {
        jobs: [
          ...(jobList['jobs'].filter(existingJob => existingJob.user != job.user)),
          job
        ]
      };
    };

    const removeJob = (user) => {
      firebase.database().ref(`requests/${user}`).remove()
        .then(() => {
          const newJobList = jobList['jobs'].filter(job => job.user !== user);
          console.log('newJobList :>> ', newJobList);
          setJobList({
            'jobs': newJobList
          });
        })
        .catch(() => {
          console.log('error deleting request');
        });
    };

    const setRemoveJob = user => removeJob(user);

    useEffect(() => {
      const db = firebase.database().ref();

      function handleData(snap) {
        if (snap.val()) {
          setRequestList(fixRequests(snap.val()));
        }
      }

      db.on('value', handleData, error => console.log(error));
      return () => { db.off('value', handleData); };
    }, []);

    return (
      <SafeAreaView style={styles.container} >
        <MapView
          style={styles.map}
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
                <MapView.Marker
                  key={index}
                  coordinate={{"latitude": marker.latitude, "longitude": marker.longitude}}
                  title={marker.user}
                  description={marker.time}
                  onPress={() => {
                    setJobList(fixJobs(requestList['requests'][index]));
                  }}
                />
              );
            })
          }
        </MapView>

        <JobList jobs={jobList} select={setRemoveJob} />
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2
  },
});


export default VolunteerScreen;
