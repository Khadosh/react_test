import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer';

export default function configureStore(preloadedState) {
  const middlewares = applyMiddleware(thunkMiddleware);
  const composedEnhancers = composeWithDevTools(middlewares);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}