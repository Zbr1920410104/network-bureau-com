import React, { useState, useEffect } from 'react';

import ModifyProjectContent from '@/components/home/staff/project/Modify-project-content-controller.jsx';
import CreateProjectContent from '@/components/home/staff/project/Create-project-content-controller.jsx';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_WRITE_PROJECT_LIST,
  DELETE_PROJECT,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

// 样式
import '@/style/home/staff/write-item.styl';
import { Button, Modal, Icon, Descriptions, Skeleton } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const [newProjectVisible, setNewProjectVisible] = useState(false),
    { changeProject } = useSelector((state) => state.userStore),
    [modifyProjectVisible, setModifyProjectVisible] = useState(false),
    [writeProjectList, setWriteProjectList] = useState([]),
    [writeProjectLoading, setWriteProjectLoading] = useState(false),
    dispatch = useDispatch();

  const showNewProjectModal = () => {
    setNewProjectVisible(true);
  };

  const hideNewProjectModal = () => {
    setNewProjectVisible(false);
  };

  const showModifyProjectModal = (uuid) => {
    dispatch(userAction.setStaffProjectUuid(uuid));
    setModifyProjectVisible(true);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_PROJECT, { uuid }, 'DELETE');
    if (res) {
      dispatch(userAction.setChangeProject(true));
    }
  };

  const hideModifyProjectModal = () => {
    setModifyProjectVisible(false);
  };

  useEffect(() => {
    (async () => {
      setWriteProjectLoading(true);

      const writeProjectList = await proxyFetch(
        GET_WRITE_PROJECT_LIST,
        {},
        'GET'
      );

      setWriteProjectList(writeProjectList);
      setWriteProjectLoading(false);
      dispatch(userAction.setChangeProject(false));
    })();
  }, [changeProject, dispatch]);

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='file-done' className='icon' />
          <span>项目</span>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewProjectModal}
          className='new-button'
        >
          新增项目
        </Button>
      </div>
      <Modal
        title='新增项目'
        visible={newProjectVisible}
        onOk={hideNewProjectModal}
        onCancel={hideNewProjectModal}
        okText='确定'
        cancelText='取消'
      >
        <CreateProjectContent />
      </Modal>
      <Modal
        title='修改项目内容'
        visible={modifyProjectVisible}
        onOk={hideModifyProjectModal}
        onCancel={hideModifyProjectModal}
        okText='确定'
        cancelText='取消'
      >
        <ModifyProjectContent />
      </Modal>
      <div className='write-description-box'>
        <Skeleton loading={writeProjectLoading}>
          {writeProjectList?.length ? (
            writeProjectList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='write-description-title'>
                    <div className='description-title-text'>
                      <span>{`项目${index + 1}:  ${item.name}`}</span>
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
                          showModifyProjectModal(item.uuid);
                        }}
                        className='link-button'
                      >
                        <Icon type='edit' />
                      </Button>
                      <Button
                        type='link'
                        className='link-button'
                        onClick={() => {
                          confirm({
                            title: '删除项目?',
                            okType: 'primary',
                            content: '确认要删除项目?',
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
      {/* <Table
        dataSource={leadProjectList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1300 }}
      >
        <Column
          align='center'
          title='项目类型'
          dataIndex='type'
          key=''
          fixed='left'
          width='100px'
          render={(text, record) =>
            record.type === 1 ? '主持项目' : '参与项目'
          }
        />
        <Column
          align='center'
          title='项目名称'
          dataIndex='name'
          key=''
          fixed='left'
          width='200px'
        />
        <Column
          align='center'
          title='项目起止时间'
          dataIndex='time'
          key=''
          width='150px'
        />
        <Column
          align='center'
          title='项目编号'
          dataIndex='code'
          key=''
          width='150px'
        />
        <Column
          align='center'
          title='项目来源'
          dataIndex='resource'
          key=''
          width='150px'
        />
        <Column
          align='center'
          title='项目经费(万元)'
          dataIndex='funds'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='主要研究内容'
          dataIndex='content'
          key='content'
          width='300px'
        />
        <Column
          align='center'
          title='参与者名单'
          dataIndex='participant'
          key=''
          width='300px'
        />
        <Column
          align='center'
          title='修改'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showModifyProjectModal}>
              修改项目内容
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
                  title: '删除项目?',
                  okType: 'primary',
                  content: '确认要删除项目?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              删除项目
            </Button>
          )}
        />
      </Table> */}
      {/* <div className='item-bottom-box'>
        <Button type='primary' className='save-button'>
          暂存
        </Button>
      </div> */}
    </div>
  );
};
