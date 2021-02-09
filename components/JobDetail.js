import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { firebase } from '../firebase';
import UserContext from '../UserContext';

function JobDetail({ selectedJob, setSelectedJob }) {
  const user = useContext(UserContext);
  const [rejectState, setRejectState] = useState(false);

  useEffect(() => {
    setSelectedJob(null);
  }, [rejectState]);

  function reject() {
    if (rejectState) { setRejectState(false); }
    else { setRejectState(true); }
  }

  function accept(selectedJob) {
    selectedJob[1]['volunteer'] = user.uid;
    const jobEntry = {
      [selectedJob[0]]: selectedJob[1]
    }
    const db = firebase.database().ref(`jobs/${user.uid}`);
    db.update(jobEntry)
    .then(() => {
      reject();
      const requestDb = firebase.database().ref('requests');
      selectedJob[1]['accepted'] = 1;
      const requestEntry = {
        [selectedJob[0]]: selectedJob[1]
      }
      console.log('requestEntry :>> ', requestEntry);
      requestDb.update(requestEntry);
    })
    .catch((error) => console.error(error.message));

    /*
    setJob({
      [selectedJob[0]]: selectedJob[1]
    });
    */
  }

  if (!selectedJob) {
    return (
      <View style={styles.container}>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request Details</Text>
      <View style={styles.subcontainer}>
        <View style={styles.subTextContainer}>
          <Text style={styles.detailText}>Requester name: {selectedJob[1].displayName}</Text>
          <Text style={styles.detailText}>Address: {selectedJob[1].addr}</Text>
        </View>
        <TouchableOpacity style={styles.acceptBtn} onPress={() => accept(selectedJob)}>
          <Text>Accept</Text>  
        </TouchableOpacity> 
        <TouchableOpacity style={styles.rejectBtn} onPress={() => reject()}>
          <Text>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    maxHeight: '200px'
  },
  subcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '30px'
  },
  subTextContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#1e90ff',
    color: 'white',
    fontSize: '23px',
    paddingLeft: '30px',
    fontWeight: 'bold'
  },
  detailText: {
    fontSize: '15px',
    fontWeight: 'bold',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '30px'
  },
  acceptBtn: {
    backgroundColor: '#c7e3d0',
    color: '#aabbcc',
    fontSize: '15px',
    textAlign: 'center',
    paddingTop: '9px',
    paddingBottom: '9px',
    paddingLeft: '7px',
    paddingRight: '7px',
    maxHeight: '50px',
    width: '60px',
    fontWeight:'bold'
  },
  rejectBtn: {
    backgroundColor: '#f6d6de',
    color: '#aabbcc',
    fontSize: '15px',
    fontWeight:'bold',
    textAlign: 'center',
    paddingTop: '9px',
    paddingBottom: '9px',
    paddingLeft: '7px',
    paddingRight: '7px',
    width: '60px',
    maxHeight: '50px',
  }
});

export default JobDetail;
