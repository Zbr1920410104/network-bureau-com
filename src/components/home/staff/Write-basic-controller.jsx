import React, { useState, useEffect } from 'react';

import ModifyBasicContent from '@/components/home/staff/basic/Modify-basic-content-controller.jsx';

// 工具
import verifyStatusToColor from '@/components/home/staff/util/verify-status-to-color';
import moment from 'moment';
import addressData from '@/components/home/staff/util/addressData';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import {
  SAVE_STAFF_BASIC,
  GET_STAFF_DEPARTMENT,
  GET_STAFF_BASIC,
} from '@/constants/api-constants';

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
  Modal,
  Tag,
  Alert,
  Cascader,
} from 'antd';
const { Option } = Select,
  { TextArea } = Input,
  { confirm } = Modal;

export default Form.create({ name: 'staffBasic' })(({ form }) => {
  const { getFieldDecorator } = form;
  const [isWritten, setIswritten] = useState(false),
    [depatmentList, setDepatmentList] = useState([]),
    [modifyBasicVisible, setModifyBasicVisible] = useState(false),
    [staffBasic, setStaffBasic] = useState([]),
    { modifyBasic } = useSelector((state) => state.userStore),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    dispatch = useDispatch(),
    [basicLoading, setBasicLoading] = useState(false);

  /**
   * 提交事件
   */
  const handleWrite = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        value.nativePlace =
          value.nativePlace[0] +
          (value.nativePlace[1] ? value.nativePlace[1] : '');
        const res = await proxyFetch(SAVE_STAFF_BASIC, value);

        if (res) {
          setIswritten(true);
          setIsNeedRefresh(true);
        }
      }
    });
  };

  useEffect(() => {
    (async () => {
      const depatmentList = await proxyFetch(GET_STAFF_DEPARTMENT, {}, 'GET');

      setDepatmentList(depatmentList);
    })();
  }, []);

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setBasicLoading(true);
        const staffBasic = await proxyFetch(GET_STAFF_BASIC, {}, 'GET');

        if (staffBasic) {
          setIswritten(true);
          setStaffBasic(staffBasic);
          dispatch(userAction.setModifyBasic(false));
          setModifyBasicVisible(false);
        }

        setIsNeedRefresh(false);
        setBasicLoading(false);
      }
    })();
  }, [isNeedRefresh, dispatch]);

  useEffect(() => {
    if (modifyBasic) {
      setIsNeedRefresh(true);
      dispatch(userAction.setModifyBasic(false));
    }
  }, [modifyBasic, dispatch]);

  const showModifyBasic = () => {
    setModifyBasicVisible(true);
  };

  const hideModifyBasic = () => {
    dispatch(userAction.setBasicRefresh(true));
    setModifyBasicVisible(false);
  };

  let addr = [];

  const province = Object.keys(addressData);

  for (let item in province) {
    const key = province[item];
    const cityList = [];
    let provinceItem, cityItem;
    if (addressData[key].length > 0) {
      for (let city in addressData[key]) {
        cityItem = {
          value: addressData[key][city],
          label: addressData[key][city],
        };

        cityList.push(cityItem);
      }
    }

    provinceItem = {
      value: key,
      label: key,
      children: cityList,
    };

    addr.push(provinceItem);
  }
  return (
    <div className='write-basic-box'>
      <div className='basic-title-box'>
        <div className='title-left-box'>
          <Icon type='file-text' className='icon' />
          <span>基本信息</span>
          <Tag
            className='content-tag'
            color={verifyStatusToColor(staffBasic.isVerify)}
          >
            {staffBasic.isVerify ? staffBasic.isVerify : '未填写'}
          </Tag>
        </div>
        <div className='title-right-box'>
          {isWritten ? (
            <Button
              type='link'
              icon='edit'
              onClick={showModifyBasic}
              className='modify-button'
              disabled={staffBasic.isVerify === '核实通过'}
            >
              修改
            </Button>
          ) : null}
        </div>
        <Modal
          title='修改基本信息'
          visible={modifyBasicVisible}
          footer={null}
          onCancel={() => {
            confirm({
              title: '确认离开?',
              okType: 'primary',
              content: '离开修改的内容将不会保存!',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                hideModifyBasic();
              },
              onCancel() {},
            });
          }}
          okText='确定'
          cancelText='取消'
        >
          <ModifyBasicContent />
        </Modal>
      </div>
      {staffBasic.verifyRemarks ? (
        <Alert
          className='alert'
          type='warning'
          description={`修改建议: ${staffBasic.verifyRemarks}`}
        />
      ) : null}
      <Skeleton loading={basicLoading}>
        {isWritten ? (
          <Descriptions className='description-box'>
            <Descriptions.Item label='姓名'>
              {staffBasic.name}
            </Descriptions.Item>
            <Descriptions.Item label='身份证号'>
              {staffBasic.idNumber}
            </Descriptions.Item>
            <Descriptions.Item label='性别'>{staffBasic.sex}</Descriptions.Item>
            <Descriptions.Item label='民族'>
              {staffBasic.nation}
            </Descriptions.Item>
            <Descriptions.Item label='籍贯'>
              {staffBasic.nativePlace}
            </Descriptions.Item>
            <Descriptions.Item label='政治面貌'>
              {staffBasic.politicalAffiliation}
            </Descriptions.Item>
            <Descriptions.Item label='科室'>
              {staffBasic.department}
            </Descriptions.Item>
            <Descriptions.Item label='办公电话'>
              {staffBasic.officePhone}
            </Descriptions.Item>
            <Descriptions.Item label='手机'>
              {staffBasic.phone}
            </Descriptions.Item>
            <Descriptions.Item label='学历'>
              {staffBasic.education}
            </Descriptions.Item>
            <Descriptions.Item label='学位'>
              {staffBasic.degree}
            </Descriptions.Item>
            <Descriptions.Item label='毕业学校'>
              {staffBasic.graduateSchool}
            </Descriptions.Item>
            <Descriptions.Item label='所学专业'>
              {staffBasic.major}
            </Descriptions.Item>
            <Descriptions.Item label='职务'>
              {staffBasic.duty}
            </Descriptions.Item>
            <Descriptions.Item label='参加工作时间'>
              {staffBasic.workTime
                ? moment(staffBasic.workTime).format('YYYY-MM-DD')
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label='职称'>
              {staffBasic.professionTitle}
            </Descriptions.Item>
            <Descriptions.Item label='获得时间'>
              {staffBasic.getTime
                ? moment(staffBasic.getTime).format('YYYY-MM-DD')
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label='研究方向'>
              {staffBasic.researchDirection}
            </Descriptions.Item>
            <Descriptions.Item label='学习经历' span={3}>
              {staffBasic.studyExperience}
            </Descriptions.Item>
            <Descriptions.Item label='工作经历' span={3}>
              {staffBasic.workExperience}
            </Descriptions.Item>
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
                >
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名！',
                      },
                      {
                        message: '姓名过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入姓名' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='2'>
                <Form.Item
                  label='身份证号'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('idNumber', {
                    rules: [
                      {
                        required: true,
                        message: '请输入身份证号！',
                      },
                      {
                        message: '身份证号过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入身份证号' />)}
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
                >
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,
                        message: '请选择性别！',
                      },
                    ],
                  })(
                    <Select placeholder='性别'>
                      <Option value='男'>男</Option>
                      <Option value='女'>女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} key='4'>
                <Form.Item
                  label='民族'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('nation', {
                    rules: [
                      {
                        required: true,
                        message: '请选择民族！',
                      },
                    ],
                  })(
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
                  )}
                </Form.Item>
              </Col>
              <Col span={8} key='5'>
                <Form.Item
                  label='籍贯'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('nativePlace', {
                    rules: [
                      {
                        required: true,
                        message: '请输入籍贯！',
                      },
                    ],
                  })(<Cascader options={addr} />)}
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
                >
                  {getFieldDecorator('politicalAffiliation', {
                    rules: [
                      {
                        required: true,
                        message: '请选择政治面貌！',
                      },
                    ],
                  })(
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
                  )}
                </Form.Item>
              </Col>
              <Col span={8} key='7'>
                <Form.Item
                  label='科室'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('department', {
                    rules: [
                      {
                        required: true,
                        message: '请选择科室！',
                      },
                    ],
                  })(
                    <Select placeholder='科室'>
                      {depatmentList.map((value) => (
                        <Option value={value.name} key={value.name}>
                          {value.name}
                        </Option>
                      ))}
                    </Select>
                  )}
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
                >
                  {getFieldDecorator('officePhone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入办公电话！',
                      },
                      {
                        message: '办公电话过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入办公电话' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='9'>
                <Form.Item
                  label='手机号码'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号码！',
                      },
                      {
                        message: '手机号码过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入手机号码' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='10'>
                <Form.Item
                  label='学历'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('education', {
                    rules: [
                      {
                        required: true,
                        message: '请选择学历！',
                      },
                    ],
                  })(
                    <Select placeholder='学历'>
                      <Option value='高中及以下'>高中及以下</Option>
                      <Option value='中专'>中专</Option>
                      <Option value='大专'>大专</Option>
                      <Option value='本科'>本科</Option>
                      <Option value='硕士'>硕士</Option>
                      <Option value='博士'>博士</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            {/* 第五行 */}
            <Row>
              <Col span={8} key='10'>
                <Form.Item
                  label='学位'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('degree', {
                    rules: [
                      {
                        required: true,
                        message: '请选择学位！',
                      },
                    ],
                  })(
                    <Select placeholder='学位'>
                      <Option value='无'>无</Option>
                      <Option value='学士'>学士</Option>
                      <Option value='硕士'>硕士</Option>
                      <Option value='博士'>博士</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} key='11'>
                <Form.Item
                  label='毕业学校'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('graduateSchool', {
                    rules: [
                      {
                        required: true,
                        message: '请输入毕业学校！',
                      },
                      {
                        message: '毕业学校过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入毕业学校' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='12'>
                <Form.Item
                  label='所学专业'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('major', {
                    rules: [
                      {
                        required: true,
                        message: '请输入所学专业！',
                      },
                      {
                        message: '所学专业过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入所学专业' />)}
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
                >
                  {getFieldDecorator('duty', {
                    rules: [
                      {
                        required: true,
                        message: '请输入职务！',
                      },
                      {
                        message: '职务过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入职务' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='14'>
                <Form.Item
                  label='参加工作时间'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('workTime', {
                    rules: [{ required: true, message: '请选择工作时间！' }],
                  })(<DatePicker placeholder='20XX-XX-XX' />)}
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
                >
                  {getFieldDecorator('professionTitle', {
                    rules: [
                      {
                        required: true,
                        message: '请输入职称！',
                      },
                      {
                        message: '职称过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入职称' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='16'>
                <Form.Item
                  label='获得时间'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator('getTime', {
                    rules: [{ required: true, message: '请选择获得时间！' }],
                  })(<DatePicker placeholder='20XX-XX-XX' />)}
                </Form.Item>
              </Col>
              <Col span={8} key='17'>
                <Form.Item
                  label='研究方向'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('researchDirection', {
                    rules: [
                      {
                        required: true,
                        message: '请输入研究方向！',
                      },
                      {
                        message: '研究方向过长！',
                        max: 32,
                      },
                    ],
                  })(<Input placeholder='请输入研究方向' />)}
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
                >
                  {getFieldDecorator('studyExperience', {
                    rules: [
                      {
                        required: true,
                        message: '请输入学习经历！',
                      },
                      {
                        message: '学习经历过长！',
                        max: 300,
                      },
                    ],
                  })(<TextArea rows={4} placeholder='学习经历' />)}
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
                >
                  {getFieldDecorator('workExperience', {
                    rules: [
                      {
                        required: true,
                        message: '请输入工作经历！',
                      },
                      {
                        message: '工作经历过长！',
                        max: 300,
                      },
                    ],
                  })(<TextArea rows={4} placeholder='工作经历' />)}
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
});
