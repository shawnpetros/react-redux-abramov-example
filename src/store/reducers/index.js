import { ADD_TODO, TOGGLE_TODO } from "../actions";
import { combineReducers } from "redux";

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const byId = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  allIds,
  byId
});

export const allTodos = state => state.allIds.map(id => state.byId[id]);

export default todos;
