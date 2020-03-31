import {getSingleGame, updateGame} from '../server/api/games'

// Initial State
const initialState = {
  hintsLeft: 3,
  currentTime: {min: 0, sec: 0},
  visibleInRoom: {key: true, desk: true},
  inventory: [{name: 'Empty', itemIMG: require('../js/Inventory/images/icon_close.png')}],
  selectedItemIndex: 0,
  levelName: 'spookyCabin',
  lockCombo: '1234',
  puzzles: {
    eastWall: 'lockBox',
    northWall: 'colorBlock',
    westWall: 'slidingPuzzle',
  }
}

// Action Types
const GOT_GAME = 'GOT_GAME'
const UPDATE_HINT = 'UPDATE_HINT'
//ACTION TYPE ADDED BY DANIELLE
const UPDATE_TIME = 'UPDATE_TIME'
const UPDATE_VISIBLE_ITEMS = 'UPDATE_VISIBLE_ITEMS'
const ADD_TO_INVENTORY = 'ADD_TO_INVENTORY'
const CHANGE_SELECT_ITEM_IND = 'CHANGE_SELECT_ITEM_IND'
//END ACTION TYPE ADDED BY DANIELLE

// Action Creator
const gotGame = info => {
  return {
    type: GOT_GAME,
    info
  }
}

export const useHint = () => {
  return {
    type: UPDATE_HINT,
  }
}

//START ACTIONS ADDED BY DANIELLE= 'UPDATE_VISIBLE_ITEMS'
export const updateTime = () => {
  return {
    type: UPDATE_TIME,
  }
}

export const updateVisibleItems = info => {
  return {
    type: UPDATE_VISIBLE_ITEMS,
    info,
  }
}

export const addToInventory = info => {
  return {
    type: ADD_TO_INVENTORY,
    info,
  }
}

export const selectedItemIndex = info => {
  return {
    type: CHANGE_SELECT_ITEM_IND,
    info,
  }
}

//END ACTIONS ADDED BY DANIELLE


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

export const hintThunk = (oldHintCount) => {
  return dispatch => {
    let currHint = oldHintCount - 1;
    dispatch(useHint(currHint))
  }
}

//THUNKS ADDED BY DANIELLE
export const itemVisibleThunk = itemKey => {
  return dispatch => {
    dispatch(updateVisibleItems(itemKey));
  }
}

export const addToInventoryThunk = newItem => {
  return dispatch => {
    dispatch(addToInventory(newItem));
  }
}

export const selectItemThunk = newIndex => {
  return dispatch => {
    dispatch(selectedItemIndex(newIndex))
  }
}

//END THUNKS ADDED BY DANIELLE

export const saveGameThunk = (gameID, updatedGame) => {
  return async dispatch => {
    try {
      let data = {}
      updatedGame = {...updatedGame, hintsLeft: 1}
      await updateGame((gameID, updatedGame))
      await getSingleGame(((gameFound) => data = {...gameFound}), gameID)
      dispatch(gotGame(data))
    } catch (error) {
      console.error(error)
    }
  }
}


// score reducer
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_GAME:
      return action.info;
    case UPDATE_HINT:
      return {...state, hintsLeft: state.hintsLeft - 1}
    //CASES ADDED BY DANIELLE
    case UPDATE_VISIBLE_ITEMS:
      let itemKey = action.info;
      return {...state, visibleInRoom: {
          ...state.visibleInRoom,
          [itemKey]: false,
      }};
    case ADD_TO_INVENTORY:
      let currInventory = state.inventory;
      currInventory.unshift(action.info);
      return {...state, inventory: currInventory}
    case CHANGE_SELECT_ITEM_IND:
      return {...state, selectedItemIndex: action.info}

    //END CASES ADDED BY DANIELLE
    default:
      return state;
  }
}

export default gameReducer;
