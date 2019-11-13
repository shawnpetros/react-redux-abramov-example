import { all, call, put, takeLeading, retry } from "redux-saga/effects";
import {
  recieveTodos,
  getTodos,
  ADD_ZEN,
  ADD_TODO,
  GET_TODOS,
  getTodosFailed
} from "../actions";
import * as Api from "../../utils";

// workers
function* fetchAllTodos() {
  try {
    const todos = yield retry(3, 2000, Api.fetchTodos);
    yield put(recieveTodos(todos));
  } catch (e) {
    yield put(getTodosFailed(e));
  }
}

function* addZenTodo() {
  const zen = yield call(Api.getZen);
  yield call(Api.addTodo, zen);
  yield put(getTodos());
}

function* doAdd(action) {
  yield call(Api.addTodo, action.text);
  yield put(getTodos());
}

// watchers
function* watchForZen() {
  yield takeLeading(ADD_ZEN, addZenTodo);
}

function* watchForAdd() {
  yield takeLeading(ADD_TODO, doAdd);
}

function* watchForGet() {
  yield takeLeading(GET_TODOS, fetchAllTodos);
}

export default function* todoRoot() {
  yield all([watchForZen(), watchForAdd(), watchForGet()]);
}
