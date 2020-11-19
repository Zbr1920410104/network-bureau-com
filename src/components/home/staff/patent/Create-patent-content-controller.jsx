import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { CREATE_STAFF_PATENT } from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button, DatePicker } from 'antd';
const { Option } = Select,
  { TextArea } = Input;

export default Form.create({ name: 'writePatent' })(({ form }) => {
  const { getFieldDecorator, resetFields } = form,
    { patentRefresh } = useSelector((state) => state.userStore),
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

  useEffect(() => {
    if (patentRefresh) {
      resetFields();
      dispatch(userAction.setPatentRefresh(false));
    }
  }, [patentRefresh, dispatch, resetFields]);

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
          label='专利排位'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('rank', {
            rules: [
              {
                required: true,
                message: '请选择专利排位！',
              },
            ],
          })(
            <Select placeholder='专利排位'>
              <Option value='第一作者'>第一作者</Option>
              <Option value='第二作者'>第二作者</Option>
              <Option value='第三作者'>第三作者</Option>
              <Option value='第四作者'>第四作者</Option>
              <Option value='第五作者'>第五作者</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='专利权人'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('patentee', {
            rules: [
              {
                required: true,
                message: '请输入专利权人！',
              },
              {
                message: '专利权人过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入专利权人' />)}
        </Form.Item>

        <Form.Item
          label='专利公告日'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('patentTime', {
            rules: [{ required: true, message: '请选择专利公告日！' }],
          })(<DatePicker placeholder='20XX-XX-XX' />)}
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

        <Form.Item
          label='发明人（设计人）'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('inventor', {
            rules: [
              {
                required: true,
                message: '请输入发明人（设计人）！',
              },
              {
                message: '发明人（设计人）过长！',
                max: 100,
              },
            ],
          })(<TextArea rows={4} placeholder='发明人（设计人）' />)}
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
