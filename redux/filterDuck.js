//constants
let initialData = {
  searcher: 'characters'
};

const UPDATE_SEARCH = 'UPDATE_SEARCH';

//reducer
const filterReducer = (state = initialData, action) => {
  switch(action.type) {
    case UPDATE_SEARCH:
      return { ...state, searcher: action.payload }
    default:
      return state
  };
};

export default filterReducer;

//actions
export const filterAction = filter => dispatch => {
  dispatch({
    type: UPDATE_SEARCH,
    payload: filter
  });
};