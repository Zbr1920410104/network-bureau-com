import React, { useState } from 'react';

import ExaminePatentContent from '@/components/home/examination-manager/patent/Examine-patent-content-controller.jsx';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Table, Button,Modal } from 'antd';
const { Column } = Table;

export default props => {
  const [examinePatentVisible, setExaminePatentVisible] = useState(false);

  const showExaminePatentModal = () => {
    setExaminePatentVisible(true);
  };

  const hideExaminePatentModal = () => {
    setExaminePatentVisible(false);
  };
  const leadPatentList = [
    {
      id: 1,
      patentType: '发明',
      patentName: '软件测试1',
      patentCode: '101010101453243',
      patentNation: '中国、美国、日本'
    },
    {
      id: 2,
      patentType: '发明',
      patentName: '软件测试1',
      patentCode: '1010101013242432',
      patentNation: '中国、美国、日本'
    }
  ];

  return (
    <div>
      <Modal
        title='打分'
        visible={examinePatentVisible}
        onOk={hideExaminePatentModal}
        onCancel={hideExaminePatentModal}
        okText='确定'
        cancelText='取消'
      >
        <ExaminePatentContent />
      </Modal>
      <Table
        dataSource={leadPatentList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 900 }}
        rowSelection={{
          type: 'radio',
          columnWidth: '100px'
        }}
      >
        <Column
          align='center'
          title='专利名称'
          dataIndex='patentName'
          key=''
          fixed='left'
          width='150px'
        />
        <Column
          align='center'
          title='专利类型'
          dataIndex='patentType'
          key=''
          width='120px'
        />
        <Column
          align='center'
          title='授权国家和地区'
          dataIndex='patentNation'
          key=''
          width='200px'
        />
        <Column
          align='center'
          title='授权号'
          dataIndex='patentCode'
          key=''
          width='200px'
        />
        <Column
          align='center'
          title='打分'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showExaminePatentModal}>
              打分
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
