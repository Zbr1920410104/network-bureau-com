import React, { useState, useEffect } from 'react';

// 样式
import { Form, DatePicker, Button, Skeleton, Switch } from 'antd';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_BUSINESS_MANAGER_TIME,
  SAVE_BUSINESS_MANAGER_TIME,
} from '@/constants/api-constants';

// 组件
import moment from 'moment';
import 'moment/locale/zh-cn';

export default Form.create({ name: 'businessManagerTimeSet' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    [isRefresh, setIsRefresh] = useState(true),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    [getDataLoading, setGetDataLoading] = useState(false);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);
        await proxyFetch(SAVE_BUSINESS_MANAGER_TIME, value);
        setIsRefresh(true);
        setSaveDataLoading(false);
      }
    });
  };

  // 将已有的数据回显
  useEffect(() => {
    setGetDataLoading(true);
    (async () => {
      if (isRefresh) {
        const res = await proxyFetch(SELECT_BUSINESS_MANAGER_TIME, {}, 'GET');
        let businessManagerTime = {};
        // 数据回显
        if (res) {
          // 数据处理
          // 时间处理
          if (res.startTime) {
            businessManagerTime.startTime = moment(res.startTime);
          }

          if (res.endTime) {
            businessManagerTime.endTime = moment(res.endTime);
          }

          businessManagerTime.sysSwitch = res.sysSwitch === 1 ? true : false;
          businessManagerTime.timeSwitch = res.timeSwitch === 1 ? true : false;

          setFieldsValue(businessManagerTime);
        }

        setIsRefresh(false);
      }
    })();

    setGetDataLoading(false);
  }, [isRefresh, setFieldsValue]);

  return (
    <Skeleton loading={getDataLoading}>
      <Form
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        onSubmit={handleSumbitSave}
      >
        {/* 权限 */}
        <Form.Item label='权限'>
          <span>统计管理员</span>
        </Form.Item>

        <Form.Item label='系统开关'>
          {getFieldDecorator('sysSwitch', {
            initialValue: false,
            valuePropName: 'checked',
          })(<Switch />)}
        </Form.Item>

        <Form.Item label='时间设置开关'>
          {getFieldDecorator('timeSwitch', {
            initialValue: false,
            valuePropName: 'checked',
          })(<Switch disabled={!form.getFieldValue('sysSwitch')} />)}
        </Form.Item>

        {/* 开始 */}
        <Form.Item label='开始日期'>
          {getFieldDecorator('startTime', {
            rules: [
              {
                required:
                  form.getFieldValue('timeSwitch') &&
                  form.getFieldValue('sysSwitch'),
                message: '请选择开始日期！',
              },
            ],
          })(
            <DatePicker
              placeholder='20XX-XX-XX'
              showTime
              disabled={
                !form.getFieldValue('timeSwitch') ||
                !form.getFieldValue('sysSwitch')
              }
            />
          )}
        </Form.Item>

        {/* 截止日期 */}
        <Form.Item label='截止日期'>
          {getFieldDecorator('endTime', {
            rules: [
              {
                required:
                  form.getFieldValue('timeSwitch') &&
                  form.getFieldValue('sysSwitch'),
                message: '请选择截止日期！',
              },
            ],
          })(
            <DatePicker
              placeholder='20XX-XX-XX'
              showTime
              disabled={
                !form.getFieldValue('timeSwitch') ||
                !form.getFieldValue('sysSwitch')
              }
            />
          )}
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
    </Skeleton>
  );
});
