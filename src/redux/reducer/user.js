import { handleActions } from "redux-actions";

export default handleActions(
  {
    // 保存企业基本信息
    setUser(state, { payload: result }) {
      return {
        ...state,
        uuid: result.uuid,
        userName: result.userName,
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
    setDefaultPasswordRefresh(state, { payload: result }) {
      return {
        ...state,
        defaultPasswordRefresh: result,
      };
    },
    setChangeDefaultPassword(state, { payload: result }) {
      return {
        ...state,
        changeDefaultPassword: result,
      };
    },
    setAddAccount(state, { payload: result }) {
      return {
        ...state,
        addAccount: result,
      };
    },
    setAccountRefresh(state, { payload: result }) {
      return {
        ...state,
        accountRefresh: result,
      };
    },
    setModifyBasic(state, { payload: result }) {
      return {
        ...state,
        modifyBasic: result,
      };
    },
    setAccountUuid(state, { payload: result }) {
      return {
        ...state,
        accountUuid: result,
      };
    },
    setStaffUuid(state, { payload: result }) {
      return {
        ...state,
        staffUuid: result,
      };
    },
    setVerifyItem(state, { payload: result }) {
      return {
        ...state,
        verifyItem: result,
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
    setChangeBook(state, { payload: result }) {
      return {
        ...state,
        changeBook: result,
      };
    },
    setStaffBookUuid(state, { payload: result }) {
      return {
        ...state,
        staffBookUuid: result,
      };
    },
    setProjectRefresh(state, { payload: result }) {
      return {
        ...state,
        projectRefresh: result,
      };
    },
    setBasicRefresh(state, { payload: result }) {
      return {
        ...state,
        basicRefresh: result,
      };
    },
    setCopyrightRefresh(state, { payload: result }) {
      return {
        ...state,
        copyrightRefresh: result,
      };
    },
    setPatentRefresh(state, { payload: result }) {
      return {
        ...state,
        patentRefresh: result,
      };
    },
    setAwardRefresh(state, { payload: result }) {
      return {
        ...state,
        awardRefresh: result,
      };
    },
    setThesisRefresh(state, { payload: result }) {
      return {
        ...state,
        thesisRefresh: result,
      };
    },
    setBookRefresh(state, { payload: result }) {
      return {
        ...state,
        bookRefresh: result,
      };
    },
    setMessageRefresh(state, { payload: result }) {
      return {
        ...state,
        messageRefresh: result,
      };
    },
    // 评审员打分
    setReviewProject(state, { payload: result }) {
      return {
        ...state,
        reviewProject: result,
      };
    },
    setReviewPatent(state, { payload: result }) {
      return {
        ...state,
        reviewPatent: result,
      };
    },
    setReviewCopyright(state, { payload: result }) {
      return {
        ...state,
        reviewCopyright: result,
      };
    },
    setReviewAward(state, { payload: result }) {
      return {
        ...state,
        reviewAward: result,
      };
    },
    setReviewThesis(state, { payload: result }) {
      return {
        ...state,
        reviewThesis: result,
      };
    },
    setReviewBook(state, { payload: result }) {
      return {
        ...state,
        reviewBook: result,
      };
    },
    // 统计员核实
    setStaffProjectVerifyStatus(state, { payload: result }) {
      return {
        ...state,
        staffProjectVerifyStatus: result,
      };
    },
    setStaffPatentVerifyStatus(state, { payload: result }) {
      return {
        ...state,
        staffPatentVerifyStatus: result,
      };
    },
    setStaffCopyrightVerifyStatus(state, { payload: result }) {
      return {
        ...state,
        staffCopyrightVerifyStatus: result,
      };
    },
    setStaffThesisVerifyStatus(state, { payload: result }) {
      return {
        ...state,
        staffThesisVerifyStatus: result,
      };
    },
    setStaffAwardVerifyStatus(state, { payload: result }) {
      return {
        ...state,
        staffAwardVerifyStatus: result,
      };
    },
    setStaffBookVerifyStatus(state, { payload: result }) {
      return {
        ...state,
        staffBookVerifyStatus: result,
      };
    },
  },
  {
    loginLoading: false,
    userLoading: false,
    modifyPassword: false,
    addAccount: false,
    accountRefresh: false,
    defaultPasswordRefresh: false,
    changeDefaultPassword: false,
    messageRefresh: false,
    // 普通员工
    modifyBasic: false,
    changeProject: false,
    changePatent: false,
    changeCopyright: false,
    changeAward: false,
    changeThesis: false,
    changeBook: false,
    staffProjectUuid: "",
    staffPatentUuid: "",
    staffCopyrightUuid: "",
    staffAwardUuid: "",
    staffThesisUuid: "",
    staffBookUuid: "",
    projectRefresh: false,
    basicRefresh: false,
    copyrightRefresh: false,
    patentRefresh: false,
    awardRefresh: false,
    thesisRefresh: false,
    // 统计员
    staffProjectVerifyStatus: "",
    staffPatentVerifyStatus: "",
    staffCopyrightVerifyStatus: "",
    staffThesisVerifyStatus: "",
    staffAwardVerifyStatus: "",
    staffBookVerifyStatus: "",
    // 评审员
    reviewProject: false,
    reviewPatent: false,
    reviewCopyright: false,
    reviewAward: false,
    reviewThesis: false,
    reviewBook: false,
    accountUuid: "",
    uuid: "",
    userName: "",
    phone: "",
    name: "",
    department: "",
    departmentUuid: "",
    isCancel: "",
    role: 0,
    password: "",
    staffUuid: "",
    verifyItem: [],
  }
);
