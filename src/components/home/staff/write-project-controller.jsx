import React, { useState } from 'react';

// 样式
import '@/style/home/staff/write-detail.styl';
import {
  Icon,
  Form,
  Row,
  Input,
  Col,
  Select,
  Button,
  Tabs,
  Descriptions,
  Modal
} from 'antd';
const { Option } = Select,
  { TextArea } = Input,
  { TabPane } = Tabs,
  { confirm } = Modal;

export default props => {
  const [hostingProjectformList, setHostingProjectFormList] = useState([]),
    [participationProjectformList, setParticipationProjectFormList] = useState(
      []
    );

  const createHostingProject = () => {
    let hostingProjectField = [];
    hostingProjectField.push(
      <div className='inner-form-box'>
        <Row gutter={24}>
          <Col span={8} key='01'>
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
          <Col span={8} key='02'>
            <Form.Item
              label='项目编号'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
          <Col span={8} key='03'>
            <Form.Item
              label='项目来源'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
        </Row>

        <Row gutter={24}>
          <Col span={8} key='04'>
            <Form.Item
              label='项目经费(万元)'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入项目经费(万元)!'
                }
              ]}
            >
              <Input placeholder='项目经费(万元)' />
            </Form.Item>
          </Col>
          <Col span={8} key='05'>
            <Form.Item
              label='起止时间'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
          <Col span={8} key='06'>
            <Form.Item
              label='在研/结题'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              rules={[
                {
                  required: true,
                  message: '请输入在研/结题!'
                }
              ]}
            >
              <Select>
                <Option value='在研'>在研</Option>
                <Option value='结题'>结题</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Form.Item
            label='主要研究内容'
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 18 }}
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

        <Row gutter={24}>
          <Col span={8} key='07'>
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
          <Col span={8} key='08'>
            <Form.Item
              label='参与人名单'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
          <Col span={8} key='09'>
            <Form.Item>
              <Button type='primary' className='delete-button'>
                保存
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
    setHostingProjectFormList(hostingProjectField);
  };

  const createParticipationProject = () => {
    const participationProjectField = [];
    participationProjectField.push(
      <div className='inner-form-box'>
        <Row gutter={24}>
          <Col span={8} key='#1'>
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
          <Col span={8} key='#2'>
            <Form.Item
              label='项目编号'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
          <Col span={8} key='#3'>
            <Form.Item
              label='项目来源'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
        </Row>

        <Row gutter={24}>
          <Col span={8} key='#4'>
            <Form.Item
              label='项目经费(万元)'
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: '请输入项目经费(万元)!'
                }
              ]}
            >
              <Input placeholder='项目经费(万元)' />
            </Form.Item>
          </Col>
          <Col span={8} key='#5'>
            <Form.Item
              label='起止时间'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
          <Col span={8} key='#6'>
            <Form.Item
              label='在研/结题'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              rules={[
                {
                  required: true,
                  message: '请输入在研/结题!'
                }
              ]}
            >
              <Select>
                <Option value='在研'>在研</Option>
                <Option value='结题'>结题</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Form.Item
            label='主要研究内容'
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 18 }}
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

        <Row gutter={24}>
          <Col span={8} key='#7'>
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
          <Col span={8} key='#8'>
            <Form.Item
              label='参与人名单'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
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
          <Col span={8} key='#9'>
            <Form.Item>
              <Button type='primary' className='delete-button'>
                保存
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
    setParticipationProjectFormList(participationProjectField);
  };

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='主持项目' key='1'>
        <Descriptions
          className='description-box'
          title={
            <div className='description-title-box'>
              <span>主持项目清单</span>
              <Button
                type='link'
                className='plus-icon'
                onClick={() => {
                  confirm({
                    title: '新增主持项目?',
                    content: '请确定是否要新增主持项目!',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      createHostingProject();
                    },
                    onCancel() {}
                  });
                }}
              >
                <Icon type='plus-circle' />
              </Button>
            </div>
          }
        >
          <Descriptions.Item
            label='项目名称'
          >
            软件测试
          </Descriptions.Item>
          <Descriptions.Item
            label='项目编号'
          >
            100010001000
          </Descriptions.Item>
          <Descriptions.Item label='项目来源'>
            哈尔滨理工大学1819
          </Descriptions.Item>
          <Descriptions.Item label='主要研究内容' span={3}>
            JS开发
          </Descriptions.Item>
          <Descriptions.Item label='项目经费(万元)'>100</Descriptions.Item>
          <Descriptions.Item label='起止时间'>
            2020-03-01~2020-04-30
          </Descriptions.Item>
          <Descriptions.Item label='在研/结题'>在研</Descriptions.Item>
          <Descriptions.Item label='负责人'>马超</Descriptions.Item>
          <Descriptions.Item label='参与人名单'>钱程、张博荣</Descriptions.Item>
          <Descriptions.Item>
            <Button type='primary' className='modify-button'>
              修改
            </Button>
            <Button type='primary' className='delete-button'>
              删除
            </Button>
          </Descriptions.Item>
        </Descriptions>
        {hostingProjectformList}
      </TabPane>
      <TabPane tab='参与项目' key='2'>
        <Descriptions
          className='description-box'
          title={
            <div className='description-title-box'>
              <span>参与项目清单</span>
              <Button
                type='link'
                className='plus-icon'
                onClick={() => {
                  confirm({
                    title: '新增参与项目?',
                    content: '请确定是否要新增参与项目!',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      createParticipationProject();
                    },
                    onCancel() {}
                  });
                }}
              >
                <Icon type='plus-circle' />
              </Button>
            </div>
          }
        >
          <Descriptions.Item
            label='项目名称'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            软件测试
          </Descriptions.Item>
          <Descriptions.Item
            label='项目编号'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            100010001000
          </Descriptions.Item>
          <Descriptions.Item label='项目来源'>
            哈尔滨理工大学1819
          </Descriptions.Item>
          <Descriptions.Item label='主要研究内容' span={3}>
            JS开发
          </Descriptions.Item>
          <Descriptions.Item label='项目经费(万元)'>100</Descriptions.Item>
          <Descriptions.Item label='起止时间'>
            2020-03-01~2020-04-30
          </Descriptions.Item>
          <Descriptions.Item label='在研/结题'>在研</Descriptions.Item>
          <Descriptions.Item label='负责人'>马超</Descriptions.Item>
          <Descriptions.Item label='参与人名单'>钱程、张博荣</Descriptions.Item>
          <Descriptions.Item>
            <Button type='primary' className='modify-button'>
              修改
            </Button>
            <Button type='primary' className='delete-button'>
              删除
            </Button>
          </Descriptions.Item>
        </Descriptions>
        {participationProjectformList}
      </TabPane>
    </Tabs>
  );
};
