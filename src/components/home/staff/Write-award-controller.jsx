import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_WRITE_AWARD_LIST, DELETE_AWARD } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

import ModifyAwardContent from '@/components/home/staff/award/Modify-award-content-controller.jsx';
import CreateAwardContent from '@/components/home/staff/award/Create-award-content-controller.jsx';
import UploadAwardContent from '@/components/home/staff/award/Upload-award-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Modal, Icon, Descriptions, Skeleton } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const { changeAward } = useSelector((state) => state.userStore),
    [writeAwardList, setWriteAwardList] = useState([]),
    [writeAwardLoading, setWriteAwardLoading] = useState(false),
    dispatch = useDispatch(),
    [newAwardVisible, setNewAwardVisible] = useState(false),
    [modifyAwardVisible, setModifyAwardVisible] = useState(false),
    [uploadAwardVisible, setUploadAwardVisible] = useState(false);

  const showNewAwardModal = () => {
    setNewAwardVisible(true);
  };

  const hideNewAwardModal = () => {
    setNewAwardVisible(false);
  };

  const showModifyAwardModal = (uuid) => {
    dispatch(userAction.setStaffAwardUuid(uuid));
    setModifyAwardVisible(true);
  };

  const hideModifyAwardModal = () => {
    setModifyAwardVisible(false);
  };

  const showUploadAwardModal = () => {
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
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
      setWriteAwardLoading(true);

      const writeAwardList = await proxyFetch(GET_WRITE_AWARD_LIST, {}, 'GET');

      setWriteAwardList(writeAwardList);
      setWriteAwardLoading(false);
      dispatch(userAction.setChangeAward(false));
    })();
  }, [changeAward, dispatch]);

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='trophy' className='icon' />
          <span>奖项</span>
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
        onOk={hideNewAwardModal}
        onCancel={hideNewAwardModal}
        okText='保存'
        cancelText='取消'
      >
        <CreateAwardContent />
      </Modal>
      <Modal
        title='修改奖项'
        visible={modifyAwardVisible}
        onOk={hideModifyAwardModal}
        onCancel={hideModifyAwardModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyAwardContent />
      </Modal>
      <Modal
        title='上传附件'
        visible={uploadAwardVisible}
        onOk={hideUploadAwardModal}
        onCancel={hideUploadAwardModal}
        okText='保存'
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
                  <div className='write-description-title'>
                    <div className='description-title-text'>
                      <span>{`奖项${index + 1}:  ${item.awardName}`}</span>
                      <span>{`状态: ${item.isVerify}`}</span>
                      <span>{`最近填写/修改于: ${
                        item.currentWriteTime
                          ? moment(item.currentWriteTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span>
                    </div>
                    <div className='description-title-button'>
                      <Button
                        type='link'
                        onClick={() => {
                          showModifyAwardModal(item.uuid);
                        }}
                        className='link-button'
                      >
                        <Icon type='edit' />
                        <span>修改</span>
                      </Button>
                      <Button
                        type='link'
                        className='link-button'
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
                            onCancel() {},
                          });
                        }}
                      >
                        <Icon type='delete' />
                        <span>删除</span>
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
      {/* <Table
        dataSource={writeAwardList}
        className='table'
        rowKey={(record) => record.id}
        scroll={{ x: 1450 }}
      >
        <Column
          align='center'
          title='奖项名称'
          dataIndex='awardName'
          key=''
          fixed='left'
          width='150px'
        />
        <Column
          align='center'
          title='奖项类型'
          dataIndex='awardType'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='获奖时间'
          dataIndex='awardTime'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='奖项级别'
          dataIndex='awardGrade'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='颁奖部门'
          dataIndex='awardDepartment'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='获奖名单(团体)'
          dataIndex='awardNameList'
          key=''
          width='200px'
        />
        <Column
          align='center'
          title='上传/查看附件'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showUploadAwardModal}>
              上传/查看附件
            </Button>
          )}
        />
        <Column
          align='center'
          title='修改'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showModifyAwardModal}>
              修改奖项内容
            </Button>
          )}
        />
        <Column
          align='center'
          title='删除'
          fixed='right'
          width='80px'
          dataIndex=''
          key=''
          render={() => (
            <Button
              type='link'
              onClick={() => {
                confirm({
                  title: '删除奖项?',
                  okType: 'primary',
                  content: '确认要删除奖项?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {},
                });
              }}
            >
              删除奖项
            </Button>
          )}
        />
      </Table>
      <div className='item-bottom-box'>
        <Button type='primary' className='save-button'>
          暂存
        </Button>
      </div> */}
    </div>
  );
};
