import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { CREATE_STAFF_AWARD } from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button, DatePicker } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'writeAward' })(({ form }) => {
  const { getFieldDecorator, resetFields } = form,
    { awardRefresh } = useSelector((state) => state.userStore),
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

        const res = await proxyFetch(CREATE_STAFF_AWARD, value);

        setSaveDataLoading(false);

        if (res) {
          resetFields();
          dispatch(userAction.setChangeAward(true));
        }
      }
    });
  };

  useEffect(() => {
    if (awardRefresh) {
      resetFields();
      dispatch(userAction.setAwardRefresh(false));
    }
  }, [awardRefresh, dispatch, resetFields]);

  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='奖项类型'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardType', {
            rules: [{ required: true, message: '请选择奖项类型' }],
          })(
            <Select placeholder='奖项类型'>
              <Option value='个人'>个人</Option>
              <Option value='团体'>团体</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='奖项名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardName', {
            rules: [{ required: true, message: '请输入奖项名称' }],
          })(<Input placeholder='奖项名称' />)}
        </Form.Item>

        <Form.Item
          label='获奖时间'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardTime', {
            rules: [{ required: true, message: '请输入获奖时间' }],
          })(<DatePicker placeholder='20XX-XX-XX' />)}
        </Form.Item>

        <Form.Item
          label='奖项级别'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardGrade', {
            rules: [{ required: true, message: '请输入奖项级别' }],
          })(<Input placeholder='奖项级别' />)}
        </Form.Item>

        <Form.Item
          label='颁奖部门'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardDepartment', {
            rules: [{ required: true, message: '请输入颁奖部门' }],
          })(<Input placeholder='颁奖部门' />)}
        </Form.Item>

        <Form.Item
          label='获奖名单(团体)'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardNameList', {
            rules: [
              form.getFieldValue('awardType') === '团体'
                ? { required: true, message: '请输入获奖名单(团体)' }
                : {},
            ],
          })(
            <Input
              placeholder='获奖名单(团体)'
              disabled={form.getFieldValue('awardType') === '个人'}
            />
          )}
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
