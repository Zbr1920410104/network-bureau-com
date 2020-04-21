import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_REVIEW_PROJECT_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

import ReviewProjectContent from '@/components/home/review-manager/project/Review-project-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Modal, Icon, Skeleton, Descriptions } from 'antd';

export default (props) => {
  const { staffUuid } = useSelector((state) => state.userStore),
    [reviewProjectVisible, setReviewProjectVisible] = useState(false),
    [reviewProjectList, setReviewProjectList] = useState([]),
    [reviewProjectLoading, setReviewProjectLoading] = useState(false),
    dispatch = useDispatch();

  const showReviewProjectModal = () => {
    setReviewProjectVisible(true);
  };

  const hideReviewProjectModal = () => {
    setReviewProjectVisible(false);
  };

  useEffect(() => {
    (async () => {
      setReviewProjectLoading(true);

      const reviewProjectList = await proxyFetch(
        GET_REVIEW_PROJECT_LIST,
        { staffUuid },
        'GET'
      );

      if (reviewProjectList) {
        setReviewProjectList(reviewProjectList);
        setReviewProjectVisible(false);
        dispatch(userAction.setReviewProject(false));
      }

      setReviewProjectLoading(false);
    })();
  }, [staffUuid, dispatch]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='file-done' className='icon' />
        <span>项目</span>
      </div>
      <Modal
        title='打分'
        visible={reviewProjectVisible}
        onOk={hideReviewProjectModal}
        onCancel={hideReviewProjectModal}
        okText='确定'
        cancelText='取消'
      >
        <ReviewProjectContent />
      </Modal>
      <div className='review-description-box'>
        <Skeleton loading={reviewProjectLoading}>
          {reviewProjectList?.length ? (
            reviewProjectList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='review-description-title'>
                    <div className='description-title-text'>
                      <span>{`项目${index + 1}:  ${item.name}`}</span>
                      <span>{`${
                        item.score ? item.score : '未打'
                      }分`}</span>
                      <span>
                        {item.verifyTime
                          ? moment(item.verifyTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                        }
                      </span>
                    </div>
                    <div className='description-title-button'>
                      <Button
                        icon='radar-chart'
                        type='link'
                        onClick={showReviewProjectModal}
                      >
                        打分
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions.Item label='项目类型'>
                  {item.type === 1 ? (
                    <span>主持项目</span>
                  ) : (
                    <span>参与项目</span>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label='开始时间'>
                  {item.startTime
                    ? moment(item.startTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='结束时间'>
                  {item.endTime
                    ? moment(item.endTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='项目编号'>
                  {item.code}
                </Descriptions.Item>
                <Descriptions.Item label='项目来源'>
                  {item.resource}
                </Descriptions.Item>
                <Descriptions.Item label='项目经费'>
                  {`${item.funds}万元`}
                </Descriptions.Item>
                <Descriptions.Item label='负责人'>
                  {item.controller}
                </Descriptions.Item>
                <Descriptions.Item label='参与人名单' span={2}>
                  {item.participant}
                </Descriptions.Item>
                <Descriptions.Item label='主要研究内容' span={3}>
                  {item.content}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写项目</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
