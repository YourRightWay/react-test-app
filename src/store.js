import { createStore, applyMiddleware, compose } from 'redux';
import redusers from './reducers';
import thunk from 'redux-thunk';


const defaultStore = {data: []};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  redusers,
  defaultStore,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;