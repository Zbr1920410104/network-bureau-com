import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  GET_VERIFY_COPYRIGHT_LIST,
  SET_VERIFY_COPYRIGHT_FAIL_STATUS,
  SET_VERIFY_COPYRIGHT_SUCCESS_STATUS,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/business-manager/detail/util/verify-status-to-color';
import moment from 'moment';

import {
  Icon,
  Button,
  Modal,
  Input,
  Descriptions,
  Skeleton,
  Tag,
  Alert,
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
    [uploadCopyrightVisible, setUploadCopyrightVisible] = useState(false),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [firstVerifyCopyrightUrl, setFirstVerifyCopyrightUrl] = useState(''),
    [secondVerifyCopyrightUrl, setSecondVerifyCopyrightUrl] = useState(''),
    [thirdVerifyCopyrightUrl, setThirdVerifyCopyrightUrl] = useState(''),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
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

  const showUploadCopyrightModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstVerifyCopyrightUrl(firstUrl);
    setSecondVerifyCopyrightUrl(secondUrl);
    setThirdVerifyCopyrightUrl(thirdUrl);
    setUploadCopyrightVisible(true);
  };

  const hideUploadCopyrightModal = () => {
    setUploadCopyrightVisible(false);
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

  useEffect(() => {
    if (firstVerifyCopyrightUrl) {
      (async () => {
        setGetFileLoading(true);
        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstVerifyCopyrightUrl },
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
        if (secondVerifyCopyrightUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondVerifyCopyrightUrl },
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
        if (thirdVerifyCopyrightUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdVerifyCopyrightUrl },
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
  }, [
    firstVerifyCopyrightUrl,
    secondVerifyCopyrightUrl,
    thirdVerifyCopyrightUrl,
  ]);

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
                  onCancel() { },
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
      <Modal
        title='查看附件'
        visible={uploadCopyrightVisible}
        onCancel={hideUploadCopyrightModal}
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
            {firstVerifyCopyrightUrl ? (
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
            {secondVerifyCopyrightUrl ? (
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
            {thirdVerifyCopyrightUrl ? (
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
        <Skeleton loading={verifyCopyrightLoading}>
          {verifyCopyrightList?.length ? (
            verifyCopyrightList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div>
                    <div className='verify-description-title'>
                      <div className='description-title-text'>
                        <span>{`软件著作权${index + 1}:  ${item.copyrightName
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
                    {item.reviewRemarks ? (
                      <Alert
                        type='warning'
                        description={`评审建议: ${item.reviewRemarks}`}
                      />
                    ) : null}
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
                <Descriptions.Item label='开发完成时间'>
                  {item.completeTime ? moment(item.completeTime).format('YYYY-MM-DD') : null}
                </Descriptions.Item>
                <Descriptions.Item label='发表时间'>
                  {item.publishTime ? moment(item.publishTime).format('YYYY-MM-DD') : null}
                </Descriptions.Item>
                <Descriptions.Item label='软件著作权权人'>
                  {item.copyrightOwner}
                </Descriptions.Item>
                <Descriptions.Item label='软著排位'>
                  {item.rank}
                </Descriptions.Item>
                <Descriptions.Item label='查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadCopyrightModal(
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
              <span>未填写软件著作权</span>
            )}
        </Skeleton>
      </div>
    </div>
  );
};
