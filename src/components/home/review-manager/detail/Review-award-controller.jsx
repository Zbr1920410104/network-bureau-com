import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_AWARD_LIST, GET_FILE_URL } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

import ReviewAwardContent from '@/components/home/review-manager/award/Review-award-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Modal, Icon, Skeleton, Descriptions } from 'antd';

export default (props) => {
  const { staffUuid } = useSelector((state) => state.userStore),
    [uploadAwardVisible, setUploadAwardVisible] = useState(false),
    [reviewAwardVisible, setReviewAwardVisible] = useState(false),
    [reviewAwardList, setReviewAwardList] = useState([]),
    [reviewAwardUrl, setReviewAwardUrl] = useState(''),
    [previewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [reviewAwardLoading, setReviewAwardLoading] = useState(false),
    dispatch = useDispatch();

  const showUploadAwardModal = (url) => {
    setReviewAwardUrl(url);
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    setUploadAwardVisible(false);
  };

  const showReviewAwardModal = () => {
    setReviewAwardVisible(true);
  };

  const hideReviewAwardModal = () => {
    setReviewAwardVisible(false);
  };

  useEffect(() => {
    (async () => {
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
        dispatch(userAction.setReviewAward(false));
      }

      setReviewAwardLoading(false);
    })();
  }, [staffUuid, dispatch]);

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
      </div>
      <Modal
        title='下载附件'
        visible={uploadAwardVisible}
        onOk={hideUploadAwardModal}
        onCancel={hideUploadAwardModal}
        okText='保存'
        cancelText='取消'
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
        title='打分'
        visible={reviewAwardVisible}
        onOk={hideReviewAwardModal}
        onCancel={hideReviewAwardModal}
        okText='确定'
        cancelText='取消'
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
                      <span>{`${item.score ? item.score : '未打'}分`}</span>
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
                        onClick={showReviewAwardModal}
                      >
                        打分
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
