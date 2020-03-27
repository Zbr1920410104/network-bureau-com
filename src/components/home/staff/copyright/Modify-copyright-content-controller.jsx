import React from 'react';

// 样式
import { Form, Input, Select } from 'antd';
const { Option } = Select;

export default props => {
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='软件名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入软件名称!'
            }
          ]}
        >
          <Input placeholder='软件名称' />
        </Form.Item>

        <Form.Item
          label='权利取得方式'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入权利取得方式!'
            }
          ]}
        >
          <Select placeholder='权利取得方式'>
            <Option value='原始取得'>原始取得</Option>
            <Option value='继受取得'>继受取得</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='授权范围'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入授权范围!'
            }
          ]}
        >
          <Input placeholder='授权范围' />
        </Form.Item>

        <Form.Item
          label='登记号'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: '请输入登记号!'
            }
          ]}
        >
          <Input placeholder='登记号' />
        </Form.Item>
      </Form>
    </div>
  );
};
