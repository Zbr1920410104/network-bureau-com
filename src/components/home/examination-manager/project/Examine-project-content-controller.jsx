import React from 'react';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Descriptions, Input, Form, Button } from 'antd';

export default Form.create({ name: 'projectExamination' })(({ form }) => {
  const { getFieldDecorator } = form,
    { TextArea } = Input;
  return (
    <div className='examine-modal-box'>
      <Descriptions className='description-box' layout='vertical'>
        <Descriptions.Item label='项目类型'>主持项目</Descriptions.Item>
        <Descriptions.Item label='项目名称'>软件测试1</Descriptions.Item>
        <Descriptions.Item label='项目起止时间'>
          2020-03-04~202003-20
        </Descriptions.Item>
        <Descriptions.Item label='项目编号'>101010101</Descriptions.Item>
        <Descriptions.Item label='项目来源'>网信办</Descriptions.Item>
        <Descriptions.Item label='项目经费(万元)'>23</Descriptions.Item>
        <Descriptions.Item label='主要研究内容'>js开发</Descriptions.Item>
        <Descriptions.Item label='参与者名单'>钱程、张博荣</Descriptions.Item>
      </Descriptions>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='打分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('projectMark', {
            rules: [{ required: true, message: '请输入分数!' }]
          })(<Input placeholder='请输入分数' />)}
        </Form.Item>

        <Form.Item
          label='备注建议'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('projectSuggestion', {
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
