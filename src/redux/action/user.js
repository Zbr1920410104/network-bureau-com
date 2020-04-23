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
  // 评审员打分
  setReviewProject: createAction('setReviewProject'),
  setReviewPatent: createAction('setReviewPatent'),
  setReviewCopyright: createAction('setReviewCopyright'),
  setReviewAward: createAction('setReviewAward'),
  setReviewThesis: createAction('setReviewThesis'),
    // 统计员核实
  setStaffProjectVerifyStatus: createAction('setStaffProjectVerifyStatus'),
  setStaffPatentVerifyStatus: createAction('setStaffPatentVerifyStatus'),
  setStaffCopyrightVerifyStatus: createAction('setStaffCopyrightVerifyStatus'),
  setStaffAwardVerifyStatus: createAction('setStaffAwardVerifyStatus'),
  setStaffThesisVerifyStatus: createAction('setStaffThesisVerifyStatus'),
};
