import React, { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import {
  QUARY_ACCOUNT,
  RESET_PASSWORD,
  ACCOUNT_CANCEL,
  //SAVE_ACCOUNT,
} from '@/constants/api-constants';

import AccountFormController from '@/components/home/admin/Account-form-controller.jsx';
import ModifyAccountContent from '@/components/home/admin/Modify-account-content-controller.jsx';

// 样式
import '@/style/home/admin/account-list.styl';
import { Button, Table, Modal, Skeleton, Select, Input } from 'antd';
const { Column } = Table,
  { confirm } = Modal,
  { Option } = Select,
  { Search } = Input;

export default (porps) => {
  const [accountLoading, setAccountLoading] = useState(false),
    [accountVisible, setAccountVisible] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [accountList, setAccountList] = useState([]),
    [modifyAccountVisible, setModifyAccountVisible] = useState(false),
    { addAccount } = useSelector((state) => state.userStore),
    dispatch = useDispatch();

  const showAccountModal = () => {
    setAccountVisible(true);
  };

  const hideAccountModal = () => {
    setAccountVisible(false);
  };

  const showModifyAccountModal = () => {
    setModifyAccountVisible(true);
  };

  const hideModifyAccountModal = () => {
    setModifyAccountVisible(false);
  };

  useEffect(() => {
    let _isMounted = true;

    (async () => {
      if (isNeedRefresh || addAccount) {
        setAccountLoading(true);

        const accountList = await proxyFetch(QUARY_ACCOUNT, {}, 'GET');

        if (_isMounted) {
          setAccountList(accountList);
          dispatch(userAction.setAddAccount(false));
          setAccountLoading(false);
          setIsNeedRefresh(false);
        }
      }
    })();
  }, [isNeedRefresh, addAccount, dispatch]);

  const handleReset = async (uuid) => {
    await proxyFetch(RESET_PASSWORD, { uuid });
  };

  const handleCancellation = async (uuid) => {
    const res = await proxyFetch(ACCOUNT_CANCEL, { uuid });
    if (res) {
      setIsNeedRefresh(true);
    }
  };

  const handleExport = (key) => {
    Modal.destroyAll();
  };

  return (
    <div className='account-list-box'>
      <p className='title-box'>
        <span>账号管理</span>
      </p>
      <div className='account-list-content-box'>
        <div className='list-title-box'>
          <Select placeholder='请选择权限' className='select'>
            <Option value='staff'>科研人员</Option>
            <Option value='businessManager'>统计管理员</Option>
            <Option value='reviewManager'>评审管理员</Option>
          </Select>
          <Search className='search' placeholder='请输入账号' enterButton />
          <Button
            type='primary'
            style={{ marginBottom: 16 }}
            onClick={showAccountModal}
          >
            新增账号
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
                onOk(record) {
                  handleExport(record.key);
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
            onOk={hideModifyAccountModal}
            onCancel={hideModifyAccountModal}
            okText='保存'
            cancelText='取消'
          >
            <ModifyAccountContent />
          </Modal>
          <Modal
            title='新增账号'
            visible={accountVisible}
            onOk={hideAccountModal}
            onCancel={hideAccountModal}
            okText='确认'
            cancelText='取消'
          >
            <AccountFormController />
          </Modal>
        </div>
        <Skeleton loading={accountLoading}>
          <Table
            dataSource={accountList}
            className='table'
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
            <Column
              align='center'
              title='注销状态'
              dataIndex='isCancel'
              key=''
            />
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
              render={() => (
                <Button type='link' onClick={showModifyAccountModal}>
                  修改账号信息
                </Button>
              )}
            />
          </Table>
        </Skeleton>
      </div>
    </div>
  );
};
