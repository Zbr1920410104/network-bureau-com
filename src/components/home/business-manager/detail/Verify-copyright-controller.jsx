import React from 'react';

// 样式
import '@/style/home/business-manager/verify-detail.styl';
import { Table } from 'antd';
const { Column } = Table;

export default props => {
  const leadCopyrightList = [
    {
      id: 1,
      copyrightType: '原始取得',
      copyrightName: '软件测试1',
      copyrightCode: '101010101453243',
      copyrightArrange: '专有许可'
    },
    {
      id: 2,
      copyrightType: '继受取得',
      copyrightName: '软件测试1',
      copyrightCode: '1010101013242432',
      copyrightArrange: '专有许可'
    }
  ];

  return (
    <div>
      <Table
        dataSource={leadCopyrightList}
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
          title='软件著作权名称'
          dataIndex='copyrightName'
          key=''
          fixed='left'
          width='150px'
        />
        <Column
          align='center'
          title='权利取得方式'
          dataIndex='copyrightType'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='授权范围'
          dataIndex='copyrightArrange'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='登记号'
          dataIndex='copyrightCode'
          key=''
          width='200px'
        />
      </Table>
    </div>
  );
};
