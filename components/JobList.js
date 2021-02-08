import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function JobList({ jobList, select }) {
  console.log('jobList :>> ', jobList);
  return (
    <View style={styles.container}>
      {
        Object.entries(jobList['jobs']).map((job, i) => {
          return (
            <View
              style={styles.jobDiv}
              key={i}
            >
              <Button 
                onPress={select(job[0])}
                title='Cancel Job'
              />
              <Text style={styles.text}>
                {`Shovel for ${job[1].displayName} at ${job.addr}`}
              </Text>
            </View>
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
  jobDiv: {
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
