import { createStore, combineReducers, applyMiddleware } from 'redux';
// reducer
import NavToReducer from '@/redux/reducer/nav-to';

// saga
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

// Reducer
const rootReducer = combineReducers({
  NavToStore: NavToReducer
});

const rootSaga = function*() {
  yield all([
    // watchIncrementAsync()
  ]);
  // code after all-effect
};

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
