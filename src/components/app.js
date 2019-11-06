import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../store/actions";
import TodoList from "./todoList";
import { allTodos } from "../store/reducers";

const App = ({ state, addTodo }) => {
  const [value, setValue] = useState("");
  const handleAdd = () => {
    addTodo(value);
    setValue("");
  };
  const todos = allTodos(state);
  return (
    <div className="App">
      <h1>Redux Todos</h1>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
      />
      <button onClick={handleAdd}>Add Todo</button>
      <TodoList todos={todos} />
    </div>
  );
};

export default connect(
  ({ todos }) => ({ state: todos }),
  { addTodo }
)(App);
