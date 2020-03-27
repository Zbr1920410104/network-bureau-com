import React from 'react';

// 样式
import '@/style/home/staff/write-basic.styl';
import { DatePicker, Form, Row, Input, Col, Select, Button } from 'antd';
const { Option } = Select,
  { TextArea } = Input;

export default props => {
  return (
    <div className='write-basic-box'>
      <Form>
        {/* 第一行 */}
        <Row>
          <Col span={8} key='1'>
            <Form.Item
              label='姓名'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入姓名!'
                }
              ]}
            >
              <Input placeholder='姓名' />
            </Form.Item>
          </Col>
          <Col span={8} key='2'>
            <Form.Item
              label='身份证号'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请输入身份证号!'
                }
              ]}
            >
              <Input placeholder='身份证号' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第二行 */}
        <Row>
          <Col span={8} key='3'>
            <Form.Item
              label='性别'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入性别!'
                }
              ]}
            >
              <Select>
                <Option value='男'>男</Option>
                <Option value='女'>女</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} key='4'>
            <Form.Item
              label='民族'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请输入民族!'
                }
              ]}
            >
              <Input placeholder='民族' />
            </Form.Item>
          </Col>
          <Col span={8} key='5'>
            <Form.Item
              label='籍贯'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入籍贯!'
                }
              ]}
            >
              <Input placeholder='籍贯' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第三行 */}
        <Row>
          <Col span={8} key='6'>
            <Form.Item
              label='政治面貌'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入政治面貌!'
                }
              ]}
            >
              <Input placeholder='政治面貌' />
            </Form.Item>
          </Col>
          <Col span={8} key='7'>
            <Form.Item
              label='科室'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请输入科室!'
                }
              ]}
            >
              <Input placeholder='科室' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第四行 */}
        <Row>
          <Col span={8} key='8'>
            <Form.Item
              label='办公电话'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入办公电话!'
                }
              ]}
            >
              <Input placeholder='办公电话' />
            </Form.Item>
          </Col>
          <Col span={8} key='9'>
            <Form.Item
              label='手机号码'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请输入手机号码!'
                }
              ]}
            >
              <Input placeholder='手机号码' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第五行 */}
        <Row>
          <Col span={8} key='10'>
            <Form.Item
              label='学历/学位'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入学历/学位!'
                }
              ]}
            >
              <Select>
                <Option value='高中及以下'>高中及以下</Option>
                <Option value='中专'>中专</Option>
                <Option value='大专'>大专</Option>
                <Option value='本科'>本科</Option>
                <Option value='硕士'>硕士</Option>
                <Option value='博士'>博士</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} key='11'>
            <Form.Item
              label='毕业学校'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请输入毕业学校!'
                }
              ]}
            >
              <Input placeholder='毕业学校' />
            </Form.Item>
          </Col>
          <Col span={8} key='12'>
            <Form.Item
              label='所学专业'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入所学专业!'
                }
              ]}
            >
              <Input placeholder='所学专业' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第六行 */}
        <Row>
          <Col span={8} key='13'>
            <Form.Item
              label='职务'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入职务!'
                }
              ]}
            >
              <Input placeholder='职务' />
            </Form.Item>
          </Col>
          <Col span={8} key='14'>
            <Form.Item
              label='参加工作时间'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请选择参加工作时间!'
                }
              ]}
            >
              <DatePicker placeholder='20XX-XX-XX' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第七行 */}
        <Row>
          <Col span={8} key='15'>
            <Form.Item
              label='职称'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入职称!'
                }
              ]}
            >
              <Input placeholder='职称' />
            </Form.Item>
          </Col>
          <Col span={8} key='16'>
            <Form.Item
              label='获得时间'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: '请选择获得时间!'
                }
              ]}
            >
              <DatePicker placeholder='20XX-XX-XX' />
            </Form.Item>
          </Col>
          <Col span={8} key='17'>
            <Form.Item
              label='研究方向'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
                {
                  required: true,
                  message: '请输入研究方向!'
                }
              ]}
            >
              <Input placeholder='研究方向' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第八行 */}
        <Row>
          <Col span={24} key='18'>
            <Form.Item
              label='学习经历'
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 21 }}
              rules={[
                {
                  required: true,
                  message: '请输入学习经历!'
                }
              ]}
            >
              <TextArea rows={4} maxLength='300' placeholder='学习经历' />
            </Form.Item>
          </Col>
        </Row>

        {/* 第九行 */}
        <Row>
          <Col span={24} key='19'>
            <Form.Item
              label='工作经历'
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 21 }}
              rules={[
                {
                  required: true,
                  message: '请输入工作经历!'
                }
              ]}
            >
              <TextArea rows={4} maxLength='300' placeholder='工作经历' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button type='primary'>暂存</Button>
    </div>
  );
};
