import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import { firebase } from '../firebase'
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

  useEffect(() => {
    const db = firebase.database().ref(`jobs/${user.uid}`);

    function handleData(snap) {
      if (snap.val()) {
        console.log('snap.val() :>> ', snap.val());
        setJobList(fixJobs(snap.val()));
      }
    }
    db.on('value', handleData, error => console.error(error));
    return () => { db.off('value', handleData); };
  }, []);

  function fixJobs(job) {
    console.log('jobList[jobs] :>> ', jobList['jobs']);
    const result = {
      'jobs': {
        ...jobList['jobs'],
        ...job
      }
    };
    console.log('result :>> ', result);
    return result;
  };

  async function removeJob(jobId, job) {
    await firebase.database().ref(`jobs/${user.uid}/${jobId}`).remove();
    job['accepted'] = 0;
    const requestEntry = {
      [jobId]: job
    };
    await firebase.database().ref('requests').update(requestEntry);
  }

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
            if (request[1]['accepted'] === 0) {
              return (
                <MapView.Marker
                  key={index}
                  coordinate={{ "latitude": request[1].latitude, "longitude": request[1].longitude }}
                  title={request[1]['displayName']}
                  description={request[1].addr}
                  onPress={() => setSelectedJob(request)}
                />
              );
            }
          })
        }
      </MapView>
      <JobDetail selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
      <JobList jobList={jobList} select={removeJob} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3
  },
});


export default VolunteerScreen;
