import React, {useState} from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import * as Yup from 'yup';
import Form from "./Forms/Form";

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
  const [authError, setAuthError] = useState('');

  function handleOnLogin(values) {
    const { email, password } = values;
    setAuthError(null);
    firebase.auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('userCredential :>> ', userCredential);
    })
    .catch((error) => {
      setAuthError(error.message);
    });
  }

  function handleOnSignUp(values) {
    const { name, email, password } = values;
    setAuthError(null);
    firebase.auth.createUserWithEmailAndPassword(email, password)
    .then((authCredential) => {
      const user = authCredential.user;
      user.updateProfile({displayName: name}).then(() => {
        navigation.navigate('HomeScreen');
      });
    })
    .catch((error) => {
      setAuthError(error.message);
    });
  }

  async function handleOnSubmit(values) {
    return values.confirm ? handleOnSignUp(values) : handleOnLogin(values);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
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
            name="confirmPassword"
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