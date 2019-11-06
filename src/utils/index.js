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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = () => {
  delay(500).then(() => {
    return fakeDatabase.todos;
  });
};
