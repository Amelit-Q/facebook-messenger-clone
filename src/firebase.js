import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDd0HDOkecRruwMJH5QM1CiJG86ufSSmdQ',
  authDomain: 'facebook-messenger-clone-23e07.firebaseapp.com',
  databaseURL: 'https://facebook-messenger-clone-23e07.firebaseio.com',
  projectId: 'facebook-messenger-clone-23e07',
  storageBucket: 'facebook-messenger-clone-23e07.appspot.com',
  messagingSenderId: '520273760022',
  appId: '1:520273760022:web:5afa64ee54b7574e2aca37',
  measurementId: 'G-NQQ4KDBV2M',
});

export const db = firebaseApp.firestore();
