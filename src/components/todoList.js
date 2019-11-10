import React from "react";
import "./todoStyles.css";

const TodoList = ({ todos = [], toggleTodo }) => {
  const getClasses = completed => (completed ? "done" : "");
  return todos.length > 0 ? (
    <ul className="list">
      {todos.map(todo => (
        <li
          className={`list-item ${getClasses(todo.completed)}`}
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  ) : null;
};

export default TodoList;
