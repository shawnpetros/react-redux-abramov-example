import React from "react";
import { toggleTodo } from "../store/actions";
import { connect } from "react-redux";
import "./todoStyles.css";

const TodoList = ({ todos = [], toggleTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li
          className={todo.completed && "done"}
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
};

export default connect(
  null,
  { toggleTodo }
)(TodoList);
