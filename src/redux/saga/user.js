// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// actions
import userAction from '@/redux/action/user';
import navToAction from '@/redux/action/nav-to';

// 请求
import proxyFetch from '@/util/request';
import * as APIS from '@/constants/api-constants';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 路由
import {
  HOME_INDEX,
  HOME_PASSWORD,
  HOME_ACCOUNT_LIST,
  HOME_WRITE_WELCOME,
  HOME_VERIFY_LIST,
  HOME_REVIEW_LIST,
  INDEX,
} from '@/constants/route-constants';
import md5 from 'md5';

const effects = {
  asyncSetUser: function* ({ payload }) {
    // loading开始
    yield put(userAction.setLoginLoading(true));
    // 请求登录
    const res = yield call(proxyFetch, APIS.GET_USER_TOKEN, payload, 'GET');
    // loading结束
    yield put(userAction.setLoginLoading(false));

    if (res) {
      // 成功之后将token存到localStorage中并且跳页
      yield put(userAction.setUser(res.userInfo));
      localStorage.clear();
      localStorage.setItem(`${LOCAL_STORAGE}-token`, res.token);

      const roleToNav = (role) => {
        switch (role) {
          case 1:
            if (res.userInfo.password === md5('123456')) {
              return HOME_PASSWORD.path;
            } else {
              return HOME_ACCOUNT_LIST.path;
            }
          case 5:
            if (res.userInfo.password === md5('123456')) {
              return HOME_PASSWORD.path;
            } else {
              return HOME_REVIEW_LIST.path;
            }
          case 10:
            if (res.userInfo.password === md5('123456')) {
              return HOME_PASSWORD.path;
            } else {
              return HOME_VERIFY_LIST.path;
            }
          case 15:
            if (res.userInfo.password === md5('123456')) {
              return HOME_PASSWORD.path;
            } else {
              return HOME_WRITE_WELCOME.path;
            }
          default:
            return HOME_INDEX.path;
        }
      };

      const route = roleToNav(res.userInfo.role);

      yield put(navToAction.setNavTo(route));
    }
    // 不成功不跳
  },
  asyncSetUserByToken: function* () {
    // loading开始
    yield put(userAction.setUserLoading(true));

    // 请求管理员信息
    const res = yield call(proxyFetch, APIS.GET_MY_INFO, {}, 'GET');
    // loading结束
    yield put(userAction.setUserLoading(false));

    if (res) {
      // 成功之后将token存到localStorage中
      yield put(userAction.setUser(res));
    } else {
      yield put(navToAction.setNavTo(INDEX.path));
    }
  },
};

export default function* () {
  yield takeLatest(userAction.asyncSetUser, effects.asyncSetUser);
  yield takeLatest(userAction.asyncSetUserByToken, effects.asyncSetUserByToken);
}
