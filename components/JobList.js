import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { firebase } from '../firebase';

function JobList({ jobList, select }) {
  console.log('jobList :>> ', jobList);
  if (Object.keys(jobList['jobs'])[0] === 'undefined' && Object.keys(jobList['jobs']).length === 1) {
    return (
      <View style={styles.container}>
      </View>
    )
  }   

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jobs you've accepted:</Text>
      {
        Object.entries(jobList['jobs']).map((job, i) => {
          return (
            <View
              style={styles.jobDiv}
              key={i}
            >
              <Text style={styles.text}>
                {`Shovel for ${job[1].displayName} at ${job[1].addr}`}
              </Text>
              
              <Button 
                style={styles.cancelBtn}
                onPress={() => select(job[0], job[1])}
                color="#f05b28"
                title='Cancel Job'
              />
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
    flexDirection: 'row',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d8ccc',
    margin: 10,
    maxHeight: 100,
    borderRadius: 10,
    padding: 10
  },
  text: {
    color: 'white',
    fontSize: '16px',
    marginBottom: '8px',
    marginRight: '20px'
  },
  header: {
    backgroundColor: '#1e90ff',
    color: 'white',
    fontSize: '23px',
    paddingLeft: '30px',
    fontWeight: 'bold'
  },
  cancelBtn: {
    backgroundColor: '#f05b28' 
  }
});

export default JobList;
