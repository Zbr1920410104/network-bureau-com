import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { SELECT_STAFF_TIME, SAVE_STAFF_TIME } from '@/constants/api-constants';

// 组件
import moment from 'moment';

// 样式
import { Form, DatePicker, Button, Skeleton } from 'antd';

export default Form.create({ name: 'staffTimeSet' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
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
        await proxyFetch(SAVE_STAFF_TIME, value);
        setIsNeedRefresh(true);
        setSaveDataLoading(false);
      }
    });
  };

  // 将已有的数据回显
  useEffect(() => {
    setGetDataLoading(true);
    (async () => {
      let staffTime = await proxyFetch(SELECT_STAFF_TIME, {}, 'GET');
      // 数据回显
      if (staffTime) {
        // 数据处理
        // 时间处理
        if (staffTime.startTime) {
          staffTime.startTime = moment(staffTime.startTime);
        }

        if (staffTime.endTime) {
          staffTime.endTime = moment(staffTime.endTime);
        }

        setFieldsValue(staffTime);
      }

      setIsNeedRefresh(false);
    })();
    setGetDataLoading(false);
  }, [isNeedRefresh, setFieldsValue]);

  return (
    <Skeleton loading={getDataLoading}>
      <Form
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        onSubmit={handleSumbitSave}
      >
        {/* 权限 */}
        <Form.Item label='权限'>
          <span>科研人员</span>
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
    </Skeleton>
  );
});
