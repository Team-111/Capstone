import {
  getSingleGame,
  updateGame,
  initializeGameObj,
} from '../server/api/games';

// Initial State
const initialState = {
  hintsLeft: 3,
  hints: {},
  currentTime: {min: 0, sec: 0},
  visibleInRoom: {
    key: true,
    desk: true,
    spoon: true,
    skull: true,
    grenade: true,
  },
  inventory: ['empty'],
  selectedItemIndex: 0,
  levelName: 'spookyCabin',
  lockCombo: '0000',
  puzzles: {
    colorBlock: {
      location: 'west',
      complete: false,
    },
    slidingPuzzle: {
      location: 'north',
      complete: false,
    },
    palindrome: {
      location: 'east',
      complete: false,
    },
    combo: {
      location: 'door',
      complete: false,
    },
  },
  legsBound: true,
  isLoaded: false,
};

// Action Types
const GOT_GAME = 'GOT_GAME';
const UPDATE_HINT = 'UPDATE_HINT';
const UPDATE_TIME = 'UPDATE_TIME';
const UPDATE_VISIBLE_ITEMS = 'UPDATE_VISIBLE_ITEMS';
const ADD_TO_INVENTORY = 'ADD_TO_INVENTORY';
const CHANGE_SELECT_ITEM_IND = 'CHANGE_SELECT_ITEM_IND';
const TOGGLE_LIGHT = 'TOGGLE_LIGHT';
const SET_CODE = 'SET_CODE';
const UPDATE_PUZZLE = 'UPDATE_PUZZLE';
const TOGGLE_CHAINS = 'TOGGLE_CHAINS';

// Action Creator
const gotGame = info => {
  return {
    type: GOT_GAME,
    info,
  };
};

export const useHint = hints => {
  return {
    type: UPDATE_HINT,
    hints,
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
  };
};

export const toggleLight = () => ({
  type: TOGGLE_LIGHT,
});

export const updatePuzzleStatus = puzzle => ({
  type: UPDATE_PUZZLE,
  puzzle,
});

export const toggleChains = () => ({
  type: TOGGLE_CHAINS,
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

export const toggleChainsThunk = () => {
  return dispatch => {
    dispatch(toggleChains());
  };
};

export const saveGameThunk = (userId, updatedGame) => {
  return async dispatch => {
    try {
      if (!Object.keys(updatedGame).length) updatedGame = initializeGameObj();

      let data = {};
      await updateGame(userId, updatedGame);
      await getSingleGame(gameFound => (data = {...gameFound}), userId);
      dispatch(gotGame(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// export const useHintThunk = (userId, hintsLefts, hints) => {
//   return async dispatch => {
//     try {
//       let data = {};
//       await updateHints(userId, hintsLefts, hints);
//       await getSingleGame(gameFound => (data = {...gameFound}), userId);
//       dispatch(useHint(data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }

// score reducer
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_GAME:
      return {...action.info, isLoaded: true};
    case UPDATE_HINT:
      console.log('action in game reducer', action);
      return {
        ...state,
        hintsLeft: state.hintsLeft - 1,
        hints: action.hints,
      };
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
      let currInventory = [...state.inventory];
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
    case UPDATE_PUZZLE:
      const puzzlesCopy = state.puzzles;
      puzzlesCopy[action.puzzle].complete = true;
      return {...state, puzzles: puzzlesCopy};
    case TOGGLE_CHAINS:
      return {...state, legsBound: false};
    default:
      return state;
  }
};

export default gameReducer;
