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
  setChangePatent: createAction('setChangePatent'),
  setStaffPatentUuid: createAction('setStaffPatentUuid'),
  setChangeCopyright: createAction('setChangeCopyright'),
  setStaffCopyrightUuid: createAction('setStaffCopyrightUuid'),
  setChangeAward: createAction('setChangeAward'),
  setStaffAwardUuid: createAction('setStaffAwardUuid'),
  setChangeThesis: createAction('setChangeThesis'),
  setStaffThesisUuid: createAction('setStaffThesisUuid'),
};
