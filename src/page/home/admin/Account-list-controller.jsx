import React, { useState, useEffect } from 'react';

import AccountFormController from '@/components/home/admin/Account-form-controller.jsx';

// 样式
import '@/style/home/admin/account-list.styl';
import { Button, Table, Modal, Skeleton } from 'antd';
const { Column } = Table;
const { confirm } = Modal;

export default porps => {
  const [accountLoading, setAccountLoading] = useState(false),
    [accountVisible, setAccountVisible] = useState(false),
    [accountList, setAccountList] = useState([]);

  const showAccountModal = () => {
    setAccountVisible(true);
  };

  const hideAccountModal = () => {
    setAccountVisible(false);
  };

  useEffect(() => {
    (async () => {
      setAccountLoading(true);

      let accountList = [
        {
          id: 1,
          name: '张博荣',
          phone: 18351923820,
          office: '战略研究科',
          authority: 'businessManager',
          cancellation: 1
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
  //       office: value.office,
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

  return (
    <div className='account-list-box'>
      <p className='title-box'>
        <span>账号管理</span>
      </p>
      <div className='account-list-content-box'>
        <Button
          type='primary'
          style={{ marginBottom: 16 }}
          onClick={showAccountModal}
        >
          新增账号
        </Button>
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
        <Skeleton loading={accountLoading}>
          <Table
            dataSource={accountList}
            className='table'
            rowKey={record => record.id}
          >
            <Column align='center' title='姓名' dataIndex='name' key='' />
            <Column
              align='center'
              title='账号(电话号码)'
              dataIndex='phone'
              key=''
            />
            <Column
              align='center'
              title='权限'
              dataIndex='authority'
              key=''
              render={(text, record) => {
                if (record.authority === 'staff') return '科研人员';
                else if (record.authority === 'businessManager')
                  return '统计管理员';
                else if (record.authority === 'examinationManager')
                  return '评审管理员';
              }}
            />
            <Column align='center' title='科室' dataIndex='office' key='' />
            <Column
              align='center'
              title='注销状态'
              dataIndex='cancellation'
              key=''
              render={(text, record) =>
                record.cancellation === 1 ? '未注销' : '已注销'
              }
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
                      content: '确认要注销账号?',
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
          </Table>
        </Skeleton>
      </div>
    </div>
  );
};
