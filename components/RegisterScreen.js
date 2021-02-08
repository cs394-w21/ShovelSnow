import React, {useState} from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import * as Yup from 'yup';
import Form from "./Form";
import {firebase} from '../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirmation password must match the password')
});

function RegisterScreen({ navigation }) {
  const [authError, setAuthError] = useState();

  async function handleOnSignUp(values) {
    const { name, email, password } = values;
    setAuthError(null);
    try {
      const authCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = authCredential.user;
      await user.updateProfile({displayName: name});
      navigation.navigate('Home');
    } catch (error) {
      setAuthError(error.message);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;
    setAuthError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      setAuthError(error.message);
    }
  }

  async function handleOnSubmit(values) {
    return values.confirm ? handleOnSignUp(values) : handleOnLogin(values);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="name"
            leftIcon="identifier"
            placeholder="Enter name"
            autoCorrect={false}
            autoCapitalize='none'
          />
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirm"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Button title={values => values.confirm ? 'Register' : 'Login'} />
          {<Form.ErrorMessage error={authError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default RegisterScreen;
