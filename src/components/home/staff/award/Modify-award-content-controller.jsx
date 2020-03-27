import React from 'react';

// 样式
import { Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'award' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='奖项类型'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardType', {
            rules: [{ required: true, message: '请选择奖项类型' }]
          })(
            <Select placeholder='奖项类型'>
              <Option value='个人'>个人</Option>
              <Option value='团体'>团体</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='奖项名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardName', {
            rules: [{ required: true, message: '请输入奖项名称' }]
          })(<Input placeholder='奖项名称' />)}
        </Form.Item>

        <Form.Item
          label='获奖时间'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardTime', {
            rules: [{ required: true, message: '请输入获奖时间' }]
          })(<DatePicker placeholder='20XX-XX-XX' />)}
        </Form.Item>

        <Form.Item
          label='奖项级别'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardGrade', {
            rules: [{ required: true, message: '请输入奖项级别' }]
          })(<Input placeholder='奖项级别' />)}
        </Form.Item>

        <Form.Item
          label='颁奖部门'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardDepartment', {
            rules: [{ required: true, message: '请输入颁奖部门' }]
          })(<Input placeholder='颁奖部门' />)}
        </Form.Item>

        <Form.Item
          label='获奖名单(团体)'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardNameList', {
            rules: [
              form.getFieldValue('awardType') === '团体'
                ? { required: true, message: '请输入获奖名单(团体)' }
                : {}
            ]
          })(
            <Input
              placeholder='获奖名单(团体)'
              disabled={form.getFieldValue('awardType') === '个人'}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
});
