import {getSingleGame, updateGame} from '../server/api/games'

// Initial State
const initialState = {
  currentGame: {
    hintsLeft: 3,
    currentTime: {min: 0, sec: 0},
    inventory: {},
    levelName: 'spookyCabin',
    lockCombo: '1234',
    puzzles: {
      eastWall: 'lockBox',
      northWall: 'colorBlock',
      westWall: 'slidingPuzzle',
    }
  }
}

// Action Types
const GOT_GAME = 'GOT_GAME'

// Action Creator
const gotGame = info => {
  return {
    type: GOT_GAME,
    info
  }
}

// Thunk Creator
export const fetchGame = gameID => {
  return async dispatch => {
    try {
      let data = {};
      await getSingleGame(((gameFound) => data = {...gameFound}), gameID)
      dispatch(gotGame(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const saveGame = (gameID, updatedGame) => {
  return async dispatch => {
    try {

    } catch (error) {
      console.error(error)
    }
  }
}


// score reducer
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_GAME:
      return {...state, currentGame: action.info}
    default:
      return state
  }
}

export default gameReducer
