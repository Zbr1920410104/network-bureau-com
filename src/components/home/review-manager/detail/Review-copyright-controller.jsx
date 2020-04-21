import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_COPYRIGHT_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

import ReviewCopyrightContent from '@/components/home/review-manager/copyright/Review-copyright-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Modal, Button, Icon, Descriptions, Skeleton } from 'antd';

export default (props) => {
  const [reviewCopyrightVisible, setReviewCopyrightVisible] = useState(false),
    { staffUuid, reviewCopyright } = useSelector((state) => state.userStore),
    [reviewCopyrightList, setReviewCopyrightList] = useState([]),
    [reviewCopyrightLoading, setReviewCopyrightLoading] = useState(false),
    dispatch = useDispatch();

  const showReviewCopyrightModal = () => {
    setReviewCopyrightVisible(true);
  };

  const hideReviewCopyrightModal = () => {
    setReviewCopyrightVisible(false);
  };

  useEffect(() => {
    (async () => {
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

      setReviewCopyrightLoading(false);
    })();
  }, [reviewCopyright, staffUuid, dispatch]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='audit' className='icon' />
        <span>软件著作权</span>
      </div>
      <Modal
        title='打分'
        visible={reviewCopyrightVisible}
        onOk={hideReviewCopyrightModal}
        onCancel={hideReviewCopyrightModal}
        okText='确定'
        cancelText='取消'
      >
        <ReviewCopyrightContent />
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
                      <span>{`软件著作权${index + 1}:  ${
                        item.copyrightName
                      }`}</span>
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
                        onClick={showReviewCopyrightModal}
                      >
                        打分
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
