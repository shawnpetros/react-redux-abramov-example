import { v4 } from "node-uuid";
// fake backend
const seedData = [
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
];

const readFromLocalStorage = () =>
  JSON.parse(window.localStorage.getItem("todos"));

const writeToLocalStorage = db =>
  window.localStorage.setItem("todos", JSON.stringify(db));

const fetchZen = () =>
  fetch("https://api.github.com/zen").then(res => res.text());

const createTodo = text => {
  const newTodo = {
    completed: false,
    id: v4(),
    text
  };
  const todos = readFromLocalStorage();
  todos.push(newTodo);
  writeToLocalStorage(todos);
  return newTodo;
};

export const readOrSeed = () => {
  const content = readFromLocalStorage();
  if (!content) writeToLocalStorage(seedData);
};

export const delay = () => {
  const ms = Math.round(Math.random() * 1500);
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldError = Math.round(Math.random() * 50) > 25;
      if (shouldError) reject(new Error("an api error occured"));
      resolve();
    }, ms)
  );
};
export const fetchTodos = () => {
  console.log("fetchTodos was called");
  return delay().then(readFromLocalStorage);
};
export const addTodo = text => delay().then(() => createTodo(text));
export const getZen = () => delay().then(() => fetchZen());
