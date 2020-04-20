import React, { useEffect } from 'react';

// redux
import userAction from '@/redux/action/user';
import { useSelector, useDispatch } from 'react-redux';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import PasswordModifyController from '@/page/home/public/Password-modify-controller.jsx';

// 员工
import WriteWelcomeController from '@/page/home/staff/Write-welcome-controller.jsx';
import WriteDetailController from '@/page/home/staff/Write-detail-controller.jsx';

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

// components
import Nav from '@/components/home/Nav.jsx';

// 样式
import '@/style/home/home.styl';
import { Layout, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default (props) => {
  const token = localStorage.getItem(`${LOCAL_STORAGE}-token`);
  // 各个路由控制
  const { uuid, name, role } = useSelector((state) => state.userStore),
    history = useHistory(),
    dispatch = useDispatch();

  // 如果没有token就跳到首页
  useEffect(() => {
    if (!token) {
      history.push(ROUTES.INDEX.path);
    }
  }, [token, history]);

  // 刷新页面会导致uuid消失,需要用token再请求一遍
  useEffect(() => {
    if (!uuid && token) {
      // 由token获取manager信息
      dispatch(userAction.asyncSetUserByToken(token));
    }
  }, [uuid, token, dispatch]);

  const homeIndex = useRouteMatch({
    path: ROUTES.HOME_INDEX.path,
    exact: true,
  });

  // 员工
  const homeWriteWelcome = useRouteMatch({
    path: ROUTES.HOME_WRITE_WELCOME.path,
    exact: true,
  });
  const homeWriteDetail = useRouteMatch({
    path: ROUTES.HOME_WRITE_DETAIL.path,
    exact: true,
  });
  const homePassword = useRouteMatch({
    path: ROUTES.HOME_PASSWORD.path,
    exact: true,
  });

  // 业务员页面
  const homeVerifyList = useRouteMatch({
    path: ROUTES.HOME_VERIFY_LIST.path,
    exact: true,
  });
  const homeVerifyDetail = useRouteMatch({
    path: ROUTES.HOME_VERIFY_DETAIL.path,
    exact: true,
  });

  // 评审员页面
  const homeReviewList = useRouteMatch({
    path: ROUTES.HOME_REVIEW_LIST.path,
    exact: true,
  });
  const homeReviewDetail = useRouteMatch({
    path: ROUTES.HOME_REVIEW_DETAIL.path,
    exact: true,
  });

  // 管理员页面
  const homeAccountList = useRouteMatch({
    path: ROUTES.HOME_ACCOUNT_LIST.path,
    exact: true,
  });
  const homeAccountTime = useRouteMatch({
    path: ROUTES.HOME_ACCOUNT_TIME.path,
    exact: true,
  });
  const homeDepartmentList = useRouteMatch({
    path: ROUTES.HOME_DEPARTMENT_LIST.path,
    exact: true,
  });

  const roleToText = (role) => {
    switch (role) {
      case 1:
        return '超级管理员';
      case 5:
        return '评审员';
      case 10:
        return '统计员';
      case 15:
        return '普通员工';
      default:
        return '未知';
    }
  };

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
  }  else if (homeAccountList) {
    content = <AccountListController />;
  } else if (homeAccountTime) {
    content = <AccountTimeController />;
  } else if (homeDepartmentList) {
    content = <DepartmentListController />;
  }

  return (
    <Layout>
      <Sider className='home-sider'>
        <div className='logo'>
          <Icon type='reconciliation' />
          <span>业务管理系统</span>
        </div>
        <div className='user-info'>
          <span>
            欢迎:{name}({roleToText(role)})
          </span>
        </div>
        <Nav />
      </Sider>
      <Layout className='home-content'>
        <Header className='home-header'>
          <div className='exit-box'>
            <Button
              type='link'
              className='exit-button'
              onClick={() => {
                history.push(ROUTES.INDEX.path);
              }}
            >
              [退出登录]
            </Button>
          </div>
        </Header>
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
