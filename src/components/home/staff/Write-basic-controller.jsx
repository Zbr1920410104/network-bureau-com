import React, { useState } from 'react';

import ModifyBasicContent from '@/components/home/staff/basic/Modify-basic-content-controller.jsx';

// 样式
import '@/style/home/staff/write-basic.styl';
import {
  DatePicker,
  Form,
  Row,
  Input,
  Col,
  Select,
  Button,
  Icon,
  Descriptions,
  Skeleton,
  Modal
} from 'antd';
const { Option } = Select,
  { TextArea } = Input;

export default props => {
  const [isWritten, setIswritten] = useState(false),
    [modifyBasicVisible, setModifyBasicVisible] = useState(false),
    [basicLoading, setBasicLoading] = useState(false);

  const handleWrite = () => {
    setBasicLoading(true);
    setIswritten(true);
    setBasicLoading(false);
  };

  const showModifyBasic = () => {
    setModifyBasicVisible(true);
  };

  const hideModifyBasic = () => {
    setModifyBasicVisible(false);
  };

  return (
    <div className='write-basic-box'>
      <div className='basic-title-box'>
        <div className='title-left-box'>
          <Icon type='file-text' className='icon' />
          <span>基本信息</span>
        </div>
        <div className='title-right-box'>
          {isWritten ? (
            <Button
              type='link'
              icon='form'
              onClick={showModifyBasic}
              className='modify-button'
            >
              修改
            </Button>
          ) : null}
        </div>
        <Modal
          title='修改基本信息'
          visible={modifyBasicVisible}
          onOk={hideModifyBasic}
          onCancel={hideModifyBasic}
          okText='保存'
          cancelText='取消'
        >
          <ModifyBasicContent />
        </Modal>
      </div>
      <Skeleton loading={basicLoading}>
        {isWritten ? (
          <Descriptions className='description-box'>
            <Descriptions.Item label='姓名'>李锐</Descriptions.Item>
            <Descriptions.Item label='身份证号'>
              230108198005120614
            </Descriptions.Item>
            <Descriptions.Item label='性别'>男</Descriptions.Item>
            <Descriptions.Item label='民族'>汉</Descriptions.Item>
            <Descriptions.Item label='籍贯'>辽宁省盖州</Descriptions.Item>
            <Descriptions.Item label='政治面貌'>共产党员</Descriptions.Item>
            <Descriptions.Item label='科室'>战略研究科</Descriptions.Item>
            <Descriptions.Item label='办公电话'>
              0451-58685774
            </Descriptions.Item>
            <Descriptions.Item label='手机'>18351923820</Descriptions.Item>
            <Descriptions.Item label='学历/学位'>硕士</Descriptions.Item>
            <Descriptions.Item label='毕业学校'>
              哈尔滨理工大学
            </Descriptions.Item>
            <Descriptions.Item label='所学专业'>软件工程</Descriptions.Item>
            <Descriptions.Item label='职务'>研究员</Descriptions.Item>
            <Descriptions.Item label='参加工作时间'>
              2020-03-10
            </Descriptions.Item>
            <Descriptions.Item label='职称'>副高级</Descriptions.Item>
            <Descriptions.Item label='获得时间'>2020-03-11</Descriptions.Item>
            <Descriptions.Item label='研究方向'>人工智能</Descriptions.Item>
          </Descriptions>
        ) : (
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
                  <Select placeholder='性别'>
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
                  <Select placeholder='民族'>
                    <Option value='汉族'>汉族</Option>
                    <Option value='蒙古族'>蒙古族</Option>
                    <Option value='回族'>回族</Option>
                    <Option value='藏族'>藏族</Option>
                    <Option value='维吾尔族'>维吾尔族</Option>
                    <Option value='苗族'>苗族</Option>
                    <Option value='彝族'>彝族</Option>
                    <Option value='壮族'>壮族</Option>
                    <Option value='布依族'>布依族</Option>
                    <Option value='朝鲜族'>朝鲜族</Option>
                    <Option value='满族'>满族</Option>
                    <Option value='侗族'>侗族</Option>
                    <Option value='瑶族'>瑶族</Option>
                    <Option value='白族'>白族</Option>
                    <Option value='土家族'>土家族</Option>
                    <Option value='哈尼族'>哈尼族</Option>
                    <Option value='哈萨克族'>哈萨克族</Option>
                    <Option value='傣族'>傣族</Option>
                    <Option value='黎族'>黎族</Option>
                    <Option value='傈僳族'>傈僳族</Option>
                    <Option value='佤族'>佤族</Option>
                    <Option value='畲族'>畲族</Option>
                    <Option value='高山族'>高山族</Option>
                    <Option value='拉祜族'>拉祜族</Option>
                    <Option value='水族'>水族</Option>
                    <Option value='东乡族'>东乡族</Option>
                    <Option value='纳西族'>纳西族</Option>
                    <Option value='景颇族'>景颇族</Option>
                    <Option value='柯尔克孜族'>柯尔克孜族</Option>
                    <Option value='土族'>土族</Option>
                    <Option value='达斡尔族'>达斡尔族</Option>
                    <Option value='仫佬族'>仫佬族</Option>
                    <Option value='羌族'>羌族</Option>
                    <Option value='布朗族'>布朗族</Option>
                    <Option value='撒拉族'>撒拉族</Option>
                    <Option value='毛南族'>毛南族</Option>
                    <Option value='仡佬族'>仡佬族</Option>
                    <Option value='锡伯族'>锡伯族</Option>
                    <Option value='阿昌族'>阿昌族</Option>
                    <Option value='普米族'>普米族</Option>
                    <Option value='塔吉克族'>塔吉克族</Option>
                    <Option value='怒族'>怒族</Option>
                    <Option value='乌孜别克族'>乌孜别克族</Option>
                    <Option value='俄罗斯族'>俄罗斯族</Option>
                    <Option value='鄂温克族'>鄂温克族</Option>
                    <Option value='德昂族'>德昂族</Option>
                    <Option value='保安族'>保安族</Option>
                    <Option value='裕固族'>裕固族</Option>
                    <Option value='京族'>京族</Option>
                    <Option value='塔塔尔族'>塔塔尔族</Option>
                    <Option value='独龙族'>独龙族</Option>
                    <Option value='鄂伦春族'>鄂伦春族</Option>
                    <Option value='赫哲族'>赫哲族</Option>
                    <Option value='门巴族'>门巴族</Option>
                    <Option value='珞巴族'>珞巴族</Option>
                    <Option value='基诺族'>基诺族</Option>
                    <Option value='其他'>其他</Option>
                  </Select>
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
                  <Select placeholder='政治面貌'>
                    <Option value='中共党员'>中共党员</Option>
                    <Option value='中共预备党员'>中共预备党员</Option>
                    <Option value='共青团员'>共青团员</Option>
                    <Option value='民革党员'>民革党员</Option>
                    <Option value='民盟盟员'>民盟盟员</Option>
                    <Option value='民建会员'>民建会员</Option>
                    <Option value='民进会员'>民进会员</Option>
                    <Option value='农工党党员'>农工党党员</Option>
                    <Option value='致公党党员'>致公党党员</Option>
                    <Option value='九三学社社员'>九三学社社员</Option>
                    <Option value='台盟盟员'>台盟盟员</Option>
                    <Option value='无党派人士'>无党派人士</Option>
                    <Option value='群众'>群众</Option>
                  </Select>
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
                  <Select placeholder='科室'>
                    <Option value='战略研究科'>战略研究科</Option>
                    <Option value='信息安全科'>信息安全科</Option>
                    <Option value='通信研究科'>通信研究科</Option>
                  </Select>
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
                  <Select placeholder='学历'>
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
        )}
      </Skeleton>
      <div className='basic-bottom-box'>
        {!isWritten ? (
          <Button type='primary' className='save-button' onClick={handleWrite}>
            暂存
          </Button>
        ) : null}
      </div>
    </div>
  );
};
