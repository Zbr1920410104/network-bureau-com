import React, { useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { CHANGE_DEFAULT_PASSWORD } from '@/constants/api-constants';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 样式
import { Form, Button, Input, Alert } from 'antd';

export default Form.create({ name: 'defaultPassword' })(({ form }) => {
  const { getFieldDecorator, resetFields } = form,
    { defaultPasswordRefresh } = useSelector((state) => state.userStore),
    dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        delete value.confirm;

        const res = await proxyFetch(CHANGE_DEFAULT_PASSWORD, value);

        if (res) {
          resetFields();
          dispatch(userAction.setChangeDefaultPassword(true));
        }
      }
    });
  };

  useEffect(() => {
    if (defaultPasswordRefresh) {
      resetFields();
      dispatch(userAction.setDefaultPasswordRefresh(false));
    }
  }, [defaultPasswordRefresh, dispatch, resetFields]);

  return (
    <div>
      <div className='content-top-box'>
        <Alert
          message='修改默认密码注意事项'
          description='此功能为保障系统和账号安全设计,超级管理员在修改默认密码后,请点击保存按钮,保存后,所有未修改过密码的账号的默认密码将全部被修改为现在的默认密码,请超级管理员保管好密码,以免遗忘!'
          type='info'
          showIcon
        />
      </div>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <Form.Item label='原密码' hasFeedback>
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: '请输入原密码！',
              },
              {
                pattern: /^\S{6,12}$/,
                message: '密码需要6-12位',
              },
            ],
          })(<Input.Password placeholder='请输入原密码' />)}
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
                  if (value && value !== form.getFieldValue('newPassword')) {
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
  );
});
