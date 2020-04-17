import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { CREATE_STAFF_COPYRIGHT } from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'writeCopyright' })(({ form }) => {
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

        const res = await proxyFetch(CREATE_STAFF_COPYRIGHT, value);

        setSaveDataLoading(false);

        if (res) {
          resetFields();
          dispatch(userAction.setChangeCopyright(true));
        }
      }
    });
  };
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='软件名称'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('copyrightName', {
            rules: [
              {
                required: true,
                message: '请输入软件名称！',
              },
              {
                message: '软件名称过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入软件名称' />)}
        </Form.Item>

        <Form.Item
          label='权利取得方式'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('copyrightType', {
            rules: [
              {
                required: true,
                message: '请选择权利取得方式！',
              },
            ],
          })(
            <Select placeholder='权利取得方式'>
              <Option value='原始取得'>原始取得</Option>
              <Option value='继受取得'>继受取得</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label='授权范围'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('copyrightArrange', {
            rules: [
              {
                required: true,
                message: '请输入授权范围！',
              },
              {
                message: '授权范围过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入授权范围' />)}
        </Form.Item>

        <Form.Item
          label='登记号'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('copyrightCode', {
            rules: [
              {
                required: true,
                message: '请输入登记号！',
              },
              {
                message: '登记号过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入登记号' />)}
        </Form.Item>

        {/* 保存按钮 */}
        <Form.Item wrapperCol={{ offset: 6 }}>
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
