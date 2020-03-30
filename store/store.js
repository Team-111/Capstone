import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
//import individual reducers here
import scoreReducer from '../store/scoreReducer'
import gameReducer from '../store/gameReducer'

const reducer = combineReducers({
  score: scoreReducer,
  game: gameReducer,
})
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware)
// )
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store
export * from './scoreReducer'
export * from './gameReducer'
