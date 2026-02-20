import { all, takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchPremieresRequest,
  fetchPremieresSuccess,
  fetchPremieresFailure,
} from '../slices/premieresSlice';
import { mockGetPremieres, Premiere } from '../../mocks';

function* fetchPremieresSaga() {
  try {
    const data: Premiere[] = yield call(mockGetPremieres);
    yield put(fetchPremieresSuccess(data));
  } catch (error: any) {
    yield put(fetchPremieresFailure(error.message));
  }
}

export function* premieresSaga() {
  yield takeLatest(fetchPremieresRequest.type, fetchPremieresSaga);
}
