import React from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/login.styl';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

import { HOME_INDEX, HOME_PASSWORD } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

export default Form.create({ name: 'login' })(({ form }) => {
  const { getFieldDecorator } = form,
    history = useHistory();

  /**
   * 提交事件
   */
  const handleSumbitSave = e => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      console.log(value);
      if (value.userName === 'admin' && value.password === '123456') {
        history.push(`${HOME_INDEX.path}`);
        localStorage.setItem(`${LOCAL_STORAGE}-token`, 'admin');
      } else if (value.userName === 'yuangong' && value.password === '123456') {
        history.push(`${HOME_PASSWORD.path}`);
        localStorage.setItem(`${LOCAL_STORAGE}-token`, 'staff');
      } else if (value.userName === 'tongji' && value.password === '123456') {
        history.push(`${HOME_INDEX.path}`);
        localStorage.setItem(`${LOCAL_STORAGE}-token`, 'businessManager');
      } else if (value.userName === 'pingshen' && value.password === '123456') {
        history.push(`${HOME_INDEX.path}`);
        localStorage.setItem(`${LOCAL_STORAGE}-token`, 'examinationManager');
      }
    });
  };

  return (
    <Form onSubmit={handleSumbitSave}>
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [
            {
              required: true,
              message: '请输入账号！'
            },
            {
              message: '账号过长！',
              max: 32
            }
          ]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='账号'
            size='large'
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }]
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
        <div className='login-button-box'>
          <Button
            size='large'
            type='primary'
            className='button'
            htmlType='submit'
            onSubmit={handleSumbitSave}
          >
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
