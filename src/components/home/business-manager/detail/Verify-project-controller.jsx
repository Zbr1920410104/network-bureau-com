import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_VERIFY_PROJECT_LIST,
  SET_VERIFY_PROJECT_FAIL_STATUS,
  SET_VERIFY_PROJECT_SUCCESS_STATUS,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/business-manager/detail/util/verify-status-to-color';
import moment from 'moment';

// 样式
import '@/style/home/business-manager/verify-detail.styl';
import {
  Icon,
  Button,
  Modal,
  Input,
  Skeleton,
  Descriptions,
  message,
  Tag,
} from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid, staffProjectUuid, staffProjectVerifyStatus } = useSelector(
      (state) => state.userStore
    ),
    [verifyVisible, setVerifyVisible] = useState(false),
    [verifyProjectList, setVerifyProjectList] = useState([]),
    [verifyProjectLoading, setVerifyProjectLoading] = useState(false),
    dispatch = useDispatch(),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [verifyRemarks, setVerifyRemarks] = useState('');

  const showVerifyModal = (uuid, isVerify, verifyRemarks) => {
    setVerifyRemarks(verifyRemarks);
    dispatch(userAction.setStaffProjectUuid(uuid));
    dispatch(userAction.setStaffProjectVerifyStatus(isVerify));
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
    setVerifyRemarks('');
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setVerifyProjectLoading(true);

        const verifyProjectList = await proxyFetch(
          GET_VERIFY_PROJECT_LIST,
          { staffUuid },
          'GET'
        );

        if (verifyProjectList) {
          setVerifyProjectList(verifyProjectList);
          setVerifyVisible(false);
        }

        setIsNeedRefresh(false);
        setVerifyProjectLoading(false);
      }
    })();
  }, [staffUuid, isNeedRefresh]);

  const handleSetFailStatus = () => {
    if (verifyRemarks) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_VERIFY_PROJECT_FAIL_STATUS, {
          uuid: staffProjectUuid,
          staffUuid,
          verifyRemarks,
        });

        setStatusLoading(false);
        if (res) {
          setVerifyRemarks('');
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

      const res = await proxyFetch(SET_VERIFY_PROJECT_SUCCESS_STATUS, {
        uuid: staffProjectUuid,
        staffUuid,
      });

      setStatusLoading(false);
      if (res) {
        setVerifyRemarks('');
        setIsNeedRefresh(true);
        setVerifyVisible(false);
      }
    })();
  };

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='file-done' className='icon' />
          <span>项目</span>
        </div>
        <Modal
          title='请核实'
          visible={verifyVisible}
          onCancel={() => {
            hideVerifyModal();
            dispatch(userAction.setStaffProjectVerifyStatus(''));
          }}
          footer={null}
        >
          <div className='button-box'>
            <Button
              type='primary'
              disabled={staffProjectVerifyStatus !== '未核实'}
              className={
                staffProjectVerifyStatus !== '未核实' ? '' : 'fail-button'
              }
              loading={statusLoading}
              onClick={handleSetFailStatus}
            >
              核实未通过
            </Button>
            <Button
              type='primary'
              loading={statusLoading}
              disabled={staffProjectVerifyStatus !== '未核实'}
              className={
                staffProjectVerifyStatus !== '未核实' ? '' : 'success-button'
              }
              onClick={() => {
                confirm({
                  title: '确认核实通过?',
                  okType: 'primary',
                  content: (
                    <div className='text-box'>
                      <span>我已核实完该</span>
                      <span className='important-text'>项目</span>
                      <span>的信息,确认通过?</span>
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
            disabled={staffProjectVerifyStatus !== '未核实'}
            onChange={(e) => {
              setVerifyRemarks(e.target.value);
            }}
            value={verifyRemarks}
            maxLength='100'
            placeholder='请输入核实意见及不通过理由'
            className='modal-textArea-box'
          />
        </Modal>
      </div>
      <div className='verify-description-box'>
        <Skeleton loading={verifyProjectLoading}>
          {verifyProjectList?.length ? (
            verifyProjectList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`项目${index + 1}:  ${item.name}`}</span>
                      <Tag
                        className='content-tag'
                        color={verifyStatusToColor(item.isVerify)}
                      >
                        {item.isVerify}
                      </Tag>
                      {/* <span>{`最近填写/修改于: ${
                        item.currentWriteTime
                          ? moment(item.currentWriteTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span> */}
                    </div>
                    <div className='description-title-button'>
                      <Button
                        type='link'
                        icon='edit'
                        className='opinion-button'
                        onClick={() =>
                          showVerifyModal(
                            item.uuid,
                            item.isVerify,
                            item.verifyRemarks
                          )
                        }
                      >
                        核实
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions.Item label='项目类型'>
                  {item.type === 1 ? (
                    <span>主持项目</span>
                  ) : (
                    <span>参与项目</span>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label='开始时间'>
                  {item.startTime
                    ? moment(item.startTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='结束时间'>
                  {item.endTime
                    ? moment(item.endTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='项目编号'>
                  {item.code}
                </Descriptions.Item>
                <Descriptions.Item label='项目来源'>
                  {item.resource}
                </Descriptions.Item>
                <Descriptions.Item label='项目经费'>
                  {`${item.funds}万元`}
                </Descriptions.Item>
                <Descriptions.Item label='负责人'>
                  {item.controller}
                </Descriptions.Item>
                <Descriptions.Item label='参与人名单' span={2}>
                  {item.participant}
                </Descriptions.Item>
                <Descriptions.Item label='主要研究内容' span={3}>
                  {item.content}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写项目</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
