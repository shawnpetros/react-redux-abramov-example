import { createStore, combineReducers, applyMiddleware } from "redux";
import createSageMiddleware from "redux-saga";
import logger from "./middleware/logger";
import rootSaga from "./sagas/rootSaga";
import todoReducer from "./reducers";
const rootReducer = combineReducers({
  todos: todoReducer
});

const sagaMiddleware = createSageMiddleware();
const configureStore = () => {
  const middlewares = [logger, sagaMiddleware];
  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
