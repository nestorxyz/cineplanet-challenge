import { call, put, takeLatest } from 'redux-saga/effects';
import { CandyStoreProduct } from '../../mocks';
import { getCandyStoreCollection } from '../../services/candy-store';
import {
  fetchCandyStoreRequest,
  fetchCandyStoreSuccess,
  fetchCandyStoreFailure,
} from '../slices/candystoreSlice';

function* fetchCandyStoreSaga() {
  try {
    const data: CandyStoreProduct[] = yield call(getCandyStoreCollection);

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
