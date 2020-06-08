import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_REVIEW_PROJECT_LIST,
  GET_FILE_URL,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import scoreToColor from '@/components/home/review-manager/detail/util/score-to-color';
import moment from 'moment';

import ReviewProjectContent from '@/components/home/review-manager/project/Review-project-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Modal, Icon, Skeleton, Descriptions, Tag } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { staffUuid, reviewProject } = useSelector((state) => state.userStore),
    [reviewProjectVisible, setReviewProjectVisible] = useState(false),
    [reviewProjectList, setReviewProjectList] = useState([]),
    [reviewProjectLoading, setReviewProjectLoading] = useState(false),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [firstReviewProjectUrl, setFirstReviewProjectUrl] = useState(''),
    [secondReviewProjectUrl, setSecondReviewProjectUrl] = useState(''),
    [thirdReviewProjectUrl, setThirdReviewProjectUrl] = useState(''),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [uploadProjectVisible, setUploadProjectVisible] = useState(false),
    dispatch = useDispatch();

  const showReviewProjectModal = (uuid) => {
    dispatch(userAction.setStaffProjectUuid(uuid));
    setReviewProjectVisible(true);
  };

  const hideReviewProjectModal = () => {
    dispatch(userAction.setStaffProjectUuid(''));
    setReviewProjectVisible(false);
  };

  const showUploadProjectModal = (firstUrl, secondUrl, thirdUrl) => {
    setFirstReviewProjectUrl(firstUrl);
    setSecondReviewProjectUrl(secondUrl);
    setThirdReviewProjectUrl(thirdUrl);
    setUploadProjectVisible(true);
  };

  const hideUploadProjectModal = () => {
    setUploadProjectVisible(false);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
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

        let tempScore = 0;
        const sum = reviewProjectList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, tempScore);
        setScore(sum.toFixed(2));

        setIsNeedRefresh(false);
        setReviewProjectLoading(false);
      }
    })();
  }, [isNeedRefresh, staffUuid, dispatch]);

  useEffect(() => {
    if (firstReviewProjectUrl) {
      (async () => {
        setGetFileLoading(true);

        // 附件1的url处理
        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstReviewProjectUrl },
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
        if (secondReviewProjectUrl) {
          secondPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: secondReviewProjectUrl },
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
        if (thirdReviewProjectUrl) {
          thirdPreviewUrl = await proxyFetch(
            GET_FILE_URL,
            { fileUrl: thirdReviewProjectUrl },
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
  }, [firstReviewProjectUrl, secondReviewProjectUrl, thirdReviewProjectUrl]);

  useEffect(() => {
    if (reviewProject) {
      setIsNeedRefresh(true);
      dispatch(userAction.setReviewAward(false));
    }
  }, [reviewProject, dispatch]);

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='file-done' className='icon' />
        <span>项目</span>
        <Tag className='content-tag' color={scoreToColor(score)}>
          {score || score === 0 ? `总评分:${score}` : '未评分'}
        </Tag>
      </div>
      <Modal
        title='查看附件'
        visible={uploadProjectVisible}
        onCancel={hideUploadProjectModal}
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
            {firstReviewProjectUrl ? (
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
            {secondReviewProjectUrl ? (
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
            {thirdReviewProjectUrl ? (
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
        visible={reviewProjectVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideReviewProjectModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
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
                      <Tag
                        className='content-tag'
                        color={scoreToColor(item.score)}
                      >
                        {item.score || item.score === 0
                          ? `评分:${item.score}`
                          : '未评分'}
                      </Tag>
                      {/* <span>
                        {item.verifyTime
                          ? moment(item.verifyTime).format(
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
                          showReviewProjectModal(item.uuid);
                        }}
                      >
                        评分
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
                <Descriptions.Item label='查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadProjectModal(
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
            <span>未填写项目</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
