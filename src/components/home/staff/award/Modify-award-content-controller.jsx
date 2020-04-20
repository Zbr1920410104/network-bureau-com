import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import {
  MODIFY_STAFF_AWARD,
  GET_STAFF_AWARD_BY_UUID,
} from '@/constants/api-constants';

// 组件
import moment from 'moment';

// 样式
import { Form, Input, Select, Button, DatePicker } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'modifyAward' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { staffAwardUuid } = useSelector((state) => state.userStore),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const staffAward = await proxyFetch(
        GET_STAFF_AWARD_BY_UUID,
        { staffAwardUuid },
        'GET'
      );

      if (staffAward) {
        // 时间处理
        if (staffAward.awardTime) {
          staffAward.awardTime = moment(staffAward.awardTime);
        }

        setFieldsValue(staffAward);
        dispatch(userAction.setChangeAward(false));
      }
    })();
  }, [setFieldsValue, staffAwardUuid, dispatch]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        value.uuid = staffAwardUuid;
        const res = await proxyFetch(MODIFY_STAFF_AWARD, value);

        setSaveDataLoading(false);

        if (res) {
          dispatch(userAction.setChangeAward(true));
        }
      }
    });
  };

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
