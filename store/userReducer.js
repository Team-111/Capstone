const initialState = {
  uid: '',
  username: '',
  survived: false,
};

const SET_USER = 'SET_USER';
const USER_SURVIVED = 'USER_SURVIVED';

export const setUser = (uid, username) => ({
  type: SET_USER,
  uid,
  username,
});

export const userSurvived = () => ({
  type: USER_SURVIVED,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, uid: action.uid, username: action.username};
    case USER_SURVIVED:
      return {...state, survived: true};
    default:
      return state;
  }
};

export default reducer;