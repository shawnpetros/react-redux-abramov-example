import { v4 } from "node-uuid";

export const ADD_TODO = "ADD_TODO";
export const ADD_ZEN = "ADD_ZEN";
export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_FAILED = "GET_TODOS_FAILED";
export const RECIEVE_TODOS = "RECIEVE_TODOS";
export const TOGGLE_TODO = "TOGGLE_TODO";

export const getTodosFailed = e => ({
  type: GET_TODOS_FAILED,
  error: e
});

export const getTodos = () => ({
  type: GET_TODOS
});

export const recieveTodos = response => ({
  type: RECIEVE_TODOS,
  response
});

export const zenTodo = () => ({
  type: ADD_ZEN
});

export const addTodo = text => ({
  type: ADD_TODO,
  id: v4(),
  text
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
