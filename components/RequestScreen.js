import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import {firebase} from '../firebase'
import Form from './Form'
import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//   user: Yup.string()
//     .required()
//     .label('User'),
//   time: Yup.string()
//     .required()
//     .matches(/(M|Tu|W|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/, 'Must be weekdays followed by start and end time')
//     .label('Meeting times'),
//   title: Yup.string()
//     .required()
//     .label('Title'),
// });

const RequestHelpBtn = ({route}) => {
  const [requested, setRequested] = useState(0);
  const textInside = ['SHOVEL!', 'CANCEL!'];
  const [submitError, setSubmitError] = useState('');


  function handleSubmit(values) {
    const { user, time, addr } = values;
    let longitude;
    let latitude;
    fetch(`http://api.positionstack.com/v1/forward?access_key=300bfd70ae97e0cdc39aa8c66e930ada&query=${addr}`, {
      method: 'GET'
    })
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      longitude = resJson['data'][0]['longitude'];
      latitude = resJson['data'][0]['latitude'];
      accepted = 0;
    })
    .then(() => {
        const request = { user, time, addr, longitude, latitude, accepted };
        firebase.database().ref('requests').child(user).set(request).catch(error => {
          setSubmitError(error.message);
        });
    })
    .catch(error => {console.error(error)});
  }

  function handleOnPress() {
    if (requested == 0) {
      setRequested(1);
    } else {
      setRequested(0);
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            user: 'Jack',
            addr: '1630 Chicago Avenue, Evanston, Illinois, USA',
            time: 'Thu 12:00-13:50',
          }}
          // validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}
        >
            <Form.Field
                name="user"
                leftIcon="identifier"
                placeholder="Jack"
                autoCapitalize="none"
                autoFocus={true}
            />
            <Form.Field
                name="time"
                leftIcon="calendar-range"
                placeholder="Thu 12:00-13:50"
                autoCapitalize="none"
            />
            <Form.Field
                name="addr"
                leftIcon="format-title"
                placeholder="1630 Chicago Avenue, Evanston, IL"
            />
            <Form.Button title={'Request'} />
            {<Form.ErrorMessage error={submitError} visible={true} />}
        </Form>
        {/* <TouchableOpacity onPress={handleOnPress} style={styles.RequestHelpBtn}>
          <Text>{textInside[requested]}</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  RequestHelpBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});


export default RequestHelpBtn;
