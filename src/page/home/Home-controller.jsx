import React from 'react';

// 路由
import { useRouteMatch, Link } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import PasswordModifyController from '@/page/home/public/Password-modify-controller.jsx';

// 员工
import WriteWelcomeController from '@/page/home/staff/Write-welcome-controller.jsx';
import WriteDetailController from '@/page/home/staff/Write-detail-controller.jsx';
import WriteCurrentController from '@/page/home/staff/Write-current-controller.jsx';

// 业务员
import VerifyListController from '@/page/home/business-manager/Verify-list-controller.jsx';
import VerifyDetailController from '@/page/home/business-manager/Verify-detail-controller.jsx';

// 评审员
import ReviewListController from '@/page/home/review-manager/Review-list-controller.jsx';
import ReviewDetailListController from '@/page/home/review-manager/Review-detail-controller.jsx';

// 管理员
import AccountListController from '@/page/home/admin/Account-list-controller.jsx';
import AccountTimeController from '@/page/home/admin/Account-time-controller.jsx';
import DepartmentListController from '@/page/home/admin/Department-list-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 样式
import '@/style/home/home.styl';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default props => {
  const localStorageToken = localStorage.getItem(`${LOCAL_STORAGE}-token`);
  // 各个路由控制
  const homeIndex = useRouteMatch({
    path: ROUTES.HOME_INDEX.path,
    exact: true
  });

  // 员工
  const homeWriteWelcome = useRouteMatch({
    path: ROUTES.HOME_WRITE_WELCOME.path,
    exact: true
  });
  const homeWriteDetail = useRouteMatch({
    path: ROUTES.HOME_WRITE_DETAIL.path,
    exact: true
  });
  const homeWriteCurrent = useRouteMatch({
    path: ROUTES.HOME_WRITE_CURRENT.path,
    exact: true
  });
  const homePassword = useRouteMatch({
    path: ROUTES.HOME_PASSWORD.path,
    exact: true
  });

  // 业务员页面
  const homeVerifyList = useRouteMatch({
    path: ROUTES.HOME_VERIFY_LIST.path,
    exact: true
  });
  const homeVerifyDetail = useRouteMatch({
    path: ROUTES.HOME_VERIFY_DETAIL.path,
    exact: true
  });

  // 评审员页面
  const homeReviewList = useRouteMatch({
    path: ROUTES.HOME_REVIEW_LIST.path,
    exact: true
  });
  const homeReviewDetail = useRouteMatch({
    path: ROUTES.HOME_REVIEW_DETAIL.path,
    exact: true
  });

  // 管理员页面
  const homeAccountList = useRouteMatch({
    path: ROUTES.HOME_ACCOUNT_LIST.path,
    exact: true
  });
  const homeAccountTime = useRouteMatch({
    path: ROUTES.HOME_ACCOUNT_TIME.path,
    exact: true
  });
  const homeDepartmentList = useRouteMatch({
    path: ROUTES.HOME_DEPARTMENT_LIST.path,
    exact: true
  });

  let content = null;

  if (homeIndex) {
    // 主首页
    content = <HomeIndexController />;
  } else if (homePassword) {
    content = <PasswordModifyController />;
  } else if (homeWriteWelcome) {
    content = <WriteWelcomeController />;
  } else if (homeWriteDetail) {
    content = <WriteDetailController />;
  } else if (homeVerifyList) {
    content = <VerifyListController />;
  } else if (homeVerifyDetail) {
    content = <VerifyDetailController />;
  } else if (homeReviewList) {
    content = <ReviewListController />;
  } else if (homeReviewDetail) {
    content = <ReviewDetailListController />;
  } else if (homeWriteCurrent) {
    content = <WriteCurrentController />;
  } else if (homeAccountList) {
    content = <AccountListController />;
  } else if (homeAccountTime) {
    content = <AccountTimeController />;
  } else if (homeDepartmentList) {
    content = <DepartmentListController />;
  }

  console.log('localStorageToken=', localStorageToken);
  let text;
  let route = [];
  if (localStorageToken === 'staff') {
    route = [ROUTES.HOME_PASSWORD.path, ROUTES.HOME_WRITE_WELCOME.path];
    text = ['修改密码', '填写信息'];
  } else if (localStorageToken === 'businessManager') {
    route = [ROUTES.HOME_PASSWORD.path, ROUTES.HOME_VERIFY_LIST.path];
    text = ['修改密码', '核实信息'];
  } else if (localStorageToken === 'reviewManager') {
    route = [ROUTES.HOME_PASSWORD.path, ROUTES.HOME_REVIEW_LIST.path];
    text = ['修改密码', '信息打分'];
  } else if (localStorageToken === 'admin') {
    route = [
      ROUTES.HOME_DEPARTMENT_LIST.path,
      ROUTES.HOME_ACCOUNT_LIST.path,
      ROUTES.HOME_ACCOUNT_TIME.path
    ];
    text = ['添加科室', '账号管理列表', '开放填写时间设置'];
  }

  return (
    <Layout>
      <Sider className='home-sider'>
        <div className='logo'>
          <Icon type='reconciliation' />
          <span>业务管理系统</span>
        </div>
        <Menu theme='dark' mode='inline'>
          <Menu.Item key='home'>
            <Link to={ROUTES.HOME_INDEX.path}>
              <Icon type='bank' />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='1'>
            <Link to={route[0]}>
              <Icon type='profile' />
              <span>{text[0]}</span>
            </Link>
          </Menu.Item>
          {route[1] ? (
            <Menu.Item key='2'>
              <Link to={route[1]}>
                <Icon type='profile' />
                <span>{text[1]}</span>
              </Link>
            </Menu.Item>
          ) : null}
          {route[2] ? (
            <Menu.Item key='3'>
              <Link to={route[2]}>
                <Icon type='profile' />
                <span>{text[2]}</span>
              </Link>
            </Menu.Item>
          ) : null}
        </Menu>
      </Sider>
      <Layout className='home-content'>
        <Header className='home-header' />
        <Content className='content-box'>
          <div className='content-inner-box'>{content}</div>
        </Content>
        <Footer className='home-footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
