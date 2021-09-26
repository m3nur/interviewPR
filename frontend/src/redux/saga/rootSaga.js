import { all } from "@redux-saga/core/effects";
import loginWatcher from "./user/userLogin";
import registerWatcher from "./user/userRegister";

export default function* rootSaga() {
  yield all([
    registerWatcher(),
    loginWatcher()
  ])
}
