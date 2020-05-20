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
    [reviewAwardUrl, setReviewAwardUrl] = useState(''),
    [previewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [reviewAwardLoading, setReviewAwardLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    dispatch = useDispatch();

  const showUploadAwardModal = (url) => {
    setReviewAwardUrl(url);
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
    if (reviewAwardUrl) {
      (async () => {
        setGetFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: reviewAwardUrl },
          'GET'
        );

        setPreviewUrl(previewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [reviewAwardUrl]);

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
        title='下载附件'
        visible={uploadAwardVisible}
        footer={null}
        onCancel={hideUploadAwardModal}
      >
        <div className='download-button-box'>
          {reviewAwardUrl ? (
            <a href={previewUrl}>
              <Button
                type='primary'
                size='large'
                className='download-button'
                icon='download'
                loading={getFileLoading}
              >
                下载附件
              </Button>
            </a>
          ) : (
            <Button disabled>员工未上传</Button>
          )}
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
            onCancel() {},
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
                      <span>
                        {item.reviewTime
                          ? moment(item.reviewTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''}
                      </span>
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
                      showUploadAwardModal(item.url);
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
