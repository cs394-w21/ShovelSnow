import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import Form from './Form'


export default function DetailedRequestScreen (marker) {
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Form
        initialValues={{
          user: '',
          addr: '',
          time: '',
        }}
      >
          <Form.Field
              name="user"
              leftIcon="identifier"
              placeholder={marker.user}
              autoCapitalize="none"
              autoFocus={true}
          />
          <Form.Field
              name="time"
              leftIcon="calendar-range"
              placeholder={marker.time}
              autoCapitalize="none"
          />
          <Form.Field
              name="addr"
              leftIcon={marker.addr}
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
}