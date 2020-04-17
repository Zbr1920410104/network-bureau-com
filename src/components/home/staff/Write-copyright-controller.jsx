import React, { useState, useEffect } from 'react';

import ModifyCopyrightContent from '@/components/home/staff/copyright/Modify-copyright-content-controller.jsx';
import CreateCopyrightContent from '@/components/home/staff/copyright/Create-copyright-content-controller.jsx';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_WRITE_COPYRIGHT_LIST,
  DELETE_COPYRIGHT,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Modal, Icon, Descriptions, Skeleton } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const [newCopyrightVisible, setNewCopyrightVisible] = useState(false),
    [modifyCopyrightVisible, setModifyCopyrightVisible] = useState(false),
    { changeCopyright } = useSelector((state) => state.userStore),
    [writeCopyrightList, setWriteCopyrightList] = useState([]),
    [writeCopyrightLoading, setWriteCopyrightLoading] = useState(false),
    dispatch = useDispatch();

  const showNewCopyrightModal = () => {
    setNewCopyrightVisible(true);
  };

  const hideNewCopyrightModal = () => {
    setNewCopyrightVisible(false);
  };

  const showModifyCopyrightModal = (uuid) => {
    dispatch(userAction.setStaffCopyrightUuid(uuid));
    setModifyCopyrightVisible(true);
  };

  const hideModifyCopyrightModal = () => {
    setModifyCopyrightVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_COPYRIGHT, { uuid }, 'DELETE');
    if (res) {
      dispatch(userAction.setChangeCopyright(true));
    }
  };

  useEffect(() => {
    (async () => {
      setWriteCopyrightLoading(true);

      const writeCopyrightList = await proxyFetch(
        GET_WRITE_COPYRIGHT_LIST,
        {},
        'GET'
      );

      setWriteCopyrightList(writeCopyrightList);
      setWriteCopyrightLoading(false);
      dispatch(userAction.setChangeCopyright(false));
    })();
  }, [changeCopyright, dispatch]);

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='audit' className='icon' />
          <span>软件著作权</span>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewCopyrightModal}
        >
          新增软件著作权
        </Button>
      </div>
      <Modal
        title='新增软件著作权'
        visible={newCopyrightVisible}
        onOk={hideNewCopyrightModal}
        onCancel={hideNewCopyrightModal}
        okText='确定'
        cancelText='取消'
      >
        <CreateCopyrightContent />
      </Modal>
      <Modal
        title='修改软件著作权内容'
        visible={modifyCopyrightVisible}
        onOk={hideModifyCopyrightModal}
        onCancel={hideModifyCopyrightModal}
        okText='确定'
        cancelText='取消'
      >
        <ModifyCopyrightContent />
      </Modal>
      <div className='write-description-box'>
        <Skeleton loading={writeCopyrightLoading}>
          {writeCopyrightList?.length ? (
            writeCopyrightList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='write-description-title'>
                    <div className='description-title-text'>
                      <span>{`软件著作权${index + 1}:  ${
                        item.copyrightName
                      }`}</span>
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
                          showModifyCopyrightModal(item.uuid);
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
                            title: '删除软件著作权?',
                            okType: 'primary',
                            content: '确认要删除软件著作权?',
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
      {/* <Table
        dataSource={leadCopyrightList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1100 }}
      >
        <Column
          align='center'
          title='软件著作权名称'
          dataIndex='copyrightName'
          key=''
          fixed='left'
          width='150px'
        />
        <Column
          align='center'
          title='权利取得方式'
          dataIndex='copyrightType'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='授权范围'
          dataIndex='copyrightArrange'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='登记号'
          dataIndex='copyrightCode'
          key=''
          width='200px'
        />
        <Column
          align='center'
          title='修改'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showModifyCopyrightModal}>
              修改软件著作权内容
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
                  title: '删除软件著作权?',
                  okType: 'primary',
                  content: '确认要删除软件著作权?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              删除软件著作权
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
