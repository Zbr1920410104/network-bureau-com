import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_PATENT_LIST } from '@/constants/api-constants';

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
    dispatch = useDispatch();

  const showReviewPatentModal = (uuid) => {
    dispatch(userAction.setStaffPatentUuid(uuid));
    setReviewPatentVisible(true);
  };

  const hideReviewPatentModal = () => {
    setReviewPatentVisible(false);
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
