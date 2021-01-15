import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../firebase'

function RequestHelpBtn() {
  const [requested, setRequested] = useState(0);
  const textInside = ['SHOVEL!', 'CANCEL!'];

  function handleOnPress() {
    if (requested == 0) {
      setRequested(1);
    } else {
      setRequested(0);
    }
  } 

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.RequestHelpBtn}>
      <Text>{textInside[requested]}</Text>
    </TouchableOpacity>
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
