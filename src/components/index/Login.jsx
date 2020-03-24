import React from 'react';

// 样式
import { Icon, Input, Form, Button } from 'antd';
import '@/style/login.styl';

import {
  HOME_WRITE_WELCOME,
  HOME_EXAMINATION_LIST,
  HOME_MODIFY_LIST
} from '@/constants/route-constants';
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
      if (value.phone === '15998133472') {
        history.push(`${HOME_EXAMINATION_LIST.path}`);
      } else if (value.phone === '18351923820') {
        history.push(`${HOME_MODIFY_LIST.path}`);
      } else {
        history.push(`${HOME_WRITE_WELCOME.path}`);
      }
    });
  };

  return (
    <Form onSubmit={handleSumbitSave}>
      <Form.Item>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: '请输入联系电话！'
            },
            {
              message: '联系电话过长！',
              max: 32
            },
            {
              pattern: /^(\d)(\d|-){4,20}$/,
              message: '请输入正确的联系电话(手机号)'
            }
          ]
        })(
          <Input
            prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='联系电话'
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
