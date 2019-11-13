import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodo, toggleTodo, zenTodo, getTodos } from "../store/actions";
import TodoList from "./todoList";
import { allTodos as selectTodos } from "../store/reducers";

const App = ({ loading, error, todos, add, toggle, zen, get }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    get();
  }, [get]);
  const handleAdd = () => {
    if (value !== "") {
      add(value);
      setValue("");
    } else return;
  };
  return (
    <div style={{ marginTop: 40 }} className="columns">
      <div className="column is-half is-offset-one-quarter">
        <div className="box">
          <div className="container">
            <h1 className="title">Redux Todos</h1>
            {error ? (
              <>
                <div className="notification is-warning">{error}</div>
                <button
                  className={`button is-primary ${loading && "is-loading"}`}
                  onClick={get}
                >
                  Retry
                </button>
              </>
            ) : (
              <>
                <div className="level">
                  <div className="level-left">
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
                          className={`button is-info ${loading &&
                            "is-loading"}`}
                          onClick={handleAdd}
                        >
                          Add Todo
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <button
                      className={`button ${loading && "is-loading"}`}
                      onClick={zen}
                    >
                      Get Zen
                    </button>
                  </div>
                </div>
                <TodoList todos={todos} toggleTodo={toggle} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ todos }) => ({
    loading: todos.isFetching,
    error: todos.error,
    todos: selectTodos(todos)
  }),
  {
    add: addTodo,
    toggle: toggleTodo,
    zen: zenTodo,
    get: getTodos
  }
)(App);
