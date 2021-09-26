import { registerAC } from '../../actions/userAC';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SAGA_REGISTER } from '../../types/types';

function registerFetch(action) {
  return fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(action.payload),
  }).then((response) => {
    if (response.status === 200) return response.json();
    return {};
  });
}

function* registerWorker(action) {
  try {
    const userFromServer = yield call(registerFetch, action);
    yield put(registerAC(userFromServer));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* registerWatcher() {
  yield takeEvery(SAGA_REGISTER, registerWorker);
}

export default registerWatcher;
