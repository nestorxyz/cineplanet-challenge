import { all } from 'redux-saga/effects';
import { premieresSaga } from './sagas/premieresSaga';
import candystoreSaga from './sagas/candystoreSaga';

export default function* rootSaga() {
  yield all([premieresSaga(), candystoreSaga()]);
}
