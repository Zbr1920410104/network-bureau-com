import React from 'react';

// 样式
import { Form, Input, DatePicker, Select } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'thesis' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='类型'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisType', {
            rules: [{ required: true, message: '请选择类型!' }]
          })(
            <Select placeholder='类型'>
              <Option value={1}>论文</Option>
              <Option value={2}>专著</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='标题'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisTitle', {
            rules: [{ required: true, message: '请输入标题!' }]
          })(<Input placeholder='请输入标题' />)}
        </Form.Item>

        <Form.Item
          label='发表期刊名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisJournal', {
            rules: [
              form.getFieldValue('thesisType') === 1
                ? { required: true, message: '请输入发表期刊名称' }
                : {}
            ]
          })(<Input placeholder='发表期刊名称' />)}
        </Form.Item>

        <Form.Item
          label='发表期刊时间'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisTime', {
            rules: [{ required: true, message: '请输入发表期刊时间' }]
          })(<DatePicker placeholder='20XX-XX-XX' />)}
        </Form.Item>

        <Form.Item
          label='期刊级别'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisGrade', {
            rules: [
              form.getFieldValue('thesisType') === 1
                ? { required: true, message: '请输入期刊级别' }
                : {}
            ]
          })(<Input placeholder='期刊级别' />)}
        </Form.Item>

        <Form.Item
          label='论文索引号'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisCode', {
            rules: [
              form.getFieldValue('thesisType') === 1
                ? { required: true, message: '请输入论文索引号' }
                : {}
            ]
          })(<Input placeholder='论文索引号' />)}
        </Form.Item>

        <Form.Item
          label='提交人作者次序'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisAuthorSequence', {
            rules: [{ required: true, message: '请输入提交人作者次序' }]
          })(<Input placeholder='提交人作者次序' />)}
        </Form.Item>

        <Form.Item
          label='第一作者'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisFirstAuthor', {
            rules: [{ required: true, message: '请输入第一作者' }]
          })(<Input placeholder='第一作者' />)}
        </Form.Item>
      </Form>
    </div>
  );
});
