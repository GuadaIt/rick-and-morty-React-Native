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

const UPDATE_LOCATIONS_PAGE = 'UPDATE_LOCATIONS_PAGE';

const SEARCH_LOCATION = 'SEARCH_LOCATION';
const SEARCH_LOCATION_ERR = 'SEARCH_LOCATION_ERR';
const SEARCH_LOCATION_SUCCESS = 'SEARCH_LOCATION_SUCCESS';

const GET_LOCATIONS = 'GET_LOCATIONS';
const GET_LOCATIONS_ERR = 'GET_LOCATIONS_ERR';
const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';

//reducer
const locationsReducer = (state = initialData, action) => {
  switch (action.type) {
    case SEARCH_LOCATION:
      return { ...state, fetching: true }
    case SEARCH_LOCATION_ERR:
      return { ...state, fetching: false, err: action.payload }
    case SEARCH_LOCATION_SUCCESS:
      return { ...state, array: action.payload, fetching: false, err: null }

    case UPDATE_LOCATIONS_PAGE:
      return { ...state, pages: action.payload.pages, next: action.payload.next }
      
    case GET_LOCATIONS:
      return { ...state, fetching: true }
    case GET_LOCATIONS_ERR:
      return { ...state, err: action.payload, fetching: false }
    case GET_LOCATIONS_SUCCESS:
      return { ...state, array: [...state.array, ...action.payload], fetching: false, err: null }
    default:
      return state
  };
};

export default locationsReducer;

//actions
export const getLocationsAction = value => (dispatch, getState) => {
  const query = gql`
  query ($page: Int){
    locations(page: $page){
      info{
        pages,
        next
      }
      results{
        id,
        name,
        type
      }
    }
  }
  `;

  dispatch({ type: GET_LOCATIONS });

  const { initialPage } = getState().locations;

  return client.query({
    query,
    variables: { page: value || initialPage }
  })
    .then(({ data }) => {
      dispatch({
        type: GET_LOCATIONS_SUCCESS,
        payload: data.locations.results
      });
      dispatch({
        type: UPDATE_LOCATIONS_PAGE,
        payload: data.locations.info
      })
    })
    .catch(err => {
      dispatch({
        type: GET_LOCATIONS_ERR,
        payload: err
      });
    })
};

export const searchLocAction = (value, type) => dispatch => {
  const query = gql`
  query($value: String) {
    locations(filter: { ${type}: $value }) {
        info {
            count,
            pages,
            next,
            prev
        }
        results {
            name,
            id,
            type,
            dimension,
        }
    }
  }`;

  dispatch({ type: SEARCH_LOCATION });

  return client.query({
    query,
    variables: { value: value }
  })
  .then(({ data }) => {
    dispatch({
      type: SEARCH_LOCATION_SUCCESS,
      payload: data.locations.results
    });
    dispatch({
      type: UPDATE_LOCATIONS_PAGE,
      payload: data.locations.info
    });
  })
  .catch(err => {
    dispatch({
      type: SEARCH_LOCATION_ERR,
      payload: err
    });
  })
};