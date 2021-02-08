import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import {firebase} from '../firebase'
import Form from './Form'
import * as Yup from 'yup';
import { NavigationContainer } from '@react-navigation/native';
import UserContext from '../UserContext';

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

const RequestHelpBtn = ({navigation}) => {
  const [requested, setRequested] = useState(0);
  const textInside = ['SHOVEL!', 'CANCEL!'];
  const [submitError, setSubmitError] = useState('');

  const user = useContext(UserContext);

  function handleSubmit(values) {
    const { addr } = values;
    let longitude;
    let latitude;
    let accepted;

    if(requested == 1) return null;

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
        let displayName = user.name
        const request = { displayName, addr, longitude, latitude, accepted };
        firebase.database().ref('requests').child(user.uid).set(request).catch(error => {
          setSubmitError(error.message);
        });
        setRequested(1);
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
    <SafeAreaView>
      <ScrollView>
        <Form
          style={styles.form}
          initialValues={{
            addr: ''
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            navigation.navigate('Home');
          }}
        >
            <Form.Field
                name="addr"
                leftIcon="format-title"
                placeholder="Address"
            />
            <Form.Button style={styles.Btn} title={'Request'} />
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
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Btn: {
    color: '#fafafa',
    backgroundColor: '#3d8ccc',

  }
});


export default RequestHelpBtn;
