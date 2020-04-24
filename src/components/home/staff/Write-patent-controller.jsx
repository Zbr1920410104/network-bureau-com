import React, { useState, useEffect } from 'react';

import ModifyPatentContent from '@/components/home/staff/patent/Modify-patent-content-controller.jsx';
import CreatePatentContent from '@/components/home/staff/patent/Create-patent-content-controller.jsx';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_WRITE_PATENT_LIST,
  DELETE_PATENT,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 工具
import verifyStatusToColor from '@/components/home/staff/util/verify-status-to-color';
// import moment from 'moment';

// 样式
import '@/style/home/staff/write-item.styl';
import { Button, Modal, Icon, Descriptions, Skeleton, Tag } from 'antd';
const { confirm } = Modal;

export default (props) => {
  const [newPatentVisible, setNewPatentVisible] = useState(false),
    [modifyPatentVisible, setModifyPatentVisible] = useState(false),
    { changePatent } = useSelector((state) => state.userStore),
    [writePatentList, setWritePatentList] = useState([]),
    [writePatentLoading, setWritePatentLoading] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    dispatch = useDispatch();

  const showNewPatentModal = () => {
    setNewPatentVisible(true);
  };

  const hideNewPatentModal = () => {
    setNewPatentVisible(false);
  };

  const showModifyPatentModal = (uuid) => {
    dispatch(userAction.setStaffPatentUuid(uuid));
    setModifyPatentVisible(true);
  };

  const hideModifyPatentModal = () => {
    setModifyPatentVisible(false);
  };

  const handleDelete = async (uuid) => {
    const res = await proxyFetch(DELETE_PATENT, { uuid }, 'DELETE');
    if (res) {
      dispatch(userAction.setChangePatent(true));
    }
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setWritePatentLoading(true);

        const writePatentList = await proxyFetch(
          GET_WRITE_PATENT_LIST,
          {},
          'GET'
        );

        if (writePatentList) {
          setWritePatentList(writePatentList);
          setNewPatentVisible(false);
          setModifyPatentVisible(false);
          dispatch(userAction.setChangePatent(false));
        }

        setIsNeedRefresh(false);
        setWritePatentLoading(false);
      }
    })();
  }, [isNeedRefresh, dispatch]);

  useEffect(() => {
    if (changePatent) {
      setIsNeedRefresh(true);
      dispatch(userAction.setChangePatent(false));
    }
  }, [changePatent, dispatch]);

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='tool' className='icon' />
          <span>专利</span>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewPatentModal}
          className='new-button'
        >
          新增专利
        </Button>
      </div>
      <Modal
        title='新增专利'
        visible={newPatentVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开填写内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideNewPatentModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
      >
        <CreatePatentContent />
      </Modal>
      <Modal
        title='修改专利内容'
        visible={modifyPatentVisible}
        onCancel={() => {
          confirm({
            title: '确认离开?',
            okType: 'primary',
            content: '离开修改的内容将不会保存!',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              hideModifyPatentModal();
            },
            onCancel() {},
          });
        }}
        footer={null}
        okText='确定'
        cancelText='取消'
      >
        <ModifyPatentContent />
      </Modal>
      <div className='write-description-box'>
        <Skeleton loading={writePatentLoading}>
          {writePatentList?.length ? (
            writePatentList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='write-description-title'>
                    <div className='description-title-text'>
                      <span>{`专利${index + 1}:  ${item.patentName}`}</span>
                      <Tag
                        className='content-tag'
                        color={verifyStatusToColor(item.isVerify)}
                      >
                        {item.isVerify}
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
                        onClick={() => {
                          showModifyPatentModal(item.uuid);
                        }}
                        className='link-button'
                        icon='edit'
                      >
                        <span>修改</span>
                      </Button>
                      <Button
                        type='link'
                        icon='delete'
                        className='link-button'
                        onClick={() => {
                          confirm({
                            title: '删除专利?',
                            okType: 'primary',
                            content: '确认要删除专利?',
                            okText: '确认',
                            cancelText: '取消',
                            onOk() {
                              handleDelete(item.uuid);
                            },
                            onCancel() {},
                          });
                        }}
                      >
                        <span>删除</span>
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
