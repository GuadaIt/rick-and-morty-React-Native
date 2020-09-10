import ApolloClient, { gql } from 'apollo-boost'; 

//constants
let initialData = {
  info: {},
  fetching: false,
  isOpen: false
};

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
});

const HIDE_MODAL = 'HIDE_MODAL';

const GET_MODAL_INFO = 'GET_MODAL_INFO';
const GET_MODAL_INFO_ERR = 'GET_MODAL_INFO_ERR';
const GET_MODAL_INFO_SUCCESS = 'GET_MODAL_INFO_SUCCESS';


//reducer
const itemDetailsReducer = (state = initialData, action) => {
  switch(action.type) {
    case HIDE_MODAL:
      return { info: {}, isOpen: false }

    case GET_MODAL_INFO:
      return { ...state, fetching: true, isOpen: true }
    case GET_MODAL_INFO_ERR:
      return { ...state, err: action.payload, fetching: false, isOpen: false }
    case GET_MODAL_INFO_SUCCESS:
      return { ...state, info: action.payload, fetching: false }     
    default:
      return state
  };
};

export default itemDetailsReducer;

//actions
export const hideItemDetailsAction = () => dispatch => dispatch({ type: HIDE_MODAL });

export const showItemDetailsAction = (id, filter) => dispatch => {

  const entity = filter.toLowerCase();

  let query = ``;
  
  if (entity === 'character') {
    query = gql`query($id: ID!){
      character(id:$id){
         name,
        type,
        gender,
        species,
        image
      }
    }`;
  } else if (entity === 'location') {
    query = gql`query($id: ID!){
      location(id:$id){
         name,
        type,
        dimension,
        residents{
          name,
          image
        }
      }
    }`; 
  } else {
    query = gql`query($id: ID!){
      episode(id:$id){
         name,
        air_date,
        episode,
        characters{
          name,
          image
        }
      }
    }`;
  };  

  dispatch({ type: GET_MODAL_INFO });

  return client.query({
    query,
    variables: { id: id }
  })
  .then(({ data }) => {
    
    if (data[entity].residents) {
      data[entity].residents = data[entity].residents.splice(0, 5);
    } else if (data[entity].characters) {
      data[entity].characters = data[entity].characters.splice(0, 5);
    };

    dispatch({
      type: GET_MODAL_INFO_SUCCESS,
      payload: data[entity]
    });
  })
  .catch(err => {
    dispatch({
      type: GET_MODAL_INFO_ERR,
      payload: err
    });
  })
};