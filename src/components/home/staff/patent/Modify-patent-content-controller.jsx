import React from 'react';

// 样式
import { Form, Input } from 'antd';

export default props => {
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='专利名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入专利名称!'
            }
          ]}
        >
          <Input placeholder='专利名称' />
        </Form.Item>

        <Form.Item
          label='专利类型'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入专利类型!'
            }
          ]}
        >
          <Input placeholder='专利类型' />
        </Form.Item>

        <Form.Item
          label='授权国家和地区'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入授权国家和地区!'
            }
          ]}
        >
          <Input placeholder='授权国家和地区' />
        </Form.Item>

        <Form.Item
          label='授权号'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入授权号!'
            }
          ]}
        >
          <Input placeholder='授权号' />
        </Form.Item>
      </Form>
    </div>
  );
};
