import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, zenTodo } from "../store/actions";
import TodoList from "./todoList";
import { allTodos as selectTodos } from "../store/reducers";

const App = ({ todosState, add, toggle, zen }) => {
  const [value, setValue] = useState("");
  const handleAdd = () => {
    add(value);
    setValue("");
  };
  const todos = selectTodos(todosState);
  return (
    <div style={{ marginTop: 40 }} className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="container">
          <h1 className="title">Redux Todos</h1>
          <button className="button is-text has-margin-2" onClick={zen}>
            Get Zen
          </button>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
                type="text"
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={handleAdd}>
                Add Todo
              </button>
            </div>
          </div>
          <TodoList todos={todos} toggleTodo={toggle} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ todos }) => ({ todosState: todos }),
  { add: addTodo, toggle: toggleTodo, zen: zenTodo }
)(App);
