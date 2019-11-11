import { v4 } from "node-uuid";

export const ADD_TODO = "ADD_TODO";
export const ZEN_TODO = "ZEN_TODO";
export const GET_TODOS = "GET_TODOS";
export const RECIEVE_TODOS = "RECIEVE_TODOS";
export const TOGGLE_TODO = "TOGGLE_TODO";

export const getTodos = () => ({
  type: GET_TODOS
});

export const recieveTodos = response => ({
  type: RECIEVE_TODOS,
  response
});

export const zenTodo = () => ({
  type: ZEN_TODO
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
