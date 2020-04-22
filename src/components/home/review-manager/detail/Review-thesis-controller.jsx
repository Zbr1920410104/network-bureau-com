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

import moment from 'moment';

import ReviewThesisContent from '@/components/home/review-manager/thesis/Review-thesis-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Icon, Button, Modal, Descriptions, Skeleton } from 'antd';

export default (props) => {
  const { staffUuid, reviewThesis } = useSelector((state) => state.userStore),
    [reviewThesisVisible, setReviewThesisVisible] = useState(false),
    [uploadThesisVisible, setUploadThesisVisible] = useState(false),
    [reviewThesisList, setReviewThesisList] = useState([]),
    [reviewThesisUrl, setReviewThesisUrl] = useState(''),
    [previewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [reviewThesisLoading, setReviewThesisLoading] = useState(false),
    dispatch = useDispatch();

  const showReviewThesisModal = () => {
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

      setReviewThesisLoading(false);
    })();
  }, [reviewThesis, staffUuid, dispatch]);

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
      </div>
      <Modal
        title='打分'
        visible={reviewThesisVisible}
        onOk={hideReviewThesisModal}
        onCancel={hideReviewThesisModal}
        okText='确定'
        cancelText='取消'
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
                        onClick={showReviewThesisModal}
                      >
                        打分
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
