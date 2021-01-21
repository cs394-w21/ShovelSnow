import * as firebase from 'firebase';
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCbKHJxhz53HWo0wyjJVd4yxTb6NZDjSWU",
  authDomain: "shovelsnow-316ad.firebaseapp.com",
  databaseURL: "https://shovelsnow-316ad-default-rtdb.firebaseio.com",
  projectId: "shovelsnow-316ad",
  storageBucket: "shovelsnow-316ad.appspot.com",
  messagingSenderId: "663821110835",
  appId: "1:663821110835:web:b5281ea103c517cea8dd46"
};
firebase.initializeApp(firebaseConfig);

export {firebase} ;
