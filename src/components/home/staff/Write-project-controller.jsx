import React, { useState } from 'react';

import ModifyProjectContent from '@/components/home/staff/project/Modify-project-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Table, Modal } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

export default props => {
  const leadProjectList = [
      {
        id: 1,
        type: 1,
        name: '软件测试1',
        time: '2020-03-04~202003-20',
        code: '101010101',
        resource: '网信办',
        funds: 23,
        participant: '钱程、张博荣',
        content: 'js开发'
      },
      {
        id: 2,
        type: 2,
        name: '软件测试2',
        time: '2020-03-05~202003-25',
        code: '101010106',
        resource: '网信办',
        funds: 32,
        participant: '钱程、张博荣',
        content: '系统开发'
      }
    ],
    [newProjectVisible, setNewProjectVisible] = useState(false),
    [modifyProjectVisible, setModifyProjectVisible] = useState(false);

  const showNewProjectModal = () => {
    setNewProjectVisible(true);
  };

  const hideNewProjectModal = () => {
    setNewProjectVisible(false);
  };

  const showModifyProjectModal = () => {
    setModifyProjectVisible(true);
  };

  const hideModifyProjectModal = () => {
    setModifyProjectVisible(false);
  };

  return (
    <div>
      <Button
        type='primary'
        style={{ marginBottom: 16 }}
        onClick={showNewProjectModal}
      >
        新增项目
      </Button>
      <Modal
        title='新增项目'
        visible={newProjectVisible}
        onOk={hideNewProjectModal}
        onCancel={hideNewProjectModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyProjectContent />
      </Modal>
      <Modal
        title='修改项目内容'
        visible={modifyProjectVisible}
        onOk={hideModifyProjectModal}
        onCancel={hideModifyProjectModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyProjectContent />
      </Modal>
      <Table
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
      </Table>
      <Button type='primary'>暂存</Button>
    </div>
  );
};
