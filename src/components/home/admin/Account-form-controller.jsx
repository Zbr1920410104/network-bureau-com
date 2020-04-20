import React, { useState, useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { ADD_ACCOUNT, GET_DEPARTMENT } from '@/constants/api-constants';

import { Input, Form, Select, Button } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'account' })(({ form }) => {
  const { getFieldDecorator, resetFields } = form;
  const [saveDataLoading, setSaveDataLoading] = useState(false),
    [depatmentList, setDepatmentList] = useState([]),
    dispatch = useDispatch();

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);
        const res = await proxyFetch(ADD_ACCOUNT, value);
        setSaveDataLoading(false);

        if (res) {
          dispatch(userAction.setAddAccount(true));
          resetFields();
        }
      }
    });
  };

  useEffect(() => {
    (async () => {
      const depatmentList = await proxyFetch(GET_DEPARTMENT, {}, 'GET');

      setDepatmentList(depatmentList);
    })();
  }, []);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onSubmit={handleSumbitSave}
    >
      {/* 账号 */}
      <Form.Item label='账号'>
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
        })(<Input placeholder='请输入账号' />)}
      </Form.Item>

      {/* 联系电话 */}
      <Form.Item label='联系电话'>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: '请输入联系电话！',
            },
            {
              message: '联系电话过长！',
              max: 32,
            },
            {
              pattern: /^(\d)(\d|-){4,20}$/,
              message: '请输入正确的联系电话',
            },
          ],
        })(<Input placeholder='请输入联系电话' />)}
      </Form.Item>

      {/* 姓名 */}
      <Form.Item label='姓名'>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入姓名！',
            },
            {
              message: '姓名过长！',
              max: 32,
            },
          ],
        })(<Input placeholder='请输入姓名' />)}
      </Form.Item>

      {/* 权限 */}
      <Form.Item label='权限'>
        {getFieldDecorator('role', {
          rules: [
            {
              required: true,
              message: '请选择权限！',
            },
          ],
        })(
          <Select placeholder='请选择权限'>
            <Option value={15}>普通员工</Option>
            <Option value={10}>统计管理员</Option>
            <Option value={5}>评审管理员</Option>
            <Option value={1}>超级管理员</Option>
          </Select>
        )}
      </Form.Item>

      {/* 科室 */}
      <Form.Item label='科室'>
        {getFieldDecorator('department', {
          rules: [
            {
              required: true,
              message: '请选择科室！',
            },
          ],
        })(
          <Select placeholder='请选择科室'>
            {depatmentList.map((value) => (
              <Option value={value.name} key={value.name}>
                {value.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>

      {/* 保存按钮 */}
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button
          type='primary'
          htmlType='submit'
          loading={saveDataLoading}
          className='button'
          size='large'
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  );
});
