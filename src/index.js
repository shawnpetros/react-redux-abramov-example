import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app";
import configureStore from "./store";
import { fetchTodos } from "./utils";
import "./styles.css";

// console.log(fetchTodos());

const store = configureStore();

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
