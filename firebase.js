import * as firebase from 'firebase';
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBVibuqj0j7B5utKiTKC4yl2gd3hZZyki0",
  authDomain: "scheduler-7bd75.firebaseapp.com",
  databaseURL: "https://scheduler-7bd75-default-rtdb.firebaseio.com",
  projectId: "scheduler-7bd75",
  storageBucket: "scheduler-7bd75.appspot.com",
  messagingSenderId: "1035883013034",
  appId: "1:1035883013034:web:9f6ab4c64a8270ef99c1d3",
  measurementId: "G-NQZXSV20PK"
};

firebase.initializeApp(firebaseConfig);

export {firebase} ;
