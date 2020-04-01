import {getSingleGame, updateGame} from '../server/api/games';

// Initial State
const initialState = {
  hintsLeft: 3,
  currentTime: {min: 0, sec: 0},
  visibleInRoom: {key: true, desk: true},
  inventory: [
    {name: 'Empty', itemIMG: require('../js/Inventory/images/icon_close.png')},
  ],
  selectedItemIndex: 0,
  levelName: 'spookyCabin',
  lockCombo: '',
  puzzles: {
    eastWall: 'lockBox',
    northWall: 'colorBlock',
    westWall: 'slidingPuzzle',
  },
};

// Action Types
const GOT_GAME = 'GOT_GAME'
const UPDATE_HINT = 'UPDATE_HINT'
const UPDATE_TIME = 'UPDATE_TIME'
const UPDATE_VISIBLE_ITEMS = 'UPDATE_VISIBLE_ITEMS'
const ADD_TO_INVENTORY = 'ADD_TO_INVENTORY'
const CHANGE_SELECT_ITEM_IND = 'CHANGE_SELECT_ITEM_IND'
const TOGGLE_LIGHT = 'TOGGLE_LIGHT';
const SET_CODE = 'SET_CODE';

// Action Creator
const gotGame = info => {
  return {
    type: GOT_GAME,
    info,
  };
};

export const useHint = () => {
  return {
    type: UPDATE_HINT,
  };
};

const setCode = code => {
  return {
    type: SET_CODE,
    code,
  };
};

export const updateTime = info => {
  return {
    type: UPDATE_TIME,
    info,
  };
};

export const updateVisibleItems = info => {
  return {
    type: UPDATE_VISIBLE_ITEMS,
    info,
  };
};

export const addToInventory = info => {
  return {
    type: ADD_TO_INVENTORY,
    info,
  };
};

export const selectedItemIndex = info => {
  return {
    type: CHANGE_SELECT_ITEM_IND,
    info,
  }
}

//END ACTIONS ADDED BY DANIELLE

export const toggleLight = () => ({
  type: TOGGLE_LIGHT,
});

// Thunk Creator
export const fetchGame = gameID => {
  return async dispatch => {
    try {
      let data = {};
      await getSingleGame(gameFound => (data = {...gameFound}), gameID);
      dispatch(gotGame(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const timeThunk = updateTimeObj => {
  return dispatch => {
    dispatch(updateTime(updateTimeObj));
  };
};

export const itemVisibleThunk = itemKey => {
  return dispatch => {
    dispatch(updateVisibleItems(itemKey));
  };
};

export const addToInventoryThunk = newItem => {
  return dispatch => {
    dispatch(addToInventory(newItem));
  };
};

export const selectItemThunk = newIndex => {
  return dispatch => {
    dispatch(selectedItemIndex(newIndex));
  };
};

export const secretCode = code => {
  return dispatch => {
    dispatch(setCode(code));
  };
};


export const saveGameThunk = (userId, updatedGame) => {
  return async dispatch => {
    try {
      let data = {};
      await updateGame(userId, updatedGame);
      await getSingleGame(gameFound => (data = {...gameFound}), userId);
      dispatch(gotGame(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// score reducer
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_GAME:
      return action.info;
    case UPDATE_HINT:
      return {...state, hintsLeft: state.hintsLeft - 1};
    case UPDATE_VISIBLE_ITEMS:
      let itemKey = action.info;
      return {
        ...state,
        visibleInRoom: {
          ...state.visibleInRoom,
          [itemKey]: false,
        },
      };
    case ADD_TO_INVENTORY:
      let currInventory = state.inventory;
      currInventory.unshift(action.info);
      return {...state, inventory: currInventory};
    case CHANGE_SELECT_ITEM_IND:
      return {...state, selectedItemIndex: action.info};
    case UPDATE_TIME:
      return {...state, currentTime: action.info};
    case TOGGLE_LIGHT:
      const lightState = state.lightOn;
      return {...state, lightOn: !lightState};
    case SET_CODE:
      return {...state, lockBox: action.code};
    default:
      return state;
  }
};

export default gameReducer;
