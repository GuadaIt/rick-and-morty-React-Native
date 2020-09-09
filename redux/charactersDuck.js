import ApolloClient, { gql } from 'apollo-boost';
import { array } from 'prop-types';

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

const UPDATE_CHARACTERS_PAGE = 'UPDATE_CHARACTERS_PAGE';

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_ERR = 'GET_CHARACTERS_ERR';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';

const SEARCH_CHAR = 'SEARCH_CHAR';
const SEARCH_CHAR_ERR = 'SEARCH_CHAR_ERR';
const SEARCH_CHAR_SUCCESS = 'SEARCH_CHAR_SUCCESS';

//reducer
const charactersReducer = (state = initialData, action) => {
  switch (action.type) {
    case SEARCH_CHAR:
      return { ...state, fetching: true }
    case SEARCH_CHAR_ERR:
      return { ...state, fetching: false, err: action.payload }
    case SEARCH_CHAR_SUCCESS:
      return { ...state, array: action.payload, fetching: false, err: null }

    case UPDATE_CHARACTERS_PAGE:
      return { ...state, pages: action.payload.pages, next: action.payload.next }

    case GET_CHARACTERS:
      return { ...state, fetching: true }
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: [...state.array, ...action.payload], fetching: false }
    case GET_CHARACTERS_ERR:
      return { ...state, fetching: false, err: action.payload }
    default:
      return state
  };
};

export default charactersReducer;

//actions
export const getCharactersAction = value => (dispatch, getState) => {

  const query = gql`
  query ($page: Int){
    characters(page: $page) {
      info{
        pages,
        next
      }
      results{
        id,
        name,
        image
      }
    }
  }`;

  dispatch({ type: GET_CHARACTERS });

  const { initialPage } = getState().characters;

  return client.query({
    query,
    variables: { page: value || initialPage }
  })
    .then(({ data }) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: data.characters.results
      });
      dispatch({
        type: UPDATE_CHARACTERS_PAGE,
        payload: data.characters.info
      })
    })
    .catch(err => {
      dispatch({
        type: GET_CHARACTERS_ERR,
        payload: err
      });

    });
};

export const searchCharAction = (value, type) => dispatch => {

  const query = gql`
  query($value: String) {
    characters(filter: { ${type}: $value }) {
        info {
          count,
          prev,
          next,
          pages
        }
        results {
          name,
          image,
          id
        }
    }
  }`;

  dispatch({ type: SEARCH_CHAR });

  return client.query({
    query,
    variables: { value: value }
  })
    .then(({ data }) => {
      dispatch({
        type: SEARCH_CHAR_SUCCESS,
        payload: data.characters.results
      });
      dispatch({
        type: UPDATE_CHARACTERS_PAGE,
        payload: data.characters.info
      })
    })
    .catch(err => {
      dispatch({
        type: SEARCH_CHAR_ERR,
        payload: err
      });
    })
};