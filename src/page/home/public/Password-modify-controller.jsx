import React from 'react';

// 路由
import {
  HOME_WRITE_WELCOME,
  HOME_REVIEW_LIST,
  HOME_VERIFY_LIST,
} from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// 请求
import proxyFetch from '@/util/request';
import { SAVE_PASSWORD } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 样式
import { Form, Button, Input, Alert } from 'antd';
import '@/style/home/public/password-modify.styl';

export default Form.create({ name: 'password' })(({ form }) => {
  const { role } = useSelector((state) => state.userStore);
  const { getFieldDecorator } = form,
    history = useHistory(),
    dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        delete value.confirm;

        const res = await proxyFetch(SAVE_PASSWORD, value);

        if (res) {
          dispatch(userAction.setModifyPassword(true));
          if (role === 15) {
            history.push(HOME_WRITE_WELCOME.path);
          } else if (role === 10) {
            history.push(HOME_VERIFY_LIST.path);
          } else if (role === 5) {
            history.push(HOME_REVIEW_LIST.path);
          }
        }
      }
    });
  };

  return (
    <div className='password-modify-box'>
      <p className='title-box'>
        <span>密码修改</span>
      </p>
      <div className='password-modify-content-box'>
        <div className='content-left-box'>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item label='原始密码' hasFeedback>
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入原始密码！',
                  },
                  {
                    pattern: /^\S{6,12}$/,
                    message: '密码需要6-12位',
                  },
                ],
              })(<Input.Password placeholder='请输入原始密码' />)}
            </Form.Item>
            <Form.Item label='新密码' hasFeedback>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码！',
                  },
                  {
                    pattern: /^\S{6,12}$/,
                    message: '密码需要6-12位',
                  },
                ],
              })(<Input.Password placeholder='请输入新密码' />)}
            </Form.Item>
            <Form.Item label='确认新密码' hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请再次输入新密码！',
                  },
                  {
                    pattern: /^\S{6,12}$/,
                    message: '密码需要6-12位',
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (
                        value &&
                        value !== form.getFieldValue('newPassword')
                      ) {
                        callback('新密码和确认密码要一致！');
                      } else {
                        callback();
                      }
                    },
                  },
                ],
              })(<Input.Password placeholder='请再次输入新密码' />)}
            </Form.Item>

            {/* 保存按钮 */}
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button
                type='primary'
                htmlType='submit'
                className='button'
                size='large'
                onClick={handleSave}
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='content-right-box'>
          <Alert
            message='密码修改注意事项'
            description='用户首次登陆时,为保证账户安全使用,须修改原始密码,方可开始填写,如忘记密码,可联系超级管理员重置为初始密码'
            type='info'
            showIcon
          />
        </div>
      </div>
    </div>
  );
});
