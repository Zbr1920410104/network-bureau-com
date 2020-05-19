import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_BUSINESS_MANAGER_BASIC,
  SET_VERIFY_BASIC_FAIL_STATUS,
  SET_VERIFY_BASIC_SUCCESS_STATUS,
} from '@/constants/api-constants';

// 工具
import verifyStatusToColor from '@/components/home/business-manager/detail/util/verify-status-to-color';
import moment from 'moment';

// redux
import { useSelector } from 'react-redux';

// 样式
import '@/style/home/business-manager/verify-item-detail.styl';
import {
  Descriptions,
  Icon,
  Button,
  Modal,
  Input,
  Skeleton,
  message,
  Tag,
} from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid } = useSelector((state) => state.userStore),
    [verifyVisible, setVerifyVisible] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [basicLoading, setBasicLoading] = useState(false),
    [staffBasic, setStaffBasic] = useState([]),
    [statusLoading, setStatusLoading] = useState(false),
    [verifyRemarks, setVerifyRemarks] = useState('');

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setBasicLoading(true);
        const staffBasic = await proxyFetch(
          GET_BUSINESS_MANAGER_BASIC,
          { staffUuid },
          'GET'
        );

        if (staffBasic) {
          setStaffBasic(staffBasic);
        }

        setIsNeedRefresh(false);
        setBasicLoading(false);
      }
    })();
  }, [staffUuid, isNeedRefresh]);

  const handleSetFailStatus = () => {
    if (verifyRemarks) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_VERIFY_BASIC_FAIL_STATUS, {
          userUuid: staffUuid,
          verifyRemarks,
        });

        setStatusLoading(false);
        if (res) {
          setIsNeedRefresh(true);
          setVerifyVisible(false);
        }
      })();
    } else {
      message.error('请输入未通过审核实理由!');
    }
  };

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      const res = await proxyFetch(SET_VERIFY_BASIC_SUCCESS_STATUS, {
        userUuid: staffUuid,
      });

      setStatusLoading(false);
      if (res) {
        setIsNeedRefresh(true);
        setVerifyVisible(false);
      }
    })();
  };

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='file-text' className='icon' />
          <span>基本信息</span>
          <Tag
            className='content-tag'
            color={verifyStatusToColor(staffBasic.isVerify)}
          >
            {staffBasic.isVerify}
          </Tag>
        </div>
        <div className='title-right-box'>
          <Button
            type='link'
            icon='edit'
            className='opinion-button'
            onClick={showVerifyModal}
          >
            核实
          </Button>
        </div>
        <Modal
          title='请核实'
          visible={verifyVisible}
          onCancel={hideVerifyModal}
          footer={null}
        >
          <div className='button-box'>
            <Button
              type='primary'
              className={staffBasic.isVerify !== '未核实' ? '' : 'fail-button'}
              onClick={handleSetFailStatus}
              loading={statusLoading}
              disabled={staffBasic.isVerify !== '未核实'}
            >
              核实未通过
            </Button>
            <Button
              type='primary'
              className={
                staffBasic.isVerify !== '未核实' ? '' : 'success-button'
              }
              disabled={staffBasic.isVerify !== '未核实'}
              onClick={() => {
                confirm({
                  title: '确认核实通过?',
                  okType: 'primary',
                  content: (
                    <div className='text-box'>
                      <span>我已核实完</span>
                      <span className='important-text'>基本信息</span>
                      <span>的所有信息,确认通过?</span>
                    </div>
                  ),
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {
                    handleSetSuccessStatus();
                  },
                  onCancel() {},
                });
              }}
            >
              核实通过
            </Button>
          </div>
          <TextArea
            rows={3}
            maxLength='100'
            placeholder='请输入核实意见及不通过理由'
            className='modal-textArea-box'
            disabled={staffBasic.isVerify !== '未核实'}
            onChange={(e) => {
              setVerifyRemarks(e.target.value);
            }}
          />
        </Modal>
      </div>
      <Skeleton loading={basicLoading}>
        <Descriptions className='description-box'>
          <Descriptions.Item label='姓名'>{staffBasic.name}</Descriptions.Item>
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
          <Descriptions.Item label='手机'>{staffBasic.phone}</Descriptions.Item>
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
          <Descriptions.Item label='职务'>{staffBasic.duty}</Descriptions.Item>
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
      </Skeleton>
    </div>
  );
};
