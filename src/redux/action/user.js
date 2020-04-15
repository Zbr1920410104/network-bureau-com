import { createAction } from 'redux-actions';

export default {
  asyncSetUser: createAction('asyncSetUser'),
  setUser: createAction('setUser'),
  setLoginLoading: createAction('setLoginLoading'),
  asyncSetUserByToken: createAction('asyncSetUserByToken'),
  setUserLoading: createAction('setUserLoading'),
  setAddAccount: createAction('setAddAccount'),
  setModifyBasic: createAction('setModifyBasic'),
  setUserUuid: createAction('setUserUuid'),
  setStaffUuid: createAction('setStaffUuid'),
  setChangeProject: createAction('setChangeProject'),
  setStaffProjectUuid: createAction('setStaffProjectUuid'),
};
