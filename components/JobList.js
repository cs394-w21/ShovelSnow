import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function JobList({ jobs, select }) {
  console.log(jobs['jobs'][0].user);
  return (
    <View style={styles.container}>
      {
        jobs['jobs'].map((job, i) => {
          return (
            <TouchableOpacity
              style={styles.job}
              key={i}
              // onPress={() => {
              //   select(job.user);
              // }}
            >
              <Text style={styles.text}>
                {`Press to cancel the request you accepted from ${job.user}`}
              </Text>
              <Text style={styles.text}>
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

  },
  job: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d8ccc',
    margin: 10,
    maxHeight: 100,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  }
});

export default JobList;
