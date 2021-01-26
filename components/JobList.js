import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function JobList({ jobs, select }) {
  return (
    <View style={styles.container}>
      { 
        jobs['jobs'].map((job, i) => {
          return (
            <TouchableOpacity 
              style={styles.job}
              key={i}
              onPress={() => {
                select(job.user);
              }} 
            >
              <Text>
                {`Press to cancel the request you accepted from ${job.user}`}
              </Text>
              <Text>
                {`Address: ${job.addr}`}
              </Text>
            </TouchableOpacity>
          );
        })
      }
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    padding: 200
  },
  job: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa968',
    margin: 10,
    maxHeight: 100
  }
});

export default JobList;