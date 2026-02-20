import { all } from 'redux-saga/effects';
import { premieresSaga } from './premieresSaga';

export default function* rootSaga() {
  yield all([premieresSaga()]);
}
