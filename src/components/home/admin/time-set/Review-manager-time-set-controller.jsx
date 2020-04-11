import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REVIEW_MANAGER_TIME,
  SAVE_REVIEW_MANAGER_TIME,
} from '@/constants/api-constants';

// 组件
import moment from 'moment';

// 样式
import { Form, DatePicker, Button } from 'antd';

export default Form.create({ name: 'reviewManagerTimeSet' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);
        await proxyFetch(SAVE_REVIEW_MANAGER_TIME, value);
        setIsNeedRefresh(true);
        setSaveDataLoading(false);
      }
    });
  };

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      let reviewManagerTime = await proxyFetch(
        SELECT_REVIEW_MANAGER_TIME,
        {},
        'GET'
      );
      // 数据回显
      if (reviewManagerTime) {
        // 数据处理
        // 时间处理
        if (reviewManagerTime.startTime) {
          reviewManagerTime.startTime = moment(reviewManagerTime.startTime);
        }

        if (reviewManagerTime.endTime) {
          reviewManagerTime.endTime = moment(reviewManagerTime.endTime);
        }

        setFieldsValue(reviewManagerTime);
      }

      setIsNeedRefresh(false);
    })();
  }, [isNeedRefresh, setFieldsValue]);

  return (
    <Form
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 15 }}
      onSubmit={handleSumbitSave}
    >
      {/* 权限 */}
      <Form.Item label='权限'>
        <span>评审管理员</span>
      </Form.Item>

      {/* 开始 */}
      <Form.Item label='开始日期'>
        {getFieldDecorator('startTime', {
          rules: [{ required: true, message: '请选择开始日期！' }],
        })(<DatePicker placeholder='20XX-XX-XX' />)}
      </Form.Item>

      {/* 截止日期 */}
      <Form.Item label='截止日期'>
        {getFieldDecorator('endTime', {
          rules: [{ required: true, message: '请选择截止日期！' }],
        })(<DatePicker placeholder='20XX-XX-XX' />)}
      </Form.Item>

      {/* 保存按钮 */}
      <Form.Item wrapperCol={{ offset: 9 }}>
        <Button
          type='primary'
          htmlType='submit'
          className='save-button'
          size='large'
          loading={saveDataLoading}
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  );
});
