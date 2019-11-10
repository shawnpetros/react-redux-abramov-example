import { all, call, spawn } from "redux-saga/effects";
import * as sagasObj from ".";

function objValAsArray(obj) {
  return Object.keys(obj).map(k => obj[k]);
}

export default function* rootSaga() {
  const sagas = objValAsArray(sagasObj);

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
