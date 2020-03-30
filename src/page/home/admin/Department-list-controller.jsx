import React, { useState, useEffect } from 'react';

// 样式
import '@/style/home/admin/department-list.styl';
import { Button, Table, Modal, Skeleton, Input } from 'antd';
const { Column } = Table;
const { confirm } = Modal;

export default porps => {
  const [departmentLoading, setDepartmentLoading] = useState(false),
    [departmentVisible, setDepartmentVisible] = useState(false),
    [departmentList, setDepartmentList] = useState([]);

  const showDepartmentModal = () => {
    setDepartmentVisible(true);
  };

  const hideDepartmentModal = () => {
    setDepartmentVisible(false);
  };

  useEffect(() => {
    (async () => {
      setDepartmentLoading(true);

      let departmentList = [
        {
          id: 1,
          department: '战略研究科'
        },
        {
          id: 2,
          department: '信息安全科'
        },
        {
          id: 3,
          department: '通信研究科'
        }
      ];

      setDepartmentList(departmentList);
      setDepartmentLoading(false);
    })();
  }, []);

  const handleDelete = key => {
    Modal.destroyAll();
  };

  return (
    <div className='department-list-box'>
      <p className='title-box'>
        <span>科室管理</span>
      </p>
      <div className='department-list-content-box'>
        <Button
          type='primary'
          style={{ marginBottom: 16 }}
          onClick={showDepartmentModal}
        >
          新增科室
        </Button>
        <Modal
          title='新增科室'
          visible={departmentVisible}
          onOk={hideDepartmentModal}
          onCancel={hideDepartmentModal}
          okText='确认'
          cancelText='取消'
        >
          <div className='inner-modal-box'>
            <Input
              placeholder='请输入科室名称'
              className='input'
              size='large'
            />
            <Button type='primary' className='save-button' size='large'>
              保存
            </Button>
          </div>
        </Modal>
        <Skeleton loading={departmentLoading}>
          <Table
            dataSource={departmentList}
            className='table'
            rowKey={record => record.id}
          >
            <Column align='center' title='序号' dataIndex='id' key='' />
            <Column align='center' title='科室' dataIndex='department' key='' />
            <Column
              align='center'
              title='删除'
              dataIndex=''
              key=''
              render={() => (
                <Button
                  type='link'
                  onClick={() => {
                    confirm({
                      title: '删除科室?',
                      okType: 'primary',
                      content: '确认要删除科室?',
                      okText: '确认',
                      cancelText: '取消',
                      onOk(record) {
                        handleDelete(record.key);
                      },
                      onCancel() {}
                    });
                  }}
                >
                  删除
                </Button>
              )}
            />
          </Table>
        </Skeleton>
      </div>
    </div>
  );
};
