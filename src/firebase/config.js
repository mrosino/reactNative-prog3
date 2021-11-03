
  import app from 'firebase/app';
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCeJLNm-M0WQa4S4Q0M6DUnMxqOy_H3AhQ",
  authDomain: "grupo-rn.firebaseapp.com",
  projectId: "grupo-rn",
  storageBucket: "grupo-rn.appspot.com",
  messagingSenderId: "557461741580",
  appId: "1:557461741580:web:91f503e70021a530338e29"
};
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();