//import firebase from 'react-native-firebase';
import firebase from 'firebase/app'
import firestore from 'firebase/firebase-firestore'
const config = {
  apiKey: 'AIzaSyBUvLq-PhCJ-cr4FUMkMJUzk4TI5qS8ftY',
  authDomain: 'team-111-escape-room.firebaseapp.com',
  databaseURL: 'https://team-111-escape-room.firebaseio.com',
  projectId: 'team-111-escape-room',
  storageBucket: 'team-111-escape-room.appspot.com',
  messagingSenderId: '812966208385',
  appId: '1:812966208385:web:20a0ff63995b9021157e80'

};
// console.log(firebase)
firebase.initializeApp(config)
const db = firebase.firestore();
console.log(db.collection('users').get())
db.settings = {timestampsInSnapshots: true};

// let data = {
//   name: 'Los Angeles',
//   state: 'CA',
//   country: 'USA'
// };
// // Add a new document in collection "cities" with ID 'LA'
// let setDoc = db.collection('cities').doc('LA').set(data);


module.export = db;
