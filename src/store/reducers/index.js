import {
  RECIEVE_TODOS,
  GET_TODOS,
  ADD_TODO,
  ADD_ZEN,
  GET_TODOS_FAILED,
  TOGGLE_TODO
} from "../actions";
import { combineReducers } from "redux";

const isFetching = (state = false, action) => {
  switch (action.type) {
    case GET_TODOS:
    case ADD_TODO:
    case ADD_ZEN:
      return true;
    case RECIEVE_TODOS:
    case GET_TODOS_FAILED:
      return false;
    default:
      return state;
  }
};

const error = (state = "", action) => {
  switch (action.type) {
    case GET_TODOS_FAILED:
      return action.error.message;
    case RECIEVE_TODOS:
      return "";
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_TODOS:
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case TOGGLE_TODO:
      const todo = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...todo,
          completed: !todo.completed
        }
      };
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
  error,
  allIds,
  byId
});

export const allTodos = state => state.allIds.map(id => state.byId[id]);

export default todos;
