import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import charactersReducer, { getCharactersAction } from './charactersDuck';
import locationsReducer, { getLocationsAction } from './locationsDuck';
import episodesReducer, { getEpisodesAction } from './episodesDuck';
import filterReducer from './filterDuck';
import modalReducer from './modalDuck';

const rootReducer = combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer,
  locations: locationsReducer,
  filter: filterReducer,
  modal: modalReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  getCharactersAction()(store.dispatch, store.getState);
  getLocationsAction()(store.dispatch, store.getState);
  getEpisodesAction()(store.dispatch, store.getState);

  return store;
};

export default generateStore;