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
        password: result.password,
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
    setModifyPassword(state, { payload: result }) {
      return {
        ...state,
        modifyPassword: result,
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
    setChangePatent(state, { payload: result }) {
      return {
        ...state,
        changePatent: result,
      };
    },
    setStaffPatentUuid(state, { payload: result }) {
      return {
        ...state,
        staffPatentUuid: result,
      };
    },
    setChangeCopyright(state, { payload: result }) {
      return {
        ...state,
        changeCopyright: result,
      };
    },
    setStaffCopyrightUuid(state, { payload: result }) {
      return {
        ...state,
        staffCopyrightUuid: result,
      };
    },
    setChangeAward(state, { payload: result }) {
      return {
        ...state,
        changeAward: result,
      };
    },
    setStaffAwardUuid(state, { payload: result }) {
      return {
        ...state,
        staffAwardUuid: result,
      };
    },
    setChangeThesis(state, { payload: result }) {
      return {
        ...state,
        changeThesis: result,
      };
    },
    setStaffThesisUuid(state, { payload: result }) {
      return {
        ...state,
        staffThesisUuid: result,
      };
    },
    // 统计员核实
    setVerifyBasic(state, { payload: result }) {
      return {
        ...state,
        verifyBasic: result,
      };
    },
    setVerifyProject(state, { payload: result }) {
      return {
        ...state,
        verifyProject: result,
      };
    },
    setVerifyPatent(state, { payload: result }) {
      return {
        ...state,
        verifyPatent: result,
      };
    },
    setVerifyCopyright(state, { payload: result }) {
      return {
        ...state,
        verifyCopyright: result,
      };
    },
    setVerifyAward(state, { payload: result }) {
      return {
        ...state,
        verifyAward: result,
      };
    },
    setVerifyThesis(state, { payload: result }) {
      return {
        ...state,
        verifyThesis: result,
      };
    },
  },
  {
    loginLoading: false,
    userLoading: false,
    modifyPassword: false,
    addAccount: false,
    // 普通员工
    modifyBasic: false,
    changeProject: false,
    changePatent: false,
    changeCopyright: false,
    changeAward: false,
    changeThesis: false,
    staffProjectUuid: '',
    staffPatentUuid: '',
    staffCopyrightUuid: '',
    staffAwardUuid: '',
    staffThesisUuid: '',
    // 统计员
    verifyBasic: false,
    verifyProject: false,
    verifyPatent: false,
    verifyCopyright: false,
    verifyAward: false,
    verifyThesis: false,
    userUuid: '',
    uuid: '',
    phone: '',
    name: '',
    department: '',
    departmentUuid: '',
    isCancel: '',
    role: 0,
    password: '',
    staffUuid: '',
  }
);
