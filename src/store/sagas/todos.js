import { all, call, put, takeLeading } from "redux-saga/effects";
import {
  recieveTodos,
  getTodos,
  ZEN_TODO,
  ADD_TODO,
  GET_TODOS
} from "../actions";
import * as Api from "../../utils";

const { delay } = Api;

// workers
function* helloSaga() {
  yield delay(0);
  console.log("hello sagas!");
}

function* fetchAllTodos() {
  const todos = yield call(Api.fetchTodos);
  yield put(recieveTodos(todos));
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
  yield takeLeading(ZEN_TODO, addZenTodo);
}

function* watchForAdd() {
  yield takeLeading(ADD_TODO, doAdd);
}

function* watchForGet() {
  yield takeLeading(GET_TODOS, fetchAllTodos);
}

export default function* todoRoot() {
  yield all([helloSaga(), watchForZen(), watchForAdd(), watchForGet()]);
}
