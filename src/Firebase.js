import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'


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

const storage = firebase.storage()

// export {
//   storage, firebase as default
// }

// export default storage;
// export default firebase;
export {firebase as default}
export {storage}