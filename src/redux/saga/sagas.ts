import { put, takeEvery } from 'redux-saga/effects'
import { FETCH_ERROR, FETCH_REQUEST, FETCH_SUCCESS } from "../actions/actions";


const api = async (pageNumber: number, gameType:string ) => {
        const peopleResult = await fetch(`https://swapi.co/api/${gameType}/?page=${pageNumber}`, {method: 'GET'});
        const peopleReponse = await peopleResult.json();
        return peopleReponse;
}

function* fetchData(action: any) {
    const { pageNumber, gameType } = action.payload;
   try {
       const data = yield api(pageNumber, gameType);
       yield put({type: FETCH_SUCCESS, payload: data});
   } catch (e) {
       yield put({type: FETCH_ERROR, payload: e.message});
   }
}

export function* mySaga() {
   yield takeEvery(FETCH_REQUEST, fetchData);
}
export default mySaga;