import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 插件
import moment from 'moment';

// 请求
import proxyFetch from '@/util/request';
import {
  MODIFY_STAFF_COPYRIGHT,
  GET_STAFF_COPYRIGHT_BY_UUID,
} from '@/constants/api-constants';

// 样式
import { Form, Input, Select, Button, DatePicker } from 'antd';
const { Option } = Select;

export default Form.create({ name: 'modifyCopyright' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { staffCopyrightUuid } = useSelector((state) => state.userStore),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (staffCopyrightUuid) {
        const staffCopyright = await proxyFetch(
          GET_STAFF_COPYRIGHT_BY_UUID,
          { staffCopyrightUuid },
          'GET'
        );

        if (staffCopyright) {
          staffCopyright.completeTime = moment(staffCopyright.completeTime);
          staffCopyright.publishTime = moment(staffCopyright.publishTime);
          setFieldsValue(staffCopyright);
          dispatch(userAction.setChangeCopyright(false));
        }
      }
    })();
  }, [setFieldsValue, staffCopyrightUuid, dispatch]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        value.uuid = staffCopyrightUuid;
        const res = await proxyFetch(MODIFY_STAFF_COPYRIGHT, value);

        setSaveDataLoading(false);

        if (res) {
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

        <Form.Item
          label='开发完成时间'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('completeTime', {
            rules: [{ required: true, message: '请选择开发完成时间！' }],
          })(<DatePicker placeholder='20XX-XX-XX' />)}
        </Form.Item>

        <Form.Item
          label='发表时间'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('publishTime', {
            rules: [{ required: true, message: '请选择发表时间！' }],
          })(<DatePicker placeholder='20XX-XX-XX' />)}
        </Form.Item>

        <Form.Item
          label='著作权人'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('copyrightOwner', {
            rules: [
              {
                required: true,
                message: '请输入著作权人！',
              },
              {
                message: '著作权人过长！',
                max: 32,
              },
            ],
          })(<Input placeholder='请输入著作权人' />)}
        </Form.Item>

        <Form.Item
          label='本人排序'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('rank', {
            rules: [
              {
                required: true,
                message: '请选择本人排序！',
              },
            ],
          })(
            <Select placeholder='本人排序'>
              <Option value='第一作者'>第一作者</Option>
              <Option value='第二作者'>第二作者</Option>
              <Option value='第三作者'>第三作者</Option>
              <Option value='第四作者'>第四作者</Option>
              <Option value='第五作者'>第五作者</Option>
              <Option value='通讯作者'>通讯作者</Option>
            </Select>
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
