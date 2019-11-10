import { v4 } from "node-uuid";
// fake backend
const fakeDatabase = {
  todos: [
    {
      completed: false,
      text: "hi ho",
      id: v4()
    },
    {
      completed: true,
      text: "this is a todo",
      id: v4()
    },
    {
      completed: false,
      text: "foo",
      id: v4()
    },
    {
      completed: false,
      text: "bar",
      id: v4()
    }
  ]
};

function fetchZen() {
  return fetch("https://api.github.com/zen").then(res => res.text());
}

function createTodo(text) {
  const newTodo = {
    completed: false,
    id: v4(),
    text
  };
  fakeDatabase.todos.push(newTodo);
  return newTodo;
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetchTodos = () => delay(500).then(() => fakeDatabase.todos);
export const addTodo = text => delay(500).then(() => createTodo(text));
export const getZen = () => delay(1000).then(() => fetchZen());
