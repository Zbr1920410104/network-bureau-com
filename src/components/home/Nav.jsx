import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_DEFAULT_PASSWORD } from '@/constants/api-constants';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// 导航栏数据
import { NAV } from '@/constants/nav-constants';

// 路由
import { HOME_PASSWORD } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// 样式
import { Menu, Icon, Spin, message } from 'antd';

export default (props) => {
  const { role, userLoading, password } = useSelector(
      (state) => state.userStore
    ),
    history = useHistory(),
    [navEnabled, setNavEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const { defaultPassword } = await proxyFetch(
        GET_DEFAULT_PASSWORD,
        {},
        'GET'
      );
      if (password === defaultPassword) {
        setNavEnabled(false);
      } else {
        setNavEnabled(true);
      }
    })();
  }, [password]);

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
          NAV[role].map((oneLevelNav, index) => (
            <Menu.Item
              key={oneLevelNav.key}
              onClick={() => {
                if (index > 1 && !navEnabled) {
                  message.error('请修改初始密码后再进行操作');
                  history.push(HOME_PASSWORD.path);
                }
              }}
            >
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
