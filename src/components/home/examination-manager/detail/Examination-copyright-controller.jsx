import React, { useState } from 'react';

import ExamineCopyrightContent from '@/components/home/examination-manager/copyright/Examine-copyright-content-controller.jsx';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Table, Modal, Button } from 'antd';
const { Column } = Table;

export default props => {
  const [examineCopyrightVisible, setExamineCopyrightVisible] = useState(false);

  const showExamineCopyrightModal = () => {
    setExamineCopyrightVisible(true);
  };

  const hideExamineCopyrightModal = () => {
    setExamineCopyrightVisible(false);
  };
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
      <Modal
        title='打分'
        visible={examineCopyrightVisible}
        onOk={hideExamineCopyrightModal}
        onCancel={hideExamineCopyrightModal}
        okText='确定'
        cancelText='取消'
      >
        <ExamineCopyrightContent />
      </Modal>
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
        <Column
          align='center'
          title='打分'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showExamineCopyrightModal}>
              打分
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
