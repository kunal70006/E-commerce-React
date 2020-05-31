import * as firebase from 'firebase'
import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyCxMNMvf6LFg_SJUMILMtShK1XEHN7mPm4",
  authDomain: "e-commerce-react-e542f.firebaseapp.com",
  databaseURL: "https://e-commerce-react-e542f.firebaseio.com",
  projectId: "e-commerce-react-e542f",
  storageBucket: "e-commerce-react-e542f.appspot.com",
  messagingSenderId: "54774995439",
  appId: "1:54774995439:web:7b7b8713855fc8efbcfe1a",
  measurementId: "G-REGHLXW5F8"
};

firebase.initializeApp(firebaseConfig);

export default firebase