import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension'
//import individual reducers here
import scoreReducer from './scoreReducer';
import gameReducer from './gameReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  score: scoreReducer,
  game: gameReducer,
  user: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
export * from './scoreReducer';
export * from './gameReducer';
export * from './userReducer';
