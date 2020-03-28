import React from 'react';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Descriptions, Input, Form, Button } from 'antd';

export default Form.create({ name: 'copyrightExamination' })(({ form }) => {
  const { getFieldDecorator } = form,
    { TextArea } = Input;
  return (
    <div className='examine-modal-box'>
      <Descriptions className='description-box' layout='vertical'>
        <Descriptions.Item label='软件著作权名称'>软件测试1</Descriptions.Item>
        <Descriptions.Item label='权利取得方式'>原始取得</Descriptions.Item>
        <Descriptions.Item label='授权范围'>专有许可</Descriptions.Item>
        <Descriptions.Item label='登记号'>101010101453243</Descriptions.Item>
      </Descriptions>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='打分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('copyrightMark', {
            rules: [{ required: true, message: '请输入分数!' }]
          })(<Input placeholder='请输入分数' />)}
        </Form.Item>

        <Form.Item
          label='备注建议'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('copyrightSuggestion', {
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
