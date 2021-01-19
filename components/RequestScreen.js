import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import firebase from '../firebase'
import Geocoder from 'react-native-geocoding';
import Form from './Form'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  user: Yup.string()
    .required()
    .label('User'),
  meets: Yup.string()
    .required()
    .matches(/(M|Tu|W|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/, 'Must be weekdays followed by start and end time')
    .label('Meeting times'),
  title: Yup.string()
    .required()
    .label('Title'),
});

Geocoder.init("300bfd70ae97e0cdc39aa8c66e930ada")

const RequestHelpBtn = ({route}) => {
  const [requested, setRequested] = useState(0);
  const textInside = ['SHOVEL!', 'CANCEL!'];
  const [submitError, setSubmitError] = useState('');


  async function handleSubmit(values) {
    const { user, time, addr } = values;
    const request = { user, time, addr };
    firebase.database().ref('requests').child(user).set(request).catch(error => {
      setSubmitError(error.message);
    });
  }


  Geocoder.from("1630 Chicago Avenue, Evanston, IL")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
    .catch(error => console.warn(error));
    
  

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
            addr: '1630 Chicago Avenue, Evanston, IL',
            time: 'Thu 12:00-13:50',
          }}
          validationSchema={validationSchema}
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
            <Form.Button title={'Update'} />
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
