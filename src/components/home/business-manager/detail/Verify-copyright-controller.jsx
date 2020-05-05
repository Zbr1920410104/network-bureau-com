import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_VERIFY_COPYRIGHT_LIST,
  SET_VERIFY_COPYRIGHT_FAIL_STATUS,
  SET_VERIFY_COPYRIGHT_SUCCESS_STATUS,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/business-manager/detail/util/verify-status-to-color';

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
  const [verifyVisible, setVerifyVisible] = useState(false),
    { staffUuid, staffCopyrightUuid, staffCopyrightVerifyStatus } = useSelector(
      (state) => state.userStore
    ),
    [verifyCopyrightList, setVerifyCopyrightList] = useState([]),
    [verifyCopyrightLoading, setVerifyCopyrightLoading] = useState(false),
    dispatch = useDispatch(),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [verifyRemarks, setVerifyRemarks] = useState('');

  const showVerifyModal = (uuid, isVerify, verifyRemarks) => {
    setVerifyRemarks(verifyRemarks);
    dispatch(userAction.setStaffCopyrightUuid(uuid));
    dispatch(userAction.setStaffCopyrightVerifyStatus(isVerify));
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
    setVerifyRemarks('');
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setVerifyCopyrightLoading(true);

        const verifyCopyrightList = await proxyFetch(
          GET_VERIFY_COPYRIGHT_LIST,
          { staffUuid },
          'GET'
        );

        if (verifyCopyrightList) {
          setVerifyVisible(false);
          setVerifyCopyrightList(verifyCopyrightList);
        }

        setIsNeedRefresh(false);
        setVerifyCopyrightLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid]);

  const handleSetFailStatus = () => {
    if (verifyRemarks) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_VERIFY_COPYRIGHT_FAIL_STATUS, {
          uuid: staffCopyrightUuid,
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

      const res = await proxyFetch(SET_VERIFY_COPYRIGHT_SUCCESS_STATUS, {
        uuid: staffCopyrightUuid,
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
          <Icon type='audit' className='icon' />
          <span>软件著作权</span>
        </div>
        <Modal
          title='请核实'
          visible={verifyVisible}
          onCancel={() => {
            hideVerifyModal();
            dispatch(userAction.setStaffCopyrightVerifyStatus(''));
          }}
          footer={null}
        >
          <div className='button-box'>
            <Button
              type='primary'
              disabled={staffCopyrightVerifyStatus !== '未核实'}
              className={
                staffCopyrightVerifyStatus !== '未核实' ? '' : 'fail-button'
              }
              loading={statusLoading}
              onClick={handleSetFailStatus}
            >
              核实未通过
            </Button>
            <Button
              type='primary'
              loading={statusLoading}
              disabled={staffCopyrightVerifyStatus !== '未核实'}
              className={
                staffCopyrightVerifyStatus !== '未核实' ? '' : 'success-button'
              }
              onClick={() => {
                confirm({
                  title: '确认核实通过?',
                  okType: 'primary',
                  content: (
                    <div className='text-box'>
                      <span>我已核实完该</span>
                      <span className='important-text'>软件著作权</span>
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
            disabled={staffCopyrightVerifyStatus !== '未核实'}
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
        <Skeleton loading={verifyCopyrightLoading}>
          {verifyCopyrightList?.length ? (
            verifyCopyrightList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`软件著作权${index + 1}:  ${
                        item.copyrightName
                      }`}</span>
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
                <Descriptions.Item label='权利取得方式'>
                  {item.copyrightType}
                </Descriptions.Item>
                <Descriptions.Item label='登记号'>
                  {item.copyrightCode}
                </Descriptions.Item>
                <Descriptions.Item label='授权范围'>
                  {item.copyrightArrange}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写软件著作权</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
