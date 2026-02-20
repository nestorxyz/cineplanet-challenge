import { call, put, takeLatest } from 'redux-saga/effects';
import { mockGetCandyStore, CandyStoreProduct } from '../../mocks';
import {
  fetchCandyStoreRequest,
  fetchCandyStoreSuccess,
  fetchCandyStoreFailure,
} from '../slices/candystoreSlice';

function* fetchCandyStoreSaga() {
  try {
    const data: CandyStoreProduct[] = yield call(mockGetCandyStore);
    yield put(fetchCandyStoreSuccess(data));
  } catch (error: unknown) {
    yield put(
      fetchCandyStoreFailure(
        error instanceof Error ? error.message : 'Error fetching candystore',
      ),
    );
  }
}

export default function* candystoreSaga() {
  yield takeLatest(fetchCandyStoreRequest.type, fetchCandyStoreSaga);
}
