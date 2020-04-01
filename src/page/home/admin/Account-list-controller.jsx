import React, { useState, useEffect } from 'react';

import AccountFormController from '@/components/home/admin/Account-form-controller.jsx';
import ModifyAccountContent from '@/components/home/admin/Modify-account-content-controller.jsx';

// 样式
import '@/style/home/admin/account-list.styl';
import { Button, Table, Modal, Skeleton, Select, Input } from 'antd';
const { Column } = Table,
  { confirm } = Modal,
  { Option } = Select,
  { Search } = Input;

export default porps => {
  const [accountLoading, setAccountLoading] = useState(false),
    [accountVisible, setAccountVisible] = useState(false),
    [accountList, setAccountList] = useState([]),
    [modifyAccountVisible, setModifyAccountVisible] = useState(false);

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
    (async () => {
      setAccountLoading(true);

      let accountList = [
        {
          id: 1,
          name: '张三',
          userName: 'yuangong',
          phone: 18351923820,
          department: '战略研究科',
          authority: 'staff',
          isCancel: '未注销'
        },
        {
          id: 2,
          name: '李四',
          userName: 'tongji',
          phone: 18351923820,
          department: '信息安全科',
          authority: 'businessManager',
          isCancel: '未注销'
        },
        {
          id: 3,
          name: '王五',
          userName: 'pingshen',
          phone: 18351923820,
          department: '通信研究科',
          authority: 'reviewManager',
          isCancel: '未注销'
        }
      ];

      setAccountList(accountList);
      setAccountLoading(false);
    })();
  }, []);

  // const handleAdd = () => {
  //   form.validateFields(async (err, value) => {
  //     setAccountLoading(true);
  //     const newAccount = {
  //       id: accountList.length + 1,
  //       name: value.name,
  //       phone: value.phone,
  //       department: value.department,
  //       password: 123456
  //     };
  //     setAccountList([...accountList, newAccount]);
  //     setAccountLoading(false);
  //   });
  // };

  // const handleModify = key => {
  //   const index = accountList.findIndex(item => item.key === key);
  //   form.validateFields(async (err, value) => {
  //     setAccountLoading(true);
  //     let newAccountList = accountList;
  //     newAccountList[index].password = value.password;
  //     setAccountList(newAccountList);
  //     setAccountLoading(false);
  //   });
  // };

  const handleReset = key => {
    Modal.destroyAll();
  };

  const handleDelete = key => {
    Modal.destroyAll();
  };

  const handleExport = key => {
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
                onCancel() {}
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
            rowKey={record => record.id}
          >
            <Column align='center' title='姓名' dataIndex='name' key='' />
            <Column align='center' title='账号' dataIndex='userName' key='' />
            <Column align='center' title='电话号码' dataIndex='phone' key='' />
            <Column
              align='center'
              title='权限'
              dataIndex='authority'
              key=''
              render={(text, record) => {
                if (record.authority === 'staff') return '普通员工';
                else if (record.authority === 'businessManager')
                  return '统计管理员';
                else if (record.authority === 'reviewManager')
                  return '评审管理员';
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
              dataIndex=''
              key=''
              render={() => (
                <Button
                  type='link'
                  onClick={() => {
                    confirm({
                      title: '重置密码?',
                      okType: 'primary',
                      content: '确认要重置密码?',
                      okText: '确认',
                      cancelText: '取消',
                      onOk(record) {
                        handleReset(record.key);
                      },
                      onCancel() {}
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
              dataIndex=''
              key=''
              render={() => (
                <Button
                  type='link'
                  onClick={() => {
                    confirm({
                      title: '注销账号?',
                      okType: 'primary',
                      content: '确认要注销账号(注销后账号将无法登录)?',
                      okText: '确认',
                      cancelText: '取消',
                      onOk(record) {
                        handleDelete(record.key);
                      },
                      onCancel() {}
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
