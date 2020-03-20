// import * as firebase from 'firebase';
import * as firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore';
const config = {
  apiKey: 'AIzaSyBUvLq-PhCJ-cr4FUMkMJUzk4TI5qS8ftY',
  authDomain: 'team-111-escape-room.firebaseapp.com',
  databaseURL: 'https://team-111-escape-room.firebaseio.com',
  projectId: 'team-111-escape-room',
  storageBucket: 'team-111-escape-room.appspot.com',
  messagingSenderId: '812966208385',
  appId: '1:812966208385:web:20a0ff63995b9021157e80'

};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings = {timestampsInSnapshots: true};


export default db;
