// //src/redux/store.js
// import { createStore, compose } from 'redux'
// import { reactReduxFirebase } from 'react-redux-firebase'
// import { reduxFirestore } from 'redux-firestore'


// import {db} from '../server/db'

// import { initialState, rootReducer } from './reducers'

// const enhancers = [
//   reduxFirestore(db),
//   // reactReduxFirebase(db, {
//   //   userProfile: 'users',
//   //   useFirestoreForProfile: true,
//   // })
// ]

// const reduxDevToolsExtension = window.devToolsExtension
// if (
//   process.env.NODE_ENV === "development" &&
//   typeof reduxDevToolsExtension === "function"
// ) {
//   enhancers.push(reduxDevToolsExtension())
// }

// const composedEnhancers = compose(
//   ...enhancers
// )

// const store = createStore(rootReducer, initialState, composedEnhancers)


// export default store
