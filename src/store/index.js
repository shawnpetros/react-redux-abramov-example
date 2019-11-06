import { createStore, combineReducers } from "redux";
import todoReducer from "./reducers";
const rootReducer = combineReducers({
  todos: todoReducer
});

const configureStore = () => {
  const store = createStore(rootReducer);

  store.subscribe(() => {
    console.log(store.getState());
  });

  return store;
};

export default configureStore;
