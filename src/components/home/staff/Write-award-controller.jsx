import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_WRITE_AWARD_LIST, DELETE_AWARD } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/staff/util/verify-status-to-color';
import scoreToColor from '@/components/home/staff/util/score-to-color';
import moment from 'moment';

import ModifyAwardContent from '@/components/home/staff/award/Modify-award-content-controller.jsx';
import CreateAwardContent from '@/components/home/staff/award/Create-award-content-controller.jsx';
import UploadAwardContent from '@/components/home/staff/award/Upload-award-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Modal, Icon, Descriptions, Skeleton, Tag, Alert } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { changeAward } = useSelector((state) => state.userStore),
    [writeAwardList, setWriteAwardList] = useState([]),
    [writeAwardLoading, setWriteAwardLoading] = useState(false),
    dispatch = useDispatch(),
    [score, setScore] = useState(0),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [newAwardVisible, setNewAwardVisible] = useState(false),
    [modifyAwardVisible, setModifyAwardVisible] = useState(false),
    [uploadAwardVisible, setUploadAwardVisible] = useState(false);

  const showNewAwardModal = () => {
    setNewAwardVisible(true);
  };

  const hideNewAwardModal = () => {
    dispatch(userAction.setAwardRefresh(true));
    setNewAwardVisible(false);
  };

  const showModifyAwardModal = (uuid) => {
    dispatch(userAction.setStaffAwardUuid(uuid));
    setModifyAwardVisible(true);
  };

  const hideModifyAwardModal = () => {
    dispatch(userAction.setStaffAwardUuid(''));
    setModifyAwardVisible(false);
  };

  const showUploadAwardModal = (uuid) => {
    dispatch(userAction.setStaffAwardUuid(uuid));
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    dispatch(userAction.setStaffAwardUuid(''));
    setUploadAwardVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_AWARD, { uuid }, 'DELETE');
    if (res) {
      dispatch(userAction.setChangeAward(true));
    }
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setWriteAwardLoading(true);

        const writeAwardList = await proxyFetch(
          GET_WRITE_AWARD_LIST,
          {},
          'GET'
        );

        if (writeAwardList) {
          setWriteAwardList(writeAwardList);
          setUploadAwardVisible(false);
          setNewAwardVisible(false);
          setModifyAwardVisible(false);
          dispatch(userAction.setChangeAward(false));

          let tempScore = 0;
          const sum = writeAwardList.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.score;
          }, tempScore);
          setScore(sum.toFixed(2));
        }

        setIsNeedRefresh(false);
        setWriteAwardLoading(false);
      }
    })();
  }, [isNeedRefresh, dispatch]);

  useEffect(() => {
    if (changeAward) {
      setIsNeedRefresh(true);
      dispatch(userAction.setChangeAward(false));
    }
  }, [changeAward, dispatch]);

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='trophy' className='icon' />
          <span>奖项</span>
          <Tag className='content-tag' color={scoreToColor(score)}>
            {`总评分:${score}`}
          </Tag>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewAwardModal}
        >
          新增奖项
        </Button>
      </div>
      <Modal
        title='新增奖项'
        visible={newAwardVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideNewAwardModal();
            },
            onCancel() { },
          });
        }}
        footer={null}
        okText='确定'
        cancelText='取消'
      >
        <CreateAwardContent />
      </Modal>
      <Modal
        title='修改奖项'
        visible={modifyAwardVisible}
        footer={null}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开修改内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideModifyAwardModal();
            },
            onCancel() { },
          });
        }}
        okText='确定'
        cancelText='取消'
      >
        <ModifyAwardContent />
      </Modal>
      <Modal
        title='上传附件'
        visible={uploadAwardVisible}
        footer={null}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '确认文件已保存后离开,否则文件无法保存',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideUploadAwardModal();
            },
            onCancel() { },
          });
        }}
        okText='确定'
        cancelText='取消'
      >
        <UploadAwardContent />
      </Modal>
      <div className='write-description-box'>
        <Skeleton loading={writeAwardLoading}>
          {writeAwardList?.length ? (
            writeAwardList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div>
                    <div className='write-description-title'>
                      <div className='description-title-text'>
                        <span>{`奖项${index + 1}:  ${item.awardName}`}</span>
                        <Tag
                          className='content-tag'
                          color={verifyStatusToColor(item.isVerify)}
                        >
                          {item.isVerify}
                        </Tag>
                        <Tag
                          className='content-tag'
                          color={scoreToColor(item.score)}
                        >
                          {item.score ? `评分:${item.score}` : '未评分'}
                        </Tag>
                        {/* <span>{`最近填写/修改于: ${
                        item.currentWriteTime
                          ? moment(item.currentWriteTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span> */}
                      </div>
                      <div className='description-title-button'>
                        <Button
                          type='link'
                          icon='edit'
                          disabled={item.isVerify === '核实通过'}
                          onClick={() => {
                            showModifyAwardModal(item.uuid);
                          }}
                          className='link-button'
                        >
                          <span>修改</span>
                        </Button>
                        <Button
                          type='link'
                          className='link-button'
                          icon='delete'
                          disabled={item.isVerify === '核实通过'}
                          onClick={() => {
                            confirm({
                              title: '删除奖项?',
                              okType: 'primary',
                              content: '确认要删除奖项?',
                              okText: '确认',
                              cancelText: '取消',
                              onOk() {
                                handleDelete(item.uuid);
                              },
                              onCancel() { },
                            });
                          }}
                        >
                          <span>删除</span>
                        </Button>
                      </div>
                    </div>
                    {item.verifyRemarks || item.reviewRemarks ? (
                      <Alert
                        type='warning'
                        description={
                          <div>
                            {item.verifyRemarks ? (
                              <div>{`核实建议: ${item.verifyRemarks}`}</div>
                            ) : null}
                            {item.reviewRemarks ? (
                              <div>{`评审建议: ${item.reviewRemarks}`}</div>
                            ) : null}
                          </div>
                        }
                      />
                    ) : null}
                  </div>
                }
              >
                <Descriptions.Item label='奖项类型' span={2}>
                  {item.awardType}
                </Descriptions.Item>
                <Descriptions.Item label='奖项级别'>
                  {item.awardGrade}
                </Descriptions.Item>
                <Descriptions.Item label='获奖时间'>
                  {item.awardTime
                    ? moment(item.awardTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='颁奖部门'>
                  {item.awardDepartment}
                </Descriptions.Item>
                {item.awardRank ? (
                  <Descriptions.Item label='排名'>
                    {item.awardRank}
                  </Descriptions.Item>
                ) : null}
                {item.awardNameList ? (
                  <Descriptions.Item label='获奖名单' span={3}>
                    {item.awardNameList}
                  </Descriptions.Item>
                ) : null}
                <Descriptions.Item label='上传/查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadAwardModal(item.uuid);
                    }}
                    className='link-button'
                  >
                    <Icon type='upload' />
                    <span>上传/查看</span>
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
