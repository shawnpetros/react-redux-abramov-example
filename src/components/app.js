import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, zenTodo, getTodos } from "../store/actions";
import TodoList from "./todoList";
import { allTodos as selectTodos } from "../store/reducers";

const App = ({ todosState, add, toggle, zen, get }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    get();
  }, []);
  const handleAdd = () => {
    add(value);
    setValue("");
  };
  const loading = todosState.isFetching ? "is-loading" : "";
  const todos = selectTodos(todosState);
  console.log(todos);
  return (
    <div style={{ marginTop: 40 }} className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
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
                <button
                  className={`button is-info ${loading}`}
                  onClick={handleAdd}
                >
                  Add Todo
                </button>
              </div>
            </div>
            <TodoList todos={todos} toggleTodo={toggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ todos }) => ({ todosState: todos }),
  { add: addTodo, toggle: toggleTodo, zen: zenTodo, get: getTodos }
)(App);
