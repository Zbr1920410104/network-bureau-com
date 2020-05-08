import React, { useState, useEffect } from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/login.styl';

// 请求
import proxyFetch from '@/util/request';
import { GET_USER_NAME } from '@/constants/api-constants';

// // localStorage
// import { LOCAL_STORAGE } from '@/constants/app-constants';

// import { HOME_INDEX, HOME_PASSWORD } from '@/constants/route-constants';
// import { useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 加密
import md5 from 'md5';

export default Form.create({ name: 'login' })((props) => {
  const { getFieldDecorator } = props.form,
    [user, setUser] = useState(''),
    [name, setName] = useState(''),
    { loginLoading } = useSelector((state) => state.userStore),
    dispatch = useDispatch();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // 处理加密密码
        values.password = md5(values.password);
        // 使用redux-saga
        dispatch(userAction.asyncSetUser(values));
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const userName = await proxyFetch(GET_USER_NAME, { user }, 'GET');
        setName(userName?.name);
        console.log('name=', userName);
      }
    })();
  }, [user]);

  return (
    <Form onSubmit={handleSubmitLogin}>
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [
            {
              required: true,
              message: '请输入账号！',
            },
            {
              message: '账号过长！',
              max: 32,
            },
          ],
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='账号'
            onChange={(e) => {
              setUser(e.target.value);
            }}
            size='large'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }],
        })(
          <Input
            prefix={<Icon type='key' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='密码'
            size='large'
            type='password'
          />
        )}
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='contacts' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='姓名'
          value={name}
          size='large'
        />
      </Form.Item>
      <Form.Item>
        <div className='login-button-box'>
          <Button
            size='large'
            type='primary'
            className='button'
            htmlType='submit'
            loading={loginLoading}
          >
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
