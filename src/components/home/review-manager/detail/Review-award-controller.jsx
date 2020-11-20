import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_AWARD_LIST, GET_FILE_URL } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import scoreToColor from '@/components/home/review-manager/detail/util/score-to-color';
import moment from 'moment';

import ReviewAwardContent from '@/components/home/review-manager/award/Review-award-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Modal, Icon, Skeleton, Descriptions, Tag } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { staffUuid, reviewAward } = useSelector((state) => state.userStore),
    [uploadAwardVisible, setUploadAwardVisible] = useState(false),
    [reviewAwardVisible, setReviewAwardVisible] = useState(false),
    [reviewAwardList, setReviewAwardList] = useState([]),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [firstReviewAwardUrl, setFirstReviewAwardUrl] = useState(''),
    [secondReviewAwardUrl, setSecondReviewAwardUrl] = useState(''),
    [thirdReviewAwardUrl, setThirdReviewAwardUrl] = useState(''),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [reviewAwardLoading, setReviewAwardLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    dispatch = useDispatch();

  const showUploadAwardModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstReviewAwardUrl(firstUrl);
    setSecondReviewAwardUrl(secondUrl);
    setThirdReviewAwardUrl(thirdUrl);
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    setUploadAwardVisible(false);
  };

  const showReviewAwardModal = (uuid) => {
    dispatch(userAction.setStaffAwardUuid(uuid));
    setReviewAwardVisible(true);
  };

  const hideReviewAwardModal = () => {
    dispatch(userAction.setStaffAwardUuid(''));
    setReviewAwardVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setReviewAwardLoading(true);

        const reviewAwardList = await proxyFetch(
          GET_REVIEW_AWARD_LIST,
          { staffUuid },
          'GET'
        );

        if (reviewAwardList) {
          setReviewAwardList(reviewAwardList);
          setReviewAwardVisible(false);
          setUploadAwardVisible(false);
        }

        let tempScore = 0;
        const sum = reviewAwardList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, tempScore);
        setScore(sum.toFixed(2));

        setIsNeedRefresh(false);
        setReviewAwardLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid, dispatch]);

  useEffect(() => {
    if (reviewAward) {
      setIsNeedRefresh(true);
      dispatch(userAction.setReviewAward(false));
    }
  }, [reviewAward, dispatch]);

  useEffect(() => {
    if (firstReviewAwardUrl) {
      (async () => {
        setGetFileLoading(true);

        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstReviewAwardUrl },
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
        if (secondReviewAwardUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondReviewAwardUrl },
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
        if (thirdReviewAwardUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdReviewAwardUrl },
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
  }, [firstReviewAwardUrl, secondReviewAwardUrl, thirdReviewAwardUrl]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='trophy' className='icon' />
        <span>获奖情况</span>
        <Tag className='content-tag' color={scoreToColor(score)}>
          {score || score === 0 ? `总评分:${score}` : '未评分'}
        </Tag>
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
            {firstReviewAwardUrl ? (
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
            {secondReviewAwardUrl ? (
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
            {thirdReviewAwardUrl ? (
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
        visible={reviewAwardVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideReviewAwardModal();
            },
            onCancel() { },
          });
        }}
        footer={null}
      >
        <ReviewAwardContent />
      </Modal>
      <div className='review-description-box'>
        <Skeleton loading={reviewAwardLoading}>
          {reviewAwardList?.length ? (
            reviewAwardList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='review-description-title'>
                    <div className='description-title-text'>
                      <span>{`奖项${index + 1}:  ${item.awardName}`}</span>
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
                          showReviewAwardModal(item.uuid);
                        }}
                      >
                        评分
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions.Item label='奖项类型' span={2}>
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
                {item.awardRank ? (
                  <Descriptions.Item label='排名' >
                    {item.awardRank}
                  </Descriptions.Item>
                ) : null}
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
