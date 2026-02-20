import { all } from 'redux-saga/effects';
import { premieresSaga } from './sagas/premieresSaga';

export default function* rootSaga() {
  yield all([premieresSaga()]);
}
