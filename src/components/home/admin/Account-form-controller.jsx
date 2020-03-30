import React from 'react';

import { Input, Form, Select } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'account' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      {/* 账号 */}
      <Form.Item label='账号'>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: '请输入账号(联系电话)！'
            },
            {
              message: '账号(联系电话)过长！',
              max: 32
            },
            {
              pattern: /^(\d)(\d|-){4,20}$/,
              message: '请输入正确的账号(联系电话)'
            }
          ]
        })(<Input placeholder='请输入账号(联系电话)' />)}
      </Form.Item>

      {/* 姓名 */}
      <Form.Item label='姓名'>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入姓名！'
            },
            {
              message: '姓名过长！',
              max: 32
            }
          ]
        })(<Input placeholder='请输入姓名' />)}
      </Form.Item>

      {/* 权限 */}
      <Form.Item label='权限'>
        {getFieldDecorator('authority', {
          rules: [
            {
              required: true,
              message: '请选择权限！'
            }
          ]
        })(
          <Select placeholder='请选择权限'>
            <Option value='staff'>科研人员</Option>
            <Option value='businessManager'>统计管理员</Option>
            <Option value='examinationManager'>评审管理员</Option>
          </Select>
        )}
      </Form.Item>

      {/* 科室 */}
      <Form.Item label='科室'>
        {getFieldDecorator('office', {
          rules: [
            {
              required: true,
              message: '请选择科室！'
            }
          ]
        })(
          <Select placeholder='请选择科室'>
            <Option value='战略研究科'>战略研究科</Option>
            <Option value='信息安全科'>信息安全科</Option>
            <Option value='通信研究科'>通信研究科</Option>
          </Select>
        )}
      </Form.Item>
    </Form>
  );
});
