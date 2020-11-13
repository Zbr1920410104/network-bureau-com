import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_VERIFY_AWARD_LIST,
  GET_FILE_URL,
  SET_VERIFY_AWARD_FAIL_STATUS,
  SET_VERIFY_AWARD_SUCCESS_STATUS,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/business-manager/detail/util/verify-status-to-color';
import moment from 'moment';

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
  Alert,
} from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid, staffAwardUuid, staffAwardVerifyStatus } = useSelector(
      (state) => state.userStore
    ),
    [verifyVisible, setVerifyVisible] = useState(false),
    [verifyAwardList, setVerifyAwardList] = useState([]),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [firstVerifyAwardUrl, setFirstVerifyAwardUrl] = useState(''),
    [secondVerifyAwardUrl, setSecondVerifyAwardUrl] = useState(''),
    [thirdVerifyAwardUrl, setThirdVerifyAwardUrl] = useState(''),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [verifyAwardLoading, setVerifyAwardLoading] = useState(false),
    [uploadAwardVisible, setUploadAwardVisible] = useState(false),
    dispatch = useDispatch(),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [verifyRemarks, setVerifyRemarks] = useState('');

  const showVerifyModal = (uuid, isVerify, verifyRemarks) => {
    setVerifyRemarks(verifyRemarks);
    dispatch(userAction.setStaffAwardUuid(uuid));
    dispatch(userAction.setStaffAwardVerifyStatus(isVerify));
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
    setVerifyRemarks('');
  };

  const showUploadAwardModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstVerifyAwardUrl(firstUrl);
    setSecondVerifyAwardUrl(secondUrl);
    setThirdVerifyAwardUrl(thirdUrl);
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    setUploadAwardVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setVerifyAwardLoading(true);

        const verifyAwardList = await proxyFetch(
          GET_VERIFY_AWARD_LIST,
          { staffUuid },
          'GET'
        );

        if (verifyAwardList) {
          setVerifyAwardList(verifyAwardList);
          setVerifyVisible(false);
          setUploadAwardVisible(false);
        }

        setIsNeedRefresh(false);
        setVerifyAwardLoading(false);
      }
    })();
  }, [staffUuid, isNeedRefresh]);

  useEffect(() => {
    if (firstVerifyAwardUrl) {
      (async () => {
        setGetFileLoading(true);

        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstVerifyAwardUrl },
          'GET'
        );

        setFirstPreviewUrl(firstPreviewUrl);
        const firstUrlArr = firstPreviewUrl.split('?');
        const firstUrlArrList = firstUrlArr[0],
          firstAppU = firstUrlArrList.split('/');
        const firstFileName = firstAppU[firstAppU.length - 1];
        setFirstFileName(firstFileName.split('.')[1].toLowerCase());

        // 附件2的url处理
        let secondPreviewUrl = '';
        if (secondVerifyAwardUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondVerifyAwardUrl },
            'GET'
          );

          const secondUrlArr = secondPreviewUrl.split('?');
          const secondUrlArrList = secondUrlArr[0],
            secondAppU = secondUrlArrList.split('/');
          const secondFileName = secondAppU[secondAppU.length - 1];
          setSecondFileName(secondFileName.split('.')[1].toLowerCase());
        }
        setSecondPreviewUrl(secondPreviewUrl);

        // 附件3的url处理
        let thirdPreviewUrl = '';
        if (thirdVerifyAwardUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdVerifyAwardUrl },
            'GET'
          );

          const thirdUrlArr = thirdPreviewUrl.split('?');
          const thirdUrlArrList = thirdUrlArr[0],
            thirdAppU = thirdUrlArrList.split('/');
          const thirdFileName = thirdAppU[thirdAppU.length - 1];
          setThirdFileName(thirdFileName.split('.')[1].toLowerCase());
        }
        setThirdPreviewUrl(thirdPreviewUrl);

        setGetFileLoading(false);
      })();
    }
  }, [firstVerifyAwardUrl, secondVerifyAwardUrl, thirdVerifyAwardUrl]);

  const handleSetFailStatus = () => {
    if (verifyRemarks) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_VERIFY_AWARD_FAIL_STATUS, {
          uuid: staffAwardUuid,
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

      const res = await proxyFetch(SET_VERIFY_AWARD_SUCCESS_STATUS, {
        uuid: staffAwardUuid,
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
          <Icon type='trophy' className='icon' />
          <span>获奖情况</span>
        </div>
        <Modal
          title='请核实'
          visible={verifyVisible}
          onCancel={() => {
            hideVerifyModal();
            dispatch(userAction.setStaffAwardVerifyStatus(''));
          }}
          footer={null}
        >
          <div className='button-box'>
            <Button
              type='primary'
              disabled={staffAwardVerifyStatus !== '未核实'}
              className={
                staffAwardVerifyStatus !== '未核实' ? '' : 'fail-button'
              }
              loading={statusLoading}
              onClick={handleSetFailStatus}
            >
              核实未通过
            </Button>
            <Button
              type='primary'
              loading={statusLoading}
              disabled={staffAwardVerifyStatus !== '未核实'}
              className={
                staffAwardVerifyStatus !== '未核实' ? '' : 'success-button'
              }
              onClick={() => {
                confirm({
                  title: '确认核实通过?',
                  okType: 'primary',
                  content: (
                    <div className='text-box'>
                      <span>我已核实完该</span>
                      <span className='important-text'>获奖情况</span>
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
            disabled={staffAwardVerifyStatus !== '未核实'}
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
      <Modal
        title='查看附件'
        visible={uploadAwardVisible}
        onCancel={hideUploadAwardModal}
        footer={null}
      >
        <div className='download-button-box'>
          <div className='inner-button-box'>
            {firstFileName === 'jpg' ||
            firstFileName === 'jpeg' ||
            firstFileName === 'png' ? (
              <img
                src={firstPreviewUrl}
                alt='avatar'
                style={{ width: '100%' }}
                className='img'
              />
            ) : null}
            {firstVerifyAwardUrl ? (
              <Button
                type='primary'
                size='large'
                className='download-button'
                icon='download'
                loading={getFileLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    firstFileName === 'doc' ||
                    firstFileName === 'docx' ||
                    firstFileName === 'xls' ||
                    firstFileName === 'xlsx'
                  ) {
                    window.open(
                      `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                        firstPreviewUrl
                      )}`
                    );
                  } else {
                    window.open(firstPreviewUrl, '_blank');
                  }
                }}
              >
                查看附件1
              </Button>
            ) : (
              <Button disabled>附件1未上传</Button>
            )}
          </div>
          <div className='inner-button-box'>
            {secondFileName === 'jpg' ||
            secondFileName === 'jpeg' ||
            secondFileName === 'png' ? (
              <img
                src={secondPreviewUrl}
                alt='avatar'
                style={{ width: '100%' }}
                className='img'
              />
            ) : null}
            {secondVerifyAwardUrl ? (
              <Button
                type='primary'
                size='large'
                className='download-button'
                icon='download'
                loading={getFileLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    secondFileName === 'doc' ||
                    secondFileName === 'docx' ||
                    secondFileName === 'xls' ||
                    secondFileName === 'xlsx'
                  ) {
                    window.open(
                      `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                        secondPreviewUrl
                      )}`
                    );
                  } else {
                    window.open(secondPreviewUrl, '_blank');
                  }
                }}
              >
                查看附件2
              </Button>
            ) : (
              <Button disabled>附件2未上传</Button>
            )}
          </div>
          <div className='inner-button-box'>
            {thirdFileName === 'jpg' ||
            thirdFileName === 'jpeg' ||
            thirdFileName === 'png' ? (
              <img
                src={thirdPreviewUrl}
                alt='avatar'
                style={{ width: '100%' }}
                className='img'
              />
            ) : null}
            {thirdVerifyAwardUrl ? (
              <Button
                type='primary'
                size='large'
                className='download-button'
                icon='download'
                loading={getFileLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    thirdFileName === 'doc' ||
                    thirdFileName === 'docx' ||
                    thirdFileName === 'xls' ||
                    thirdFileName === 'xlsx'
                  ) {
                    window.open(
                      `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                        thirdPreviewUrl
                      )}`
                    );
                  } else {
                    window.open(thirdPreviewUrl, '_blank');
                  }
                }}
              >
                查看附件3
              </Button>
            ) : (
              <Button disabled>附件3未上传</Button>
            )}
          </div>
        </div>
      </Modal>
      <div className='verify-description-box'>
        <Skeleton loading={verifyAwardLoading}>
          {verifyAwardList?.length ? (
            verifyAwardList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div>
                    <div className='verify-description-title'>
                      <div className='description-title-text'>
                        <span>{`奖项${index + 1}:  ${item.awardName}`}</span>
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
                    {item.reviewRemarks ? (
                      <Alert
                        type='warning'
                        description={`评审建议: ${item.reviewRemarks}`}
                      />
                    ) : null}
                  </div>
                }
              >
                <Descriptions.Item label='奖项类型'>
                  {item.awardType}
                </Descriptions.Item>
                <Descriptions.Item label='获奖时间'>
                  {item.awardTime
                    ? moment(item.awardTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='奖项级别'>
                  {item.awardGrade}
                </Descriptions.Item>
                <Descriptions.Item label='颁奖部门'>
                  {item.awardDepartment}
                </Descriptions.Item>
                {item.awardNameList ? (
                  <Descriptions.Item label='获奖名单' span={2}>
                    {item.awardNameList}
                  </Descriptions.Item>
                ) : null}
                <Descriptions.Item label='查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadAwardModal(
                        item.firstUrl,
                        item.secondUrl,
                        item.thirdUrl
                      );
                    }}
                    className='link-button'
                  >
                    <Icon type='download' />
                    <span>查看</span>
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写奖项</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
