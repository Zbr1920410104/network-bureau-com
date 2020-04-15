import { handleActions } from 'redux-actions';

export default handleActions(
  {
    // 保存企业基本信息
    setUser(state, { payload: result }) {
      return {
        ...state,
        uuid: result.uuid,
        phone: result.phone,
        name: result.name,
        role: result.role,
        department: result.department,
        departmentUuid: result.departmentUuid,
        isCancel: result.isCancel,
      };
    },
    // 设置登录loading
    setLoginLoading(state, { payload: result }) {
      return {
        ...state,
        loginLoading: result,
      };
    },
    setUserLoading(state, { payload: result }) {
      return {
        ...state,
        userLoading: result,
      };
    },
    setAddAccount(state, { payload: result }) {
      return {
        ...state,
        addAccount: result,
      };
    },
    setModifyBasic(state, { payload: result }) {
      return {
        ...state,
        modifyBasic: result,
      };
    },
    setUserUuid(state, { payload: result }) {
      return {
        ...state,
        userUuid: result,
      };
    },
    setStaffUuid(state, { payload: result }) {
      return {
        ...state,
        staffUuid: result,
      };
    },
    setChangeProject(state, { payload: result }) {
      return {
        ...state,
        changeProject: result,
      };
    },
    setStaffProjectUuid(state, { payload: result }) {
      return {
        ...state,
        staffProjectUuid: result,
      };
    },
  },
  {
    loginLoading: false,
    userLoading: false,
    addAccount: false,
    modifyBasic: false,
    changeProject: false,
    userUuid: '',
    uuid: '',
    phone: '',
    name: '',
    department: '',
    departmentUuid: '',
    isCancel: '',
    role: 0,
    staffUuid: '',
    staffProjectUuid: '',
  }
);
