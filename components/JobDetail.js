import React, {useState, useEffect} from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';

function JobDetail({ selectedJob, accept, reject }) {
  if(!selectedJob) return (
    <View>
      <Text>Selected job will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Requester name: {selectedJob.displayName}</Text>
      <Text>Address: {selectedJob.addr}</Text>
      <Button title="Accept" onPress={accept(selectedJob)}/>
      <Button title="Reject" onPress={reject(selectedJob)}/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
});

export default JobDetail;
