import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// 导航栏数据
import { NAV } from '@/constants/nav-constants';

// 样式
import { Menu, Icon, Spin } from 'antd';

export default (props) => {
  const { role, userLoading } = useSelector((state) => state.userStore);

  // 渲染nav 用 NAV[role];
  // nav loading用userLoading
  return (
    <Spin
      spinning={userLoading}
      indicator={
        <Icon
          type='loading'
          style={{ fontSize: 24, color: '#fff', marginTop: 20 }}
        />
      }
    >
      <Menu theme='dark' mode='inline'>
        {NAV[role] ? (
          NAV[role].map((oneLevelNav) => (
            <Menu.Item key={oneLevelNav.key}>
              <Link to={oneLevelNav.path}>
                <Icon type={oneLevelNav.icon} />
                {oneLevelNav.name}
              </Link>
            </Menu.Item>
          ))
        ) : (
          <div></div>
        )}
      </Menu>
    </Spin>
  );
};
