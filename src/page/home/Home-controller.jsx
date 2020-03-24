import React from 'react';

// 路由
import { useRouteMatch, Link } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import SettingController from '@/page/home/public/Setting-controller.jsx';

// 员工
import WriteWelcomeController from '@/page/home/staff/Write-welcome-controller.jsx';
import WriteDetailController from '@/page/home/staff/Write-detail-controller.jsx';
import WriteCurrentController from '@/page/home/staff/Write-current-controller.jsx';

// 业务员
import ModifyListController from '@/page/home/business-manager/Modify-list-controller.jsx';
import ModifyDetailController from '@/page/home/business-manager/Modify-detail-controller.jsx';

// 评审员
import ExaminationListController from '@/page/home/examination-manager/Examination-list-controller.jsx';
import ExaminationDetailList from '@/page/home/examination-manager/Examination-detail-controller.jsx';

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
  const homeSetting = useRouteMatch({
    path: ROUTES.HOME_SETTING.path,
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

  // 业务员页面
  const homeModifyList = useRouteMatch({
    path: ROUTES.HOME_MODIFY_LIST.path,
    exact: true
  });
  const homeModifyDetail = useRouteMatch({
    path: ROUTES.HOME_MODIFY_DETAIL.path,
    exact: true
  });

  // 评审员页面
  const homeExaminationList = useRouteMatch({
    path: ROUTES.HOME_EXAMINATION_LIST.path,
    exact: true
  });
  const homeExaminationDetail = useRouteMatch({
    path: ROUTES.HOME_EXAMINATION_DETAIL.path,
    exact: true
  });

  let content = null;

  if (homeIndex) {
    // 主首页
    content = <HomeIndexController />;
  } else if (homeSetting) {
    content = <SettingController />;
  } else if (homeWriteWelcome) {
    content = <WriteWelcomeController />;
  } else if (homeWriteDetail) {
    content = <WriteDetailController />;
  } else if (homeModifyList) {
    content = <ModifyListController />;
  } else if (homeModifyDetail) {
    content = <ModifyDetailController />;
  } else if (homeExaminationList) {
    content = <ExaminationListController />;
  } else if (homeExaminationDetail) {
    content = <ExaminationDetailList />;
  } else if (homeWriteCurrent) {
    content = <WriteCurrentController />;
  }

  console.log('localStorageToken=', localStorageToken);
  let text;
  let route = [];
  if (localStorageToken === 'staff') {
    route = [ROUTES.HOME_WRITE_WELCOME.path, ROUTES.HOME_WRITE_CURRENT.path];
    text = ['填写信息', '最新信息'];
  } else if (localStorageToken === 'businessManager') {
    route[0] = ROUTES.HOME_MODIFY_LIST.path;
    text = ['查看人员信息'];
  } else if (localStorageToken === 'examinationManager') {
    route[0] = ROUTES.HOME_EXAMINATION_LIST.path;
    text = ['评审列表'];
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
          <Menu.Item key='3'>
            <Link to={ROUTES.HOME_SETTING.path}>
              <Icon type='setting' />
              <span>个人设置</span>
            </Link>
          </Menu.Item>
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
