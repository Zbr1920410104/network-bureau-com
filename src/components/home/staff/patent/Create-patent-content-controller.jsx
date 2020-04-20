import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { CREATE_STAFF_PATENT } from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'writePatent' })(({ form }) => {
  const { getFieldDecorator, resetFields } = form,
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        const res = await proxyFetch(CREATE_STAFF_PATENT, value);

        setSaveDataLoading(false);

        if (res) {
          resetFields();
          dispatch(userAction.setChangePatent(true));
        }
      }
    });
  };
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='专利名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('patentName', {
            rules: [
              {
                required: true,
                message: '请输入专利名称！',
              },
              {
                message: '专利名称过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入专利名称' />)}
        </Form.Item>

        <Form.Item
          label='专利类型'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('patentType', {
            rules: [
              {
                required: true,
                message: '请选择专利类型！',
              },
            ],
          })(
            <Select placeholder='专利类型'>
              <Option value='发明专利'>发明专利</Option>
              <Option value='实用新型专利'>实用新型专利</Option>
              <Option value='外观设计专利'>外观设计专利</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='授权国家和地区'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('patentNation', {
            rules: [
              {
                required: true,
                message: '请输入授权国家和地区！',
              },
              {
                message: '授权国家和地区过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入授权国家和地区' />)}
        </Form.Item>

        <Form.Item
          label='授权号'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('patentCode', {
            rules: [
              {
                required: true,
                message: '请输入授权号！',
              },
              {
                message: '授权号过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入授权号' />)}
        </Form.Item>

        {/* 保存按钮 */}
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button
            type='primary'
            htmlType='submit'
            className='button'
            size='large'
            onClick={handleSumbitSave}
            loading={saveDataLoading}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
