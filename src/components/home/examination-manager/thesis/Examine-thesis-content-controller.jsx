import React from 'react';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Descriptions, Input, Form, Button } from 'antd';

export default Form.create({ name: 'thesisExamination' })(({ form }) => {
  const { getFieldDecorator } = form,
    { TextArea } = Input;
  return (
    <div className='examine-modal-box'>
      <Descriptions className='description-box' layout='vertical'>
        <Descriptions.Item label='标题'>
          基于VueJs的WEB前端开发研究
        </Descriptions.Item>
        <Descriptions.Item label='类型'>论文</Descriptions.Item>
        <Descriptions.Item label='发表期刊名称'>
          Chinese Science Bulletin
        </Descriptions.Item>
        <Descriptions.Item label='发表期刊时间'>2020-03-06</Descriptions.Item>
        <Descriptions.Item label='期刊级别'>SCI</Descriptions.Item>
        <Descriptions.Item label='论文索引号'>123456</Descriptions.Item>
        <Descriptions.Item label='提交人作者次序'>通讯作者</Descriptions.Item>
        <Descriptions.Item label='第一作者'>翟天临</Descriptions.Item>
      </Descriptions>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='打分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('thesisMark', {
            rules: [{ required: true, message: '请输入分数!' }]
          })(<Input placeholder='请输入分数' />)}
        </Form.Item>

        <Form.Item
          label='备注建议'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('thesisSuggestion', {
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
