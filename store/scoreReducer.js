import {getScores, newHighScore} from '../server/api/scores'

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
      let data = [];
      await getScores((inputArr) => {
        let arrInTime = inputArr.map(element => {
          let timeMilliseconds = element.score;
          let totalTimeinSeconds = timeMilliseconds / 1000;
          let minutes = Math.floor(totalTimeinSeconds / 60);
          let seconds = totalTimeinSeconds - (minutes * 60);

          let dupElement = {...element};
          dupElement.score = `${minutes}:${seconds < 10 ? `0${seconds}`: `${seconds}`}`;
          dupElement.milliseconds = timeMilliseconds;
          return dupElement;
        })
        data = [...arrInTime]
      })
      dispatch(gotAllScores(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const newScoreThunk = (leaderboardName, time) => {
  return async () => {
    try {
      await newHighScore(leaderboardName, time)
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
