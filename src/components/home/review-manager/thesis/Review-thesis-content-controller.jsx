import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import { SET_THESIS_SCORE, GET_THESIS_SCORE } from '@/constants/api-constants';

// 样式
import '@/style/home/review-manager/review-detail.styl';
import { Input, Form, Button } from 'antd';
const { TextArea } = Input;

export default Form.create({ name: 'thesisReview' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { staffThesisUuid } = useSelector((state) => state.userStore),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (staffThesisUuid) {
        const staffThesis = await proxyFetch(
          GET_THESIS_SCORE,
          { staffThesisUuid },
          'GET'
        );

        if (staffThesis) {
          // 时间处理

          setFieldsValue(staffThesis);
        }
      }
    })();
  }, [setFieldsValue, staffThesisUuid]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        value.uuid = staffThesisUuid;
        const res = await proxyFetch(SET_THESIS_SCORE, value);

        setSaveDataLoading(false);

        if (res) {
          dispatch(userAction.setReviewThesis(true));
        }
      }
    });
  };

  return (
    <div className='review-modal-box'>
      <Form style={{ width: '100%' }}>
        <Form.Item
          label='评分'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('score', {
            rules: [
              { required: true, message: '请输入分数!' },
              {
                pattern: /^\d+(\.\d{0,2})?$/,
                message: '请输入正确的分数,最多保留2位小数',
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
