import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_REVIEW_PATENT_LIST,
  GET_FILE_URL,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import scoreToColor from '@/components/home/review-manager/detail/util/score-to-color';
// import moment from 'moment';

import ReviewPatentContent from '@/components/home/review-manager/patent/Review-patent-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Modal, Icon, Skeleton, Descriptions, Tag } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { staffUuid, reviewPatent } = useSelector((state) => state.userStore),
    [reviewPatentVisible, setReviewPatentVisible] = useState(false),
    [reviewPatentList, setReviewPatentList] = useState([]),
    [reviewPatentLoading, setReviewPatentLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [firstReviewPatentUrl, setFirstReviewPatentUrl] = useState(''),
    [secondReviewPatentUrl, setSecondReviewPatentUrl] = useState(''),
    [thirdReviewPatentUrl, setThirdReviewPatentUrl] = useState(''),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [uploadPatentVisible, setUploadPatentVisible] = useState(false),
    dispatch = useDispatch();

  const showReviewPatentModal = (uuid) => {
    dispatch(userAction.setStaffPatentUuid(uuid));
    setReviewPatentVisible(true);
  };

  const hideReviewPatentModal = () => {
    dispatch(userAction.setStaffPatentUuid(''));
    setReviewPatentVisible(false);
  };

  const showUploadPatentModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstReviewPatentUrl(firstUrl);
    setSecondReviewPatentUrl(secondUrl);
    setThirdReviewPatentUrl(thirdUrl);
    setUploadPatentVisible(true);
  };

  const hideUploadPatentModal = () => {
    setUploadPatentVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setReviewPatentLoading(true);

        const reviewPatentList = await proxyFetch(
          GET_REVIEW_PATENT_LIST,
          { staffUuid },
          'GET'
        );

        if (reviewPatentList) {
          setReviewPatentList(reviewPatentList);
          setReviewPatentVisible(false);
          dispatch(userAction.setReviewPatent(false));
        }

        let tempScore = 0;
        const sum = reviewPatentList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, tempScore);
        setScore(sum.toFixed(2));

        setIsNeedRefresh(false);
        setReviewPatentLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid, dispatch]);

  useEffect(() => {
    if (reviewPatent) {
      setIsNeedRefresh(true);
      dispatch(userAction.setReviewAward(false));
    }
  }, [reviewPatent, dispatch]);

  useEffect(() => {
    if (firstReviewPatentUrl) {
      (async () => {
        setGetFileLoading(true);

        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstReviewPatentUrl },
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
        if (secondReviewPatentUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondReviewPatentUrl },
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
        if (thirdReviewPatentUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdReviewPatentUrl },
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
  }, [firstReviewPatentUrl, secondReviewPatentUrl, thirdReviewPatentUrl]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='tool' className='icon' />
        <span>专利</span>
        <Tag className='content-tag' color={scoreToColor(score)}>
          {score || score === 0 ? `总评分:${score}` : '未评分'}
        </Tag>
      </div>
      <Modal
        title='查看附件'
        visible={uploadPatentVisible}
        onCancel={hideUploadPatentModal}
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
            {firstReviewPatentUrl ? (
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
            {secondReviewPatentUrl ? (
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
            {thirdReviewPatentUrl ? (
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
      <Modal
        title='评分'
        visible={reviewPatentVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideReviewPatentModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
      >
        <ReviewPatentContent />
      </Modal>
      <div className='review-description-box'>
        <Skeleton loading={reviewPatentLoading}>
          {reviewPatentList?.length ? (
            reviewPatentList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='review-description-title'>
                    <div className='description-title-text'>
                      <span>{`专利${index + 1}:  ${item.patentName}`}</span>
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
                          showReviewPatentModal(item.uuid);
                        }}
                      >
                        评分
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
                <Descriptions.Item label='查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadPatentModal(
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
            <span>未填写专利</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
