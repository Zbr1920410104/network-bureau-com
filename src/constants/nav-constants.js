import * as ROUTE from '@/constants/route-constants';
import { AUTHORITY } from '@/constants/auth-constants';

export const NAV = {
  /* 超级管理员 */
  [AUTHORITY.ADMIN.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      icon: 'audit',
      name: '首页',
    },
    {
      key: 'addAppartment',
      path: ROUTE.HOME_DEPARTMENT_LIST.path,
      icon: 'audit',
      name: '添加科室',
    },
    {
      key: 'accountManage',
      path: ROUTE.HOME_ACCOUNT_LIST.path,
      name: '账号管理列表',
      icon: 'audit',
    },
    {
      key: 'timeSetting',
      path: ROUTE.HOME_ACCOUNT_TIME.path,
      name: '开放填写时间设置',
      icon: 'audit',
    },
  ],
  /* 评审员 */
  [AUTHORITY.REVIEW_MANAGER.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'file-done',
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
      name: '首页',
      icon: 'bank',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'file-done',
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
      name: '首页',
      icon: 'bank',
    },
    {
      key: 'password',
      path: ROUTE.HOME_PASSWORD.path,
      name: '修改密码',
      icon: 'file-done',
    },
    {
      key: 'write',
      path: ROUTE.HOME_WRITE_WELCOME.path,
      name: '填写信息',
      icon: 'audit',
    },
  ],
};
