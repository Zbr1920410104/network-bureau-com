import React from 'react';

// 样式
import '@/style/home/review-manager/review-detail.styl';
import { Descriptions, Input, Form, Button } from 'antd';

export default Form.create({ name: 'patentReview' })(({ form }) => {
  const { getFieldDecorator } = form,
    { TextArea } = Input;
  return (
    <div className='review-modal-box'>
      <Descriptions className='description-box' layout='vertical'>
        <Descriptions.Item label='专利名称'>软件测试1</Descriptions.Item>
        <Descriptions.Item label='专利类型'>发明</Descriptions.Item>
        <Descriptions.Item label='授权号'>101010101453243</Descriptions.Item>
        <Descriptions.Item label='授权国家和地区'>中国、美国、日本</Descriptions.Item>
      </Descriptions>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='打分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('patentMark', {
            rules: [{ required: true, message: '请输入分数!' }]
          })(<Input placeholder='请输入分数' />)}
        </Form.Item>

        <Form.Item
          label='备注建议'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('patentSuggestion', {
            rules: [{ required: true, message: '请输入备注建议!' }]
          })(<TextArea placeholder='请输入备注建议' />)}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type='primary' className='save-button' size='large'>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
