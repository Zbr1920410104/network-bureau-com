import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from "@/util/request";
import {
  GET_MESSAGE,
  DELETE_MESSAGE,
} from "@/constants/api-constants";

// redux
import { useSelector, useDispatch } from "react-redux";
import userAction from "@/redux/action/user";

import MessageContent from '../../components/index/Message-content.jsx';
import uuid from 'uuid';

import { Skeleton, Alert, Button, Modal, Empty } from 'antd';
import '@/style/home/home-index.styl';
const { confirm } = Modal;

export default props => {
  const { role, name, messageRefresh } = useSelector((state) => state.userStore),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [messageLoading, setMessageLoading] = useState(false),
    [message, setMessage] = useState([]),
    [messageVisible, setMessageVisible] = useState(false),
    dispatch = useDispatch();

  const handleDelete = async (uuid) => {
    await proxyFetch(
      DELETE_MESSAGE, { uuid }
    );
    setIsNeedRefresh(true);
  }

  // 将已有的数据回显
  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setMessageLoading(true);
        const messageList = await proxyFetch(
          GET_MESSAGE,
          {},
          "GET"
        );

        if (messageList) {
          setMessage(messageList);
          dispatch(userAction.setMessageRefresh(false));
        }

        setIsNeedRefresh(false);
        setMessageVisible(false);
        setMessageLoading(false);
      }
    })();
  }, [isNeedRefresh, dispatch]);

  const showMessageModal = () => {
    setMessageVisible(true);
  };

  const hideMessageModal = () => {
    setMessageVisible(false);
  };

  useEffect(() => {
    if (messageRefresh) {
      setIsNeedRefresh(true);
      console.log(1);
      dispatch(userAction.setMessageRefresh(false));
    }
  }, [messageRefresh, dispatch]);

  return (
    <div className='home-index-box'>
      <Modal
        title="评分"
        visible={messageVisible}
        onCancel={() => {
          confirm({
            title: "确认离开?",
            okType: "primary",
            content: "离开填写内容将不会保存!",
            okText: "确认",
            cancelText: "取消",
            onOk() {
              hideMessageModal();
            },
            onCancel() { },
          });
        }}
        footer={null}
      >
        <MessageContent />
      </Modal>
      <Skeleton loading={messageLoading}>
        {role === 5 || role === 10 ? <div className='index-button-box'>
          <Button type='primary' className='button' size='large' onClick={() => { showMessageModal(uuid.v1()) }}>新增消息</Button>
        </div> : null}
        <div>
          {message.length ? message.map((item, index) => {
            return <div className='message-item-box' key={index} style={{
              dispaly: 'flex',
              flexDirection: 'row',
              minWidth: '800px'
            }}>
              <Alert
                message={item.userName}
                description={item.message}
                type='info'
                showIcon
                onClose={() => { handleDelete(item.uuid) }}
                closable={item.userName === name}
                style={{ 'marginBottom': '20px' }}
              />
            </div>
          }) : <Empty description='暂无消息通知' />}
        </div>
      </Skeleton>
    </div>
  );
};