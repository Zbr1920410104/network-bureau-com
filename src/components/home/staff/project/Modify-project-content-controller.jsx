import React from 'react';

// 样式
import { Form, Row, Input, Col, Select } from 'antd';
const { TextArea } = Input,
  { Option } = Select;

export default props => {
  return (
    <div className='inner-form-box'>
      <Form>
        <Row gutter={12}>
          <Col span={12} key='04'>
            <Form.Item
              label='项目类型'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请选择项目类型!'
                }
              ]}
            >
              <Select placeholder='项目类型'>
                <Option value={1}>主持项目</Option>
                <Option value={2}>参与项目</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key='01'>
            <Form.Item
              label='项目名称'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入项目名称!'
                }
              ]}
            >
              <Input placeholder='项目名称' />
            </Form.Item>
          </Col>
          <Col span={12} key='02'>
            <Form.Item
              label='项目编号'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入项目编号!'
                }
              ]}
            >
              <Input placeholder='项目编号' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key='03'>
            <Form.Item
              label='项目来源'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入项目来源!'
                }
              ]}
            >
              <Input placeholder='项目来源' />
            </Form.Item>
          </Col>

          <Col span={12} key='05'>
            <Form.Item
              label='起止时间'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入起止时间!'
                }
              ]}
            >
              <Input placeholder='起止时间' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12} key='04'>
            <Form.Item
              label='项目经费'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入项目经费(万元)!'
                }
              ]}
            >
              <Input placeholder='项目经费' addonAfter={<span>万元</span>} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12} key='07'>
            <Form.Item
              label='负责人'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入负责人!'
                }
              ]}
            >
              <Input placeholder='负责人' />
            </Form.Item>
          </Col>
          <Col span={12} key='08'>
            <Form.Item
              label='参与人名单'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入参与人名单!'
                }
              ]}
            >
              <Input placeholder='参与人名单' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Form.Item
            label='主要研究内容'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
            rules={[
              {
                required: true,
                message: '请输入主要研究内容!'
              }
            ]}
          >
            <TextArea
              autoSize={{ minRows: 4, maxRows: 8 }}
              maxLength='200'
              placeholder='主要研究内容'
            />
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
