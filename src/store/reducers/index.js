import { RECIEVE_TODOS, GET_TODOS } from "../actions";
import { combineReducers } from "redux";

const isFetching = (state = false, action) => {
  switch (action.type) {
    case GET_TODOS:
      return true;
    case RECIEVE_TODOS:
      return false;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_TODOS:
      const nextState = { ...state };
      action.response.map(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case RECIEVE_TODOS:
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const todos = combineReducers({
  isFetching,
  allIds,
  byId
});

export const allTodos = state => state.allIds.map(id => state.byId[id]);

export default todos;
