import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { SET_PATENT_SCORE, GET_PATENT_SCORE } from '@/constants/api-constants';

// 样式
import '@/style/home/review-manager/review-detail.styl';
import { Input, Form, Button } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'patentReview' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { staffPatentUuid } = useSelector((state) => state.userStore),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (staffPatentUuid) {
        const staffPatent = await proxyFetch(
          GET_PATENT_SCORE,
          { staffPatentUuid },
          'GET'
        );

        if (staffPatent) {
          // 时间处理

          setFieldsValue(staffPatent);
        }
      }
    })();
  }, [setFieldsValue, staffPatentUuid]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        value.uuid = staffPatentUuid;
        const res = await proxyFetch(SET_PATENT_SCORE, value);

        setSaveDataLoading(false);

        if (res) {
          dispatch(userAction.setReviewPatent(true));
        }
      }
    });
  };

  return (
    <div className='review-modal-box'>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='打分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('score', {
            rules: [
              { required: true, message: '请输入分数!' },
              {
                pattern: /(^\d{1,3})+(\.\d{0,2})?$/,
                message: '请输入正确的分数,整数最高三位,最多保留2位小数。',
              },
            ],
          })(<Input placeholder='请输入分数' />)}
        </Form.Item>

        <Form.Item
          label='备注建议'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          {getFieldDecorator('reviewRemarks')(
            <TextArea placeholder='请输入备注建议' />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button
            type='primary'
            className='save-button'
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
