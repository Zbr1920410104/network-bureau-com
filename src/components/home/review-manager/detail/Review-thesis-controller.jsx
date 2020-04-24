import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_REVIEW_THESIS_LIST,
  GET_FILE_URL,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import scoreToColor from '@/components/home/review-manager/detail/util/score-to-color';
import moment from 'moment';

import ReviewThesisContent from '@/components/home/review-manager/thesis/Review-thesis-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Icon, Button, Modal, Descriptions, Skeleton, Tag } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { staffUuid, reviewThesis } = useSelector((state) => state.userStore),
    [reviewThesisVisible, setReviewThesisVisible] = useState(false),
    [uploadThesisVisible, setUploadThesisVisible] = useState(false),
    [reviewThesisList, setReviewThesisList] = useState([]),
    [reviewThesisUrl, setReviewThesisUrl] = useState(''),
    [previewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [reviewThesisLoading, setReviewThesisLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    dispatch = useDispatch();

  const showReviewThesisModal = (uuid) => {
    dispatch(userAction.setStaffThesisUuid(uuid));
    setReviewThesisVisible(true);
  };

  const hideReviewThesisModal = () => {
    setReviewThesisVisible(false);
  };

  const showUploadThesisModal = (url) => {
    setReviewThesisUrl(url);
    setUploadThesisVisible(true);
  };

  const hideUploadThesisModal = () => {
    setUploadThesisVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setReviewThesisLoading(true);

        const reviewThesisList = await proxyFetch(
          GET_REVIEW_THESIS_LIST,
          { staffUuid },
          'GET'
        );

        if (reviewThesisList) {
          setReviewThesisList(reviewThesisList);
          setUploadThesisVisible(false);
          setReviewThesisVisible(false);
          dispatch(userAction.setReviewThesis(false));
        }

        let tempScore = 0;
        const sum = reviewThesisList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, tempScore);
        setScore(sum.toFixed(2));

        setIsNeedRefresh(false);
        setReviewThesisLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid, dispatch]);

  useEffect(() => {
    if (reviewThesis) {
      setIsNeedRefresh(true);
      dispatch(userAction.setReviewThesis(false));
    }
  }, [reviewThesis, dispatch]);

  useEffect(() => {
    if (reviewThesisUrl) {
      (async () => {
        setGetFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: reviewThesisUrl },
          'GET'
        );

        setPreviewUrl(previewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [reviewThesisUrl]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='book' className='icon' />
        <span>论文/专著</span>
        <Tag className='content-tag' color={scoreToColor(score)}>
          {score || score === 0 ? `总评分:${score}` : '未评分'}
        </Tag>
      </div>
      <Modal
        title='评分'
        visible={reviewThesisVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideReviewThesisModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
      >
        <ReviewThesisContent />
      </Modal>
      <Modal
        title='查看附件'
        visible={uploadThesisVisible}
        onCancel={hideUploadThesisModal}
        footer={null}
      >
        <div className='download-button-box'>
          {reviewThesisUrl ? (
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
      <div className='review-description-box'>
        <Skeleton loading={reviewThesisLoading}>
          {reviewThesisList?.length ? (
            reviewThesisList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='review-description-title'>
                    <div className='description-title-text'>
                      <span>{`论文/专著${index + 1}:  ${
                        item.thesisTitle
                      }`}</span>
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
                          showReviewThesisModal(item.uuid);
                        }}
                      >
                        评分
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions.Item label='类型'>
                  {item.thesisType}
                </Descriptions.Item>
                <Descriptions.Item label='发表时间'>
                  {item.thesisTime
                    ? moment(item.thesisTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                {item.thesisType === '论文' ? (
                  <>
                    <Descriptions.Item label='发表期刊名称'>
                      {item.thesisJournal}
                    </Descriptions.Item>
                    <Descriptions.Item label='期刊级别'>
                      {item.thesisGrade}
                    </Descriptions.Item>
                    <Descriptions.Item label='论文索引号'>
                      {item.thesisCode}
                    </Descriptions.Item>
                  </>
                ) : null}
                <Descriptions.Item label='第一作者'>
                  {item.thesisFirstAuthor}
                </Descriptions.Item>
                <Descriptions.Item label='提交人作者次序'>
                  {item.thesisAuthorSequence}
                </Descriptions.Item>
                <Descriptions.Item label='查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadThesisModal(item.url);
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
            <span>未填写论文/专著</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
