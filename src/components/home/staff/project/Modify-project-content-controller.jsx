import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

// 请求
import proxyFetch from '@/util/request';
import {
  MODIFY_STAFF_PROJECT,
  GET_STAFF_PROJECT_BY_UUID,
} from '@/constants/api-constants';

// 样式
import { Form, Row, Input, Col, Select, DatePicker, Button } from 'antd';
const { TextArea } = Input,
  { Option } = Select;

export default Form.create({ name: 'modifyProject' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { staffProjectUuid } = useSelector((state) => state.userStore),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (staffProjectUuid) {
        const staffProject = await proxyFetch(
          GET_STAFF_PROJECT_BY_UUID,
          { staffProjectUuid },
          'GET'
        );

        if (staffProject) {
          if (staffProject.startTime) {
            staffProject.startTime = moment(staffProject.startTime);
          }

          if (staffProject.endTime) {
            staffProject.endTime = moment(staffProject.endTime);
          }

          setFieldsValue(staffProject);
          dispatch(userAction.setChangeProject(false));
        }
      }
    })();
  }, [setFieldsValue, staffProjectUuid, dispatch]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        value.uuid = staffProjectUuid;
        const res = await proxyFetch(MODIFY_STAFF_PROJECT, value);

        setSaveDataLoading(false);

        if (res) {
          dispatch(userAction.setChangeProject(true));
        }
      }
    });
  };

  return (
    <div className='inner-form-box'>
      <Form>
        <Row gutter={24}>
          <Col span={12} key='1'>
            <Form.Item
              label='参与方式'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请选择参与方式！',
                  },
                ],
              })(
                <Select placeholder='参与方式'>
                  <Option value={1}>主持项目</Option>
                  <Option value={2}>参与项目</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12} key='2'>
            <Form.Item
              label='项目级别'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('grade', {
                rules: [
                  {
                    required: true,
                    message: '请选择项目级别！',
                  },
                ],
              })(
                <Select placeholder='项目级别'>
                  <Option value={'国家级科研项目'}>国家级科研项目</Option>
                  <Option value={'省部级科研项目'}>省部级科研项目</Option>
                  <Option value={'市厅级项目'}>市厅级项目</Option>
                  <Option value={'市局级项目'}>市局级项目</Option>
                  <Option value={'横向科研项目'}>横向科研项目</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key='3'>
            <Form.Item
              label='项目名称'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目名称！',
                  },
                  {
                    message: '项目名称过长！',
                    max: 64,
                  },
                ],
              })(<Input placeholder='请输入项目名称' />)}
            </Form.Item>
          </Col>
          <Col span={12} key='4'>
            <Form.Item
              label='项目编号'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目编号！',
                  },
                  {
                    message: '项目编号过长！',
                    max: 32,
                  },
                ],
              })(<Input placeholder='请输入项目编号' />)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key='5'>
            <Form.Item
              label='项目来源'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('resource', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目来源！',
                  },
                  {
                    message: '项目来源过长！',
                    max: 32,
                  },
                ],
              })(<Input placeholder='请输入项目来源' />)}
            </Form.Item>
          </Col>
          <Col span={12} key='6'>
            <Form.Item
              label='项目经费'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('funds', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目经费！',
                  },
                  {
                    message: '项目经费过长！',
                    max: 32,
                  },
                ],
              })(
                <Input placeholder='项目经费' addonAfter={<span>万元</span>} />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key='7'>
            <Form.Item
              label='开始时间'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('startTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择开始时间！',
                  },
                ],
              })(<DatePicker placeholder='开始时间' style={{ width: 120 }} />)}
            </Form.Item>
          </Col>
          <Col span={12} key='8'>
            <Form.Item
              label='结束时间'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('endTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择结束时间！',
                  },
                ],
              })(<DatePicker placeholder='结束时间' style={{ width: 120 }} />)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12} key='9'>
            <Form.Item
              label='负责人'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('controller', {
                rules: [
                  {
                    required: true,
                    message: '请输入负责人！',
                  },
                  {
                    message: '负责人过长！',
                    max: 32,
                  },
                ],
              })(<Input placeholder='请输入负责人' />)}
            </Form.Item>
          </Col>
          <Col span={12} key='10'>
            <Form.Item
              label='是否验收'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
            >
              {getFieldDecorator('isChecked', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否验收！',
                  },
                ],
              })(
                <Select placeholder='是否验收'>
                  <Option value={'已验收'}>已验收</Option>
                  <Option value={'未验收'}>未验收</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Form.Item
            label='验收结论'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
          >
            {getFieldDecorator('checkConclusion', {
              rules: [
                {
                  required: true,
                  message: '请输入验收结论！',
                },
                {
                  message: '验收结论过长！',
                  max: 500,
                },
              ],
            })(<TextArea rows={3} placeholder='验收结论' />)}
          </Form.Item>
        </Row>

        <Row gutter={24}>
          <Form.Item
            label='参与人名单'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
          >
            {getFieldDecorator('participant', {
              rules: [
                {
                  required: true,
                  message: '请输入参与人名单！',
                },
                {
                  message: '参与人名单过长！',
                  max: 100,
                },
              ],
            })(<TextArea rows={3} placeholder='参与人名单' />)}
          </Form.Item>
        </Row>

        <Row gutter={24}>
          <Form.Item
            label='主要研究内容'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
          >
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入主要研究内容！',
                },
                {
                  message: '主要研究内容过长！',
                  max: 200,
                },
              ],
            })(<TextArea rows={4} placeholder='主要研究内容' />)}
          </Form.Item>
        </Row>

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
