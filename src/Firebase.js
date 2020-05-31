import * as firebase from 'firebase'
import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyBzDxe-nX85HvjvqNNNW2XmJ1tG9weQ22o",
  authDomain: "e-commerce-react-d61af.firebaseapp.com",
  databaseURL: "https://e-commerce-react-d61af.firebaseio.com",
  projectId: "e-commerce-react-d61af",
  storageBucket: "e-commerce-react-d61af.appspot.com",
  messagingSenderId: "960310783046",
  appId: "1:960310783046:web:9a1a775d1aad3ab5382e47",
  measurementId: "G-32Y8X9E8GY"
};

firebase.initializeApp(firebaseConfig);

export default firebase