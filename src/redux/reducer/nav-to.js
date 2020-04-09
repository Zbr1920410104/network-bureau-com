import { handleActions } from 'redux-actions';

export default handleActions(
  {
    // 设置路径
    setNavTo(state, { payload: result }) {
      return {
        ...state,
        navTo: result
      };
    }
  },
  {
    navTo: undefined
  }
);