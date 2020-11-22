import * as ROUTE from '@/constants/route-constants';
import { AUTHORITY } from '@/constants/auth-constants';

export const NAV = {
  /* 超级管理员 */
  [AUTHORITY.ADMIN.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'message',
      name: '消息通知',
    },
    // {
    //   key: 'password',
    //   path: ROUTE.HOME_PASSWORD.path,
    //   name: '修改密码',
    //   icon: 'key',
    // },
    {
      key: 'accountManage',
      path: ROUTE.HOME_ACCOUNT_LIST.path,
      name: '账号管理',
      icon: 'solution',
    },
    {
      key: 'addAppartment',
      path: ROUTE.HOME_DEPARTMENT_LIST.path,
      icon: 'apartment',
      name: '科室管理',
    },
    {
      key: 'timeSetting',
      path: ROUTE.HOME_ACCOUNT_TIME.path,
      name: '开放时间设置',
      icon: 'setting',
    },
  ],
  /* 评审员 */
  [AUTHORITY.REVIEW_MANAGER.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'message',
      name: '消息通知',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'key',
    },
    {
      key: 'reviewList',
      path: ROUTE.HOME_REVIEW_LIST.path,
      name: '评分',
      icon: 'audit',
    },
  ],
  /* 统计员 */
  [AUTHORITY.BUSINESS_MANAGER.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'message',
      name: '消息通知',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'key',
    },
    {
      key: 'businessVerify',
      path: ROUTE.HOME_VERIFY_LIST.path,
      name: '评审',
      icon: 'audit',
    },
  ],
  /* 普通员工 */
  [AUTHORITY.STAFF.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'message',
      name: '消息通知',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'key',
    },
    {
      key: 'write',
      path: ROUTE.HOME_WRITE_WELCOME.path,
      name: '填写信息',
      icon: 'audit',
    },
  ],
};
