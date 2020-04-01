export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '', name: '首页' };
// export const LOGIN = { path: '/login', name: '登录页' };
// export const REGISTER = { path: '/register', name: '注册页' };
export const HOME = { path: '/home', name: '主页' };

// 二级路由
export const HOME_INDEX = { path: '/home/index', name: '主首页' };
export const HOME_PASSWORD = { path: '/home/password', name: '密码修改页面' };

// 员工填写页面
export const HOME_WRITE_WELCOME = {
  path: '/home/write/welcome',
  name: '员工填写欢迎页'
};
export const HOME_WRITE_DETAIL = {
  path: '/home/write/detail',
  name: '员工填写详情页'
};
export const HOME_WRITE_CURRENT = {
  path: '/home/write/current',
  name: '员工填写详情页'
};

// 业务员页面
export const HOME_VERIFY_LIST = {
  path: '/home/verify/list',
  name: '业务员列表页面'
};
export const HOME_VERIFY_DETAIL = {
  path: '/home/verify/detail',
  name: '业务员修改详情面'
};

// 评审员页面
export const HOME_REVIEW_LIST = {
  path: '/home/review/list',
  name: '评审员列表页面'
};
export const HOME_REVIEW_DETAIL = {
  path: '/home/review/detail',
  name: '评审员核实详情页'
};

// 管理员页面
export const HOME_ACCOUNT_LIST = {
  path: '/home/account/list',
  name: '管理员账号管理列表页面'
};
export const HOME_ACCOUNT_TIME = {
  path: '/home/account/time',
  name: '管理员账号时间填写设置页面'
};
export const HOME_DEPARTMENT_LIST = {
  path: '/home/department/add',
  name: '管理员科室管理页面'
}