import ApolloClient, { gql } from 'apollo-boost';

//constants
const initialData = {
  fetching: false,
  array: [],
  initialPage: 1,
  pages: 0,
  next: null
};

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
});

const UPDATE_EPISODES_PAGE = 'UPDATE_EPISODES_PAGE';

const GET_EPISODES = 'GET_EPISODES';
const GET_EPISODES_ERR = 'GET_EPISODES_ERR';
const GET_EPISODES_SUCCESS = 'GET_EPISODES_SUCCESS';

const SEARCH_EP = 'SEARCH_EP';
const SEARCH_EP_ERR = 'SEARCH_EP_ERR';
const SEARCH_EP_SUCCESS = 'SEARCH_EP_SUCCESS';

//reducer
const episodesReducer = (state = initialData, action) => {
  switch (action.type) {
    case SEARCH_EP: 
    return { ...state, fetching: true }
    case SEARCH_EP_ERR:
      return { ...state, err: action.payload, fetching: false }
    case SEARCH_EP_SUCCESS:
      return { ...state, array: action.payload, fetching: false, err: null }

    case UPDATE_EPISODES_PAGE:
      return { ...state, pages: action.payload.pages, next: action.payload.next }

    case GET_EPISODES:
      return { ...state, fetching: true }
    case GET_EPISODES_ERR:
      return { ...state, err: action.payload, fetching: false }
    case GET_EPISODES_SUCCESS:
      return { ...state, array: [...state.array, ...action.payload], fetching: false, err: null }
    default:
      return state
  };
};

export default episodesReducer;

//actions
export const getEpisodesAction = value => (dispatch, getState) => {
  const query = gql`
  query ($page: Int){
    episodes(page: $page){
      info{
        pages,
        next
      }
      results{
        id,
        name,
        episode
      }
    }
  }
  `;

  dispatch({ type: GET_EPISODES });

  const { initialPage } = getState().episodes;

  return client.query({ 
    query,
    variables: { page: value || initialPage }
   })
    .then(({ data }) => {
      dispatch({
        type: GET_EPISODES_SUCCESS,
        payload: data.episodes.results
      });
      dispatch({
        type: UPDATE_EPISODES_PAGE,
        payload: data.episodes.info
      })
    })
    .catch(err => {
      dispatch({
        type: GET_EPISODES_ERR,
        payload: err
      });
    });
};

export const searchEpAction = (value, type) => dispatch => {
  
  const query = gql`
    query($value: String) {
      episodes(filter: { ${type}: $value }) {
        info {
          count,
          pages,
          next,
          prev
        }
        results {
          name, 
          id,
          episode
        }
      }
    }
  `;

  dispatch({ type: SEARCH_EP });
  
  return client.query({
    query,
    variables: { value: value }
  })
  .then(({ data }) => {
    dispatch({
      type: SEARCH_EP_SUCCESS,
      payload: data.episodes.results
    });
    dispatch({
      type: UPDATE_EPISODES_PAGE,
      payload: data.episodes.info
    });
  })
  .catch(err => {
    dispatch({
      type: SEARCH_EP_ERR,
      payload: err
    });
  });
};
