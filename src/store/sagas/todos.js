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
export function* fetchAllTodos() {
  try {
    const todos = yield call(Api.fetchTodos);
    yield put(recieveTodos(todos));
  } catch (e) {
    yield put(getTodosFailed(e));
  }
}

export function* addZenTodo() {
  try {
    const zen = yield call(Api.getZen);
    yield call(Api.addTodo, zen);
    yield put(getTodos());
  } catch (e) {
    yield put(getTodosFailed(e));
  }
}

export function* doAdd(action) {
  try {
    yield call(Api.addTodo, action.text);
    yield put(getTodos());
  } catch (e) {
    yield put(getTodosFailed(e));
  }
}

// watchers
export function* watchForZen() {
  yield takeLeading(ADD_ZEN, addZenTodo);
}

export function* watchForAdd() {
  yield takeLeading(ADD_TODO, doAdd);
}

export function* watchForGet() {
  yield takeLeading(GET_TODOS, fetchAllTodos);
}

export default function* todoRoot() {
  yield all([watchForZen(), watchForAdd(), watchForGet()]);
}
