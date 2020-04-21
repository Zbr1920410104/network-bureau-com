import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_PATENT_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

import ReviewPatentContent from '@/components/home/review-manager/patent/Review-patent-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Modal, Icon, Skeleton, Descriptions } from 'antd';

export default (props) => {
  const { staffUuid } = useSelector((state) => state.userStore),
    [reviewPatentVisible, setReviewPatentVisible] = useState(false),
    [reviewPatentList, setReviewPatentList] = useState([]),
    [reviewPatentLoading, setReviewPatentLoading] = useState(false),
    dispatch = useDispatch();

  const showReviewPatentModal = () => {
    setReviewPatentVisible(true);
  };

  const hideReviewPatentModal = () => {
    setReviewPatentVisible(false);
  };

  useEffect(() => {
    (async () => {
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

      setReviewPatentLoading(false);
    })();
  }, [staffUuid, dispatch]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='tool' className='icon' />
        <span>专利</span>
      </div>
      <Modal
        title='打分'
        visible={reviewPatentVisible}
        onOk={hideReviewPatentModal}
        onCancel={hideReviewPatentModal}
        okText='确定'
        cancelText='取消'
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
                        onClick={showReviewPatentModal}
                      >
                        打分
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
