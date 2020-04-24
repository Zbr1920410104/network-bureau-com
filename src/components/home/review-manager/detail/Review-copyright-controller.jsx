import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_COPYRIGHT_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import scoreToColor from '@/components/home/review-manager/detail/util/score-to-color';
// import moment from 'moment';

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
    dispatch = useDispatch();

  const showReviewCopyrightModal = (uuid) => {
    dispatch(userAction.setStaffCopyrightUuid(uuid));
    setReviewCopyrightVisible(true);
  };

  const hideReviewCopyrightModal = () => {
    setReviewCopyrightVisible(false);
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
            onCancel() {},
          });
        }}
        footer={null}
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
