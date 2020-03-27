import React from 'react';

// 样式
import { Form, Button, DatePicker } from 'antd';
import '@/style/home/admin/account-time-set.styl';

export default Form.create({ name: 'timeSet' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div className='time-set-box'>
      <p className='title-box'>
        <span>开放时间设置</span>
      </p>
      <div className='time-set-content-box'>
        <Form labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
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
          <Form.Item wrapperCol={{ offset: 9}}>
            <Button
              type='primary'
              htmlType='submit'
              className='button'
              size='large'
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
