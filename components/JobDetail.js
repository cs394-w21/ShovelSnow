import React, {useState, useEffect} from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';

function JobDetail({ job }) {

  return (
    <View style={styles.container}>
      <Text>Requester name: {job.displayName}</Text>
      <Text>Address: {job.addr}</Text>
      <Button title="Accept" />
      <Button title="Reject" />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    zindex: 20
  },
});

export default JobDetail;
