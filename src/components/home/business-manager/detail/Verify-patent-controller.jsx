import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_VERIFY_PATENT_LIST,
  SET_VERIFY_PATENT_FAIL_STATUS,
  SET_VERIFY_PATENT_SUCCESS_STATUS,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/business-manager/detail/util/verify-status-to-color';
// import moment from 'moment';

// 样式
import '@/style/home/business-manager/verify-item-detail.styl';
import {
  Icon,
  Button,
  Modal,
  Input,
  Descriptions,
  Skeleton,
  Tag,
  message,
} from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid, staffPatentUuid, staffPatentVerifyStatus } = useSelector(
      (state) => state.userStore
    ),
    [verifyVisible, setVerifyVisible] = useState(false),
    [verifyPatentList, setVerifyPatentList] = useState([]),
    [verifyPatentLoading, setVerifyPatentLoading] = useState(false),
    dispatch = useDispatch(),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [verifyRemarks, setVerifyRemarks] = useState('');

  const showVerifyModal = (uuid, isVerify, verifyRemarks) => {
    setVerifyRemarks(verifyRemarks);
    dispatch(userAction.setStaffPatentUuid(uuid));
    dispatch(userAction.setStaffPatentVerifyStatus(isVerify));
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
    setVerifyRemarks('');
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setVerifyPatentLoading(true);

        const verifyPatentList = await proxyFetch(
          GET_VERIFY_PATENT_LIST,
          { staffUuid },
          'GET'
        );

        if (verifyPatentList) {
          setVerifyPatentList(verifyPatentList);
          setVerifyVisible(false);
        }

        setIsNeedRefresh(false);
        setVerifyPatentLoading(false);
      }
    })();
  }, [staffUuid, isNeedRefresh]);

  const handleSetFailStatus = () => {
    if (verifyRemarks) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_VERIFY_PATENT_FAIL_STATUS, {
          uuid: staffPatentUuid,
          verifyRemarks,
          staffUuid,
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

      const res = await proxyFetch(SET_VERIFY_PATENT_SUCCESS_STATUS, {
        uuid: staffPatentUuid,
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
          <Icon type='tool' className='icon' />
          <span>专利</span>
        </div>
        <Modal
          title='请核实'
          visible={verifyVisible}
          onCancel={() => {
            hideVerifyModal();
            dispatch(userAction.setStaffPatentVerifyStatus(''));
          }}
          footer={null}
        >
          <div className='button-box'>
            <Button
              type='primary'
              disabled={staffPatentVerifyStatus !== '未核实'}
              className={
                staffPatentVerifyStatus !== '未核实' ? '' : 'fail-button'
              }
              loading={statusLoading}
              onClick={handleSetFailStatus}
            >
              核实未通过
            </Button>
            <Button
              type='primary'
              loading={statusLoading}
              disabled={staffPatentVerifyStatus !== '未核实'}
              className={
                staffPatentVerifyStatus !== '未核实' ? '' : 'success-button'
              }
              onClick={() => {
                confirm({
                  title: '确认核实通过?',
                  okType: 'primary',
                  content: (
                    <div className='text-box'>
                      <span>我已核实完该</span>
                      <span className='important-text'>专利</span>
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
            disabled={staffPatentVerifyStatus !== '未核实'}
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
        <Skeleton loading={verifyPatentLoading}>
          {verifyPatentList?.length ? (
            verifyPatentList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`专利${index + 1}:  ${item.patentName}`}</span>
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
                <Descriptions.Item label='专利类型'>
                  {item.patentType}
                </Descriptions.Item>
                <Descriptions.Item label='授权号' span={2}>
                  {item.patentCode}
                </Descriptions.Item>
                <Descriptions.Item label='授权国家和地区' span={3}>
                  {item.patentNation}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写专利</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
