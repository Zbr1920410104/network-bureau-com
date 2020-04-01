import React from 'react';

// 样式
import { Form, Input, Select } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'accountModify' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='姓名'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入姓名' }]
          })(<Input placeholder='姓名' />)}
        </Form.Item>

        <Form.Item
          label='账号'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入账号' }]
          })(<Input placeholder='账号' disabled />)}
        </Form.Item>

        {/* 权限 */}
        <Form.Item
          label='权限'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('authority', {
            rules: [
              {
                required: true,
                message: '请选择权限！'
              }
            ]
          })(
            <Select placeholder='请选择权限' disabled>
              <Option value='staff'>科研人员</Option>
              <Option value='businessManager'>统计管理员</Option>
              <Option value='reviewManager'>评审管理员</Option>
            </Select>
          )}
        </Form.Item>

        {/* 科室 */}
        <Form.Item
          label='科室'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
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

        <Form.Item
          label='电话号码'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入电话号码' }]
          })(<Input placeholder='电话号码' />)}
        </Form.Item>
      </Form>
    </div>
  );
});
