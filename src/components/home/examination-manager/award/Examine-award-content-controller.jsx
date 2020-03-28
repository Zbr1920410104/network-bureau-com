import React from 'react';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Descriptions, Input, Form, Button } from 'antd';

export default Form.create({ name: 'awardExamination' })(({ form }) => {
  const { getFieldDecorator } = form,
    { TextArea } = Input;
  return (
    <div className='examine-modal-box'>
      <Descriptions className='description-box' layout='vertical'>
        <Descriptions.Item label='奖项名称'>陈德杯</Descriptions.Item>
        <Descriptions.Item label='奖项类型'>团体</Descriptions.Item>
        <Descriptions.Item label='获奖时间'>2020-03-06</Descriptions.Item>
        <Descriptions.Item label='奖项级别'>一等奖</Descriptions.Item>
        <Descriptions.Item label='颁奖部门'>黑龙江省人民政府</Descriptions.Item>
        <Descriptions.Item label='获奖名单(团体)'>
          钱程、张博荣
        </Descriptions.Item>
      </Descriptions>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='打分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('awardMark', {
            rules: [{ required: true, message: '请输入分数!' }]
          })(<Input placeholder='请输入分数' />)}
        </Form.Item>

        <Form.Item
          label='备注建议'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('awardSuggestion', {
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
