import {getScores} from '../server/api/scores'

// Initial State
const initialState = {
  allScores: []
}

// Action Types
const GOT_ALL = 'GOT_ALL'

// Action Creator
const gotAllScores = info => {
  return {
    type: GOT_ALL,
    info
  }
}

// Thunk Creator
export const getAllScores = () => {
  return async dispatch => {
    try {
      const data = await getScores(inputArr => inputArr)
      dispatch(gotAllScores(data))
    } catch (error) {
      console.error(error)
    }
  }
}


// score reducer
const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL:
      return {...state, allScores: action.info}
    default:
      return state
  }
}

export default scoreReducer
