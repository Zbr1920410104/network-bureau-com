import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  GET_REVIEW_COPYRIGHT_LIST,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import scoreToColor from '@/components/home/review-manager/detail/util/score-to-color';
import moment from 'moment';

import ReviewCopyrightContent from '@/components/home/review-manager/copyright/Review-copyright-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Modal, Button, Icon, Descriptions, Skeleton, Tag } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const [reviewCopyrightVisible, setReviewCopyrightVisible] = useState(false),
    { staffUuid, reviewCopyright } = useSelector((state) => state.userStore),
    [reviewCopyrightList, setReviewCopyrightList] = useState([]),
    [reviewCopyrightLoading, setReviewCopyrightLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [firstReviewCopyrightUrl, setFirstReviewCopyrightUrl] = useState(''),
    [secondReviewCopyrightUrl, setSecondReviewCopyrightUrl] = useState(''),
    [thirdReviewCopyrightUrl, setThirdReviewCopyrightUrl] = useState(''),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [uploadCopyrightVisible, setUploadCopyrightVisible] = useState(false),
    dispatch = useDispatch();

  const showReviewCopyrightModal = (uuid) => {
    dispatch(userAction.setStaffCopyrightUuid(uuid));
    setReviewCopyrightVisible(true);
  };

  const hideReviewCopyrightModal = () => {
    dispatch(userAction.setStaffCopyrightUuid(''));
    setReviewCopyrightVisible(false);
  };

  const showUploadCopyrightModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstReviewCopyrightUrl(firstUrl);
    setSecondReviewCopyrightUrl(secondUrl);
    setThirdReviewCopyrightUrl(thirdUrl);
    setUploadCopyrightVisible(true);
  };

  const hideUploadCopyrightModal = () => {
    setUploadCopyrightVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setReviewCopyrightLoading(true);

        const reviewCopyrightList = await proxyFetch(
          GET_REVIEW_COPYRIGHT_LIST,
          { staffUuid },
          'GET'
        );

        if (reviewCopyrightList) {
          setReviewCopyrightVisible(false);
          setReviewCopyrightList(reviewCopyrightList);
          dispatch(userAction.setReviewCopyright(false));
        }

        let tempScore = 0;
        const sum = reviewCopyrightList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, tempScore);
        setScore(sum.toFixed(2));

        setIsNeedRefresh(false);
        setReviewCopyrightLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid, dispatch]);

  useEffect(() => {
    if (firstReviewCopyrightUrl) {
      (async () => {
        setGetFileLoading(true);

        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstReviewCopyrightUrl },
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
        if (secondReviewCopyrightUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondReviewCopyrightUrl },
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
        if (thirdReviewCopyrightUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdReviewCopyrightUrl },
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
  }, [firstReviewCopyrightUrl, secondReviewCopyrightUrl, thirdReviewCopyrightUrl]);

  useEffect(() => {
    if (reviewCopyright) {
      setIsNeedRefresh(true);
      dispatch(userAction.setReviewAward(false));
    }
  }, [reviewCopyright, dispatch]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='audit' className='icon' />
        <span>软件著作权</span>
        <Tag className='content-tag' color={scoreToColor(score)}>
          {score || score === 0 ? `总评分:${score}` : '未评分'}
        </Tag>
      </div>
      <Modal
        title='评分'
        visible={reviewCopyrightVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideReviewCopyrightModal();
            },
            onCancel() { },
          });
        }}
        footer={null}
      >
        <ReviewCopyrightContent />
      </Modal>
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
            {firstReviewCopyrightUrl ? (
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
            {secondReviewCopyrightUrl ? (
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
            {thirdReviewCopyrightUrl ? (
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
      <div className='review-description-box'>
        <Skeleton loading={reviewCopyrightLoading}>
          {reviewCopyrightList?.length ? (
            reviewCopyrightList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='review-description-title'>
                    <div className='description-title-text'>
                      <span>{`软件著作权${index + 1}:  ${item.copyrightName
                        }`}</span>
                      <Tag
                        className='content-tag'
                        color={scoreToColor(item.score)}
                      >
                        {item.score || item.score === 0
                          ? `评分:${item.score}`
                          : '未评分'}
                      </Tag>
                      {/* <span>
                        {item.reviewTime
                          ? moment(item.reviewTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''}
                      </span> */}
                    </div>
                    <div className='description-title-button'>
                      <Button
                        icon='radar-chart'
                        type='link'
                        onClick={() => {
                          showReviewCopyrightModal(item.uuid);
                        }}
                      >
                        评分
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
