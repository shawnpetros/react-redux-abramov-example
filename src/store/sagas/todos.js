import { all, call, put, takeLeading } from "redux-saga/effects";
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
    const todos = yield call(Api.fetchTodos);
    yield put(recieveTodos(todos));
  } catch (e) {
    yield put(getTodosFailed(e));
  }
}

function* addZenTodo() {
  try {
    const zen = yield call(Api.getZen);
    yield call(Api.addTodo, zen);
    yield put(getTodos());
  } catch (e) {
    yield put(getTodosFailed(e));
  }
}

function* doAdd(action) {
  try {
    yield call(Api.addTodo, action.text);
    yield put(getTodos());
  } catch (e) {
    yield put(getTodosFailed(e));
  }
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
