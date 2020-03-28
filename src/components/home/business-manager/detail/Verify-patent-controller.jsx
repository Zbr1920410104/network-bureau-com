import React from 'react';

// 样式
import '@/style/home/business-manager/verify-detail.styl';
import { Table } from 'antd';
const { Column } = Table;

export default props => {
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
      </Table>
    </div>
  );
};
