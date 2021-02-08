import React, { useCallback, useState  } from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import { useEffect } from 'react/cjs/react.development';

function JobDetail({ selectedJob, setJobList, setSelectedJob }) {
  const [job, setJob] = useState({});
  const [rejectState, setRejectState] = useState(false);
  console.log('selectedJob :>> ', selectedJob);

  useEffect(() => {
    setJobList(job); 
  }, [job]);

  useEffect(() => {
    setSelectedJob(null);
  }, [rejectState]);

  function reject() {
    if (rejectState) { setRejectState(false); }
    else { setRejectState(true); }
  }

  function accept(selectedJob) {
    setJob(selectedJob);
  }

  if(!selectedJob) {
    return (
      <View style={styles.container}>
        <Text>Selected job will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Requester name: {selectedJob[1].displayName}</Text>
      <Text>Address: {selectedJob[1].addr}</Text>
      <Button title="Accept" onPress={() => accept(selectedJob)}/>
      <Button title="Reject" onPress={() => reject()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default JobDetail;
