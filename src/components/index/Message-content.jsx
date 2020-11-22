import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { CREATE_MESSAGE } from '@/constants/api-constants';

// 样式
import { Form, Input, Button } from 'antd';
import '@/style/home/staff/write-inner-modal.styl';

const { TextArea } = Input;

export default Form.create({ name: 'message' })(({ form }) => {
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

        const res = await proxyFetch(CREATE_MESSAGE, value);

        setSaveDataLoading(false);

        if (res) {
          resetFields();
          dispatch(userAction.setMessageRefresh(true));
        }
      }
    });
  };

  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='发布信息'
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
        >
          {getFieldDecorator('message', {
            rules: [
              {
                required: true,
                message: '请输入发布信息！',
              },
            ],
          })(
            <TextArea rows={4} placeholder='发布信息' />
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
