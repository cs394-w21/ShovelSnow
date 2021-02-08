import React, {useState} from "react";
import { Button, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import * as Yup from 'yup';
import Form from "./Form";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
});

function LoginScreen({ navigation }) {
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
          onSubmit={handleOnLogin}
        >
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
          <Form.Button title='Login' />
          {<Form.ErrorMessage error={authError} visible={true} />}
        </Form>
        <Button title="Register" onPress={navigation.navigate("RegisterScreen")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LoginScreen;
