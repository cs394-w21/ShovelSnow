import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    <TouchableOpacity onPress={handleOnPress}>
      <Text>{textInside[requested]}</Text>
    </TouchableOpacity>
  );
}




export default RequestHelpBtn;