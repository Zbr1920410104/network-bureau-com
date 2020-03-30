import React from 'react';

// 样式
import { Form, DatePicker, Button } from 'antd';

export default Form.create({ name: 'staffTimeSet' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
      {/* 权限 */}
      <Form.Item label='权限'>
        <span>科研人员</span>
      </Form.Item>

      {/* 开始 */}
      <Form.Item label='开始日期'>
        {getFieldDecorator('startDate', {
          rules: [{ required: true, message: '请选择开始日期！' }]
        })(<DatePicker placeholder='20XX-XX-XX' />)}
      </Form.Item>

      {/* 截止日期 */}
      <Form.Item label='截止日期'>
        {getFieldDecorator('closingDate', {
          rules: [{ required: true, message: '请选择截止日期！' }]
        })(<DatePicker placeholder='20XX-XX-XX' />)}
      </Form.Item>

      {/* 保存按钮 */}
      <Form.Item wrapperCol={{ offset: 9 }}>
        <Button
          type='primary'
          htmlType='submit'
          className='save-button'
          size='large'
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  );
});
