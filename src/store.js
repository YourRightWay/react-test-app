import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Ошибка в слове
import redusers from './reducers';

const defaultStore = {
  data: {
    items: [],
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  redusers,
  defaultStore,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
