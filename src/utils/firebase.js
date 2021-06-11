import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBqJQrO7-IfADOEJziamhVWnJVFjEKmxxY",
  authDomain: "inommatask.firebaseapp.com",
  projectId: "inommatask",
  storageBucket: "inommatask.appspot.com",
  messagingSenderId: "278258898142",
  appId: "1:278258898142:web:86c13f49d9412e12e59e4f",
  measurementId: "G-GPZ3XWLQVE"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
