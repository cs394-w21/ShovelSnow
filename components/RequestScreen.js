import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function RequestHelpBtn() {
  return (
    <TouchableOpacity onPress={ () => { console.log('PRESSED!'); }}>
      <Text>SHOVEL!</Text>
    </TouchableOpacity>
  );
}


export default RequestHelpBtn;