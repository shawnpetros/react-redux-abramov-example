import { all, call, put, takeLeading } from "redux-saga/effects";
import { addTodo, ZEN_TODO } from "../actions";
import * as Api from "../../utils";

const { delay } = Api;

// workers
function* helloSaga() {
  yield delay(0);
  console.log("hello sagas!");
}

function* addZenTodo() {
  const zen = yield call(Api.getZen);
  yield put(addTodo(zen));
}

// watchers
function* watchForZen() {
  yield takeLeading(ZEN_TODO, addZenTodo);
}

export default function* todoRoot() {
  yield all([helloSaga(), watchForZen()]);
}
