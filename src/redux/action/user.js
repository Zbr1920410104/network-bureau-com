import { createAction } from 'redux-actions';

export default {
  asyncSetUser: createAction('asyncSetUser'),
  setUser: createAction('setUser'),
  setLoginLoading: createAction('setLoginLoading'),
  asyncSetUserByToken: createAction('asyncSetUserByToken'),
  setUserLoading: createAction('setUserLoading'),
  setAddAccount: createAction('setAddAccount'),
  setUserUuid: createAction('setUserUuid'),
};
