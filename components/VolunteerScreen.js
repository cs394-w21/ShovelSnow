import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import {firebase} from '../firebase'
import JobList from './JobList';
import JobDetail from './JobDetail';
import UserContext from "../UserContext";

function VolunteerScreen() {
    const user = useContext(UserContext);
    const [requestList, setRequestList] = useState({ 'requests': {} });
    const [jobList, setJobList] = useState({ 'jobs': {} });
    const [selectedJob, setSelectedJob] = useState(null);

    const fixRequests = (json) => {
      return {
        'requests': {
          ...json,
          ...requestList['requests']
        }
      };
    };

    useEffect(() => {
      const db = firebase.database().ref('requests');

      function handleData(snap) {
        if (snap.val()) {
          setRequestList(fixRequests(snap.val()));
        }
      }
      db.on('value', handleData, error => console.error(error));
      return () => { db.off('value', handleData); };
    }, []);

    const fixJobs = (job) => {
      const uid = job[0];
      return {
        'jobs': {
          //...(jobList['jobs'].filter(existingJob => existingJob.user != job.user)),
          ...jobList['jobs'],
          [uid]: job[1]
        }
      };
    };

    function fixAndSetJobs(selectedJob) {
      setJobList(fixJobs(selectedJob)); 
    }

    /*
    const removeJob = (user) => {
      firebase.database().ref(`requests/${user}`).remove()
        .then(() => {
          const newJobList = jobList['jobs'].filter(job => job.user !== user);
          setJobList({
            'jobs': newJobList
          });
        })
        .catch(() => {
          console.error('error deleting request');
        });
    };

    const setRemoveJob = user => removeJob(user);
    */

    // const postJobs = firebase.database().ref('jobs').child(user.uid).set(jobList).catch(error => {
    //     setSubmitError(error.message);
    //   })


    return (
      <SafeAreaView style={styles.container} >
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude: 42.045597,
            longitude: -87.688568,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {
            Object.entries(requestList['requests']).map((request, index) => {
              // request is [ 'uid', { request details object }]
              return (
                <MapView.Marker
                  key={index}
                  coordinate={{"latitude": request[1].latitude, "longitude": request[1].longitude}}
                  title={request[1]['displayName']}
                  description={request[1].addr}
                  onPress={() => setSelectedJob(request)}
                />
              );
            })
          }
        </MapView>
        <JobDetail selectedJob={selectedJob} setJobList={fixAndSetJobs} setSelectedJob={setSelectedJob} />
        <JobList jobList={jobList} select={console.log} />
      </SafeAreaView>
    );
}
/*
        <JobDetail job={selectedJob} />
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3
  },
});


export default VolunteerScreen;
