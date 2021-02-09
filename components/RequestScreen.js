import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Button } from 'react-native';
import { firebase } from '../firebase'
import Form from './Form'
import UserContext from '../UserContext';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({ 
  addr: Yup.string().required().label('Address')
});

const RequestHelpBtn = ({ navigation }) => {
  const [submitError, setSubmitError] = useState('');
  const [request, setRequest] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    const db = firebase.database().ref(`requests/${user.uid}`);
    function handleData(snap) {
      if (snap.val()) {
        setRequest(snap.val());
      }
    }

    db.on('value', handleData, error => console.error(error));
    return () => { db.off('value', handleData); };
  },[]);

  function handleSubmit(values) {
    const { addr } = values;
    let longitude;
    let latitude;
    let accepted;
    let volunteer;

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
        volunteer = '';
      })
      .then(() => {
        let displayName = user.name
        const request = { displayName, addr, longitude, latitude, accepted, volunteer };
        firebase.database().ref('requests').child(user.uid).set(request)
        .then(() => {
          setRequest({[user.uid]: request});
        })
        .catch(error => {
          setSubmitError(error.message);
        });
      })
      .catch(error => { console.error(error) });
  }

  async function handleOnPress() {
    console.log('request.volunteer :>> ', request.volunteer);
    await firebase.database().ref(`requests/${user.uid}`).remove();
    await firebase.database().ref(`jobs/${request['volunteer']}/${user.uid}`).remove();
    setRequest(null);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Form
          style={styles.form}
          initialValues={{
            addr: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
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
        <View style={styles.subcontainer}>
          { request === null || request === {} ? null : <Text style={styles.text}>Press if the snow's been shoveled</Text> }
          { request === null || request === {} ? null : <Button title="Shoveled!" onPress={handleOnPress}/> }
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  Btn: {
    color: '#fafafa',
    backgroundColor: '#3d8ccc',
  },
  subcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px'
  },
  text: {
    fontSize: '16px',
    textAlign: 'center'
  }
});


export default RequestHelpBtn;
