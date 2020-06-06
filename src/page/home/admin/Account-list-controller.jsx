import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 路由
import { INDEX } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// 请求
import proxyFetch from '@/util/request';
import {
  QUARY_ACCOUNT,
  RESET_PASSWORD,
  ACCOUNT_CANCEL,
  ACCOUNT_EXPORT_ALL_STAFF_INFO_EXCEL,
} from '@/constants/api-constants';

import AccountFormController from '@/components/home/admin/Account-form-controller.jsx';
import ModifyAccountContent from '@/components/home/admin/Modify-account-content-controller.jsx';
import ModifyKeyContent from '@/components/home/admin/Modify-key-content-controller.jsx';

// 工具
import md5 from 'md5';

// 样式
import '@/style/home/admin/account-list.styl';
import { Button, Table, Modal, Select, Input } from 'antd';
const { Column } = Table,
  { confirm } = Modal,
  { Option } = Select,
  { Search } = Input;

export default (porps) => {
  const [accountLoading, setAccountLoading] = useState(false),
    [role, setRole] = useState(0),
    [name, setName] = useState(''),
    [accountVisible, setAccountVisible] = useState(false),
    [keyModifyVisible, setKeyModifyVisible] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [accountList, setAccountList] = useState([]),
    history = useHistory(),
    [modifyAccountVisible, setModifyAccountVisible] = useState(false),
    { addAccount, uuid, userName, changeDefaultPassword } = useSelector(
      (state) => state.userStore
    ),
    dispatch = useDispatch();

  const showAccountModal = () => {
    setAccountVisible(true);
  };

  const showKeyModifyModal = () => {
    setKeyModifyVisible(true);
  };

  const hideAccountModal = () => {
    dispatch(userAction.setAccountRefresh(true));
    setAccountVisible(false);
  };

  const hideModifyKeyModal = () => {
    dispatch(userAction.setDefaultPasswordRefresh(true));
    setKeyModifyVisible(false);
  };

  const showModifyAccountModal = () => {
    dispatch(userAction.setAccountRefresh(true));
    setModifyAccountVisible(true);
  };

  const hideModifyAccountModal = () => {
    dispatch(userAction.setAccountRefresh(true));
    setModifyAccountVisible(false);
  };

  useEffect(() => {
    if (changeDefaultPassword) {
      dispatch(userAction.setChangeDefaultPassword(false));
      setKeyModifyVisible(false);
    }
  }, [changeDefaultPassword, dispatch]);

  useEffect(() => {
    let _isMounted = true;

    (async () => {
      if (isNeedRefresh || addAccount) {
        setAccountLoading(true);

        const accountList = await proxyFetch(
          QUARY_ACCOUNT,
          { role, name },
          'GET'
        );

        if (_isMounted) {
          setAccountList(accountList);
          setAccountVisible(false);
          setModifyAccountVisible(false);
          dispatch(userAction.setAddAccount(false));
          setIsNeedRefresh(false);
        }

        setAccountLoading(false);
      }
    })();
  }, [isNeedRefresh, role, name, addAccount, dispatch]);

  const handleReset = async (userUuid) => {
    const res = await proxyFetch(RESET_PASSWORD, { userUuid });
    if (res) {
      if (uuid === userUuid) {
        let value = {};
        value.password = md5('123456');
        value.userName = userName;
        dispatch(userAction.asyncSetUser(value));
      }
    }
  };

  const handleCancellation = async (userUuid) => {
    const cancelRes = await proxyFetch(ACCOUNT_CANCEL, { userUuid });
    if (cancelRes) {
      if (uuid === userUuid) {
        history.push(INDEX.path);
      }
      setIsNeedRefresh(true);
    }
  };

  const handleExport = async () => {
    const tempUrl = await proxyFetch(ACCOUNT_EXPORT_ALL_STAFF_INFO_EXCEL, {});
    const url = `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
      tempUrl
    )}`;
    window.open(url);
  };

  return (
    <div className='account-list-box'>
      <p className='title-box'>
        <span>账号管理</span>
      </p>
      <div className='account-list-content-box'>
        <div className='list-title-box'>
          <Select
            className='select'
            defaultValue={0}
            onChange={(e) => {
              setRole(e);
              setName('');
              setIsNeedRefresh(true);
            }}
          >
            <Option value={0}>全部用户</Option>
            <Option value={1}>超级管理员</Option>
            <Option value={5}>评审管理员</Option>
            <Option value={10}>统计管理员</Option>
            <Option value={15}>普通员工</Option>
          </Select>
          <Search
            className='search'
            placeholder='请输入姓名\账号'
            enterButton
            onSearch={(e) => {
              setName(e);
              setIsNeedRefresh(true);
            }}
          />
          <Button
            className='primary-button'
            type='primary'
            style={{ marginBottom: 16 }}
            onClick={showAccountModal}
          >
            新增账号
          </Button>
          <Button
            type='primary'
            style={{ marginBottom: 16 }}
            onClick={showKeyModifyModal}
          >
            修改默认密码
          </Button>
          <Button
            className='export-button'
            type='primary'
            onClick={() => {
              confirm({
                title: '导出所有账号信息',
                okType: 'primary',
                content: '确认要导出所有账号信息?',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                  handleExport();
                },
                onCancel() {},
              });
            }}
          >
            导出所有账号信息
          </Button>
          <Modal
            title='修改账号信息'
            visible={modifyAccountVisible}
            onCancel={() => {
              confirm({
                title: '确认离开?',
                okType: 'primary',
                content: '离开修改的内容将不会保存!',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                  hideModifyAccountModal();
                },
                onCancel() {},
              });
            }}
            footer={null}
          >
            <ModifyAccountContent />
          </Modal>
          <Modal
            title='修改默认密码'
            visible={keyModifyVisible}
            onCancel={() => {
              confirm({
                title: '确认离开?',
                okType: 'primary',
                content: '离开修改的内容将不会保存!',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                  hideModifyKeyModal();
                },
                onCancel() {},
              });
            }}
            footer={null}
          >
            <ModifyKeyContent />
          </Modal>
          <Modal
            title='新增账号'
            visible={accountVisible}
            onCancel={() => {
              confirm({
                title: '确认离开?',
                okType: 'primary',
                content: '离开填写内容将不会保存!',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                  hideAccountModal();
                },
                onCancel() {},
              });
            }}
            footer={null}
          >
            <AccountFormController />
          </Modal>
        </div>
        <Table
          dataSource={accountList}
          className='table'
          loading={accountLoading}
          rowKey={(record) => record.uuid}
          scroll={{ x: 1200 }}
        >
          <Column
            align='center'
            title='姓名'
            dataIndex='name'
            key=''
            fixed='left'
          />
          <Column align='center' title='账号' dataIndex='userName' key='' />
          <Column align='center' title='电话号码' dataIndex='phone' key='' />
          <Column
            align='center'
            title='权限'
            dataIndex='role'
            key=''
            render={(text, record) => {
              if (record.role === 15) return '普通员工';
              else if (record.role === 10) return '统计管理员';
              else if (record.role === 5) return '评审管理员';
              else if (record.role === 1) return '超级管理员';
            }}
          />
          <Column align='center' title='科室' dataIndex='department' key='' />
          <Column align='center' title='注销状态' dataIndex='isCancel' key='' />
          <Column
            align='center'
            title='重置密码'
            fixed='right'
            width='100px'
            dataIndex=''
            key=''
            render={(text, record) => (
              <Button
                type='link'
                onClick={() => {
                  confirm({
                    title: '重置密码?',
                    okType: 'primary',
                    content: '确认要重置密码?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      handleReset(record.uuid);
                    },
                    onCancel() {},
                  });
                }}
              >
                重置密码
              </Button>
            )}
          />
          <Column
            align='center'
            title='注销'
            fixed='right'
            width='100px'
            dataIndex=''
            key=''
            render={(text, record) => (
              <Button
                type='link'
                onClick={() => {
                  confirm({
                    title: '注销账号?',
                    okType: 'primary',
                    content: '确认要注销账号(注销后账号将无法登录)?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      handleCancellation(record.uuid);
                    },
                    onCancel() {},
                  });
                }}
              >
                注销
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
            render={(text, record) => (
              <Button
                type='link'
                onClick={() => {
                  dispatch(userAction.setAccountUuid(record.uuid));
                  showModifyAccountModal();
                }}
              >
                修改账号信息
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
