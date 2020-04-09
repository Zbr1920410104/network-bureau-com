import { createStore, combineReducers, applyMiddleware } from 'redux';
// reducer
import userReducer from '@/redux/reducer/user';
import NavToReducer from '@/redux/reducer/nav-to';

// saga
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import userSaga from '@/redux/saga/user';

const sagaMiddleware = createSagaMiddleware();

// Reducer
const rootReducer = combineReducers({
  userStore: userReducer,
  NavToStore: NavToReducer,
});

const rootSaga = function* () {
  yield all([
    userSaga(),
    // watchIncrementAsync()
  ]);
  // code after all-effect
};

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
