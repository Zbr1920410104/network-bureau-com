import { createAction } from 'redux-actions';

export default {
  // 企业登录action
  asyncSetEnterprise: createAction('asyncSetEnterprise'),
  setEnterprise: createAction('setEnterprise'),
  setLoginLoading: createAction('setLoginLoading'),
  // 企业创建登记测试action
  asyncCreateEnterpriseRegistration: createAction(
    'asyncCreateEnterpriseRegistration'
  ),
  setCreateEnterpriseRegistrationLoading: createAction(
    'setCreateEnterpriseRegistrationLoading'
  ),
  setEnterpriseRegistrationUuid: createAction('setEnterpriseRegistrationUuid'),
  setSteps: createAction('setSteps'),
  setRegistration: createAction('setRegistration'),
  asyncSetRestration: createAction('asyncSetRestration'),
  setRegistrationLoading: createAction('setRegistrationLoading')
};
