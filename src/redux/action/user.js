import { createAction } from 'redux-actions';

export default {
  asyncSetUser: createAction('asyncSetUser'),
  setUser: createAction('setUser'),
  setLoginLoading: createAction('setLoginLoading'),
  asyncSetUserByToken: createAction('asyncSetUserByToken'),
  setUserLoading: createAction('setUserLoading'),
  setModifyPassword: createAction('setModifyPassword'),
  setAddAccount: createAction('setAddAccount'),
  setModifyBasic: createAction('setModifyBasic'),
  setUserUuid: createAction('setUserUuid'),
  setStaffUuid: createAction('setStaffUuid'),
  // 普通员工填写
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
  // 统计员核实
  setVerifyProject: createAction('setVerifyProject'),
  setVerifyPatent: createAction('setVerifyPatent'),
  setVerifyCopyright: createAction('setVerifyCopyright'),
  setVerifyAward: createAction('setVerifyAward'),
  setVerifyThesis: createAction('setVerifyThesis'),
};
