import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from "../actions/actions";
import api from './api';

export function* fetchData(action: any) {
    const { pageNumber, gameType } = action.payload;
   try {
       const data = yield api(pageNumber, gameType);
       yield put({type: FETCH_SUCCESS, payload: data});
   } catch (e) {
       yield put({type: FETCH_ERROR, payload: e.message});
   }
}

function* mySaga() {
   yield takeEvery(FETCH_REQUEST, fetchData);
}
export default mySaga;