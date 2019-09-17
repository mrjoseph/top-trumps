import { combineReducers, createStore, applyMiddleware } from 'redux';
import { gameReducer } from '../reducers/reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../saga/sagas';

const sagaMiddleware = createSagaMiddleware()

const routeReducer = combineReducers({
    gameReducer
  });

export type AppState = ReturnType<typeof routeReducer>

const middleware = [sagaMiddleware];

const store = createStore(routeReducer, applyMiddleware(...middleware));
sagaMiddleware.run(mySaga);  
export default store;
