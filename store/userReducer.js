const initialState = {
  uid: '',
  username: '',
};

const SET_USER = 'SET_USER';

export const setUser = (uid, username) => ({
  type: SET_USER,
  uid,
  username,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, uid: action.uid, username: action.username};
    default:
      return state;
  }
};

export default reducer;