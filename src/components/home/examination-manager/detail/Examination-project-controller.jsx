import React, { useState } from 'react';

import ExamineProjectContent from '@/components/home/examination-manager/project/Examine-project-content-controller.jsx';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Table, Button, Modal } from 'antd';
const { Column } = Table;

export default props => {
  const [examineProjectVisible, setExamineProjectVisible] = useState(false);

  const showExamineProjectModal = () => {
    setExamineProjectVisible(true);
  };

  const hideExamineProjectModal = () => {
    setExamineProjectVisible(false);
  };

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
  ];

  return (
    <div>
      <Modal
        title='打分'
        visible={examineProjectVisible}
        onOk={hideExamineProjectModal}
        onCancel={hideExamineProjectModal}
        okText='确定'
        cancelText='取消'
      >
        <ExamineProjectContent />
      </Modal>
      <Table
        dataSource={leadProjectList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1000 }}
        rowSelection={{
          type: 'radio',
          columnWidth: '100px'
        }}
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
          title='打分'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showExamineProjectModal}>
              打分
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
