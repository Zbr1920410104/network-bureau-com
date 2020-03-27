import React, { useState } from 'react';

import ModifyCopyrightContent from '@/components/home/staff/copyright/Modify-copyright-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Table, Modal } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

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
    ],
    [newCopyrightVisible, setNewCopyrightVisible] = useState(false),
    [modifyCopyrightVisible, setModifyCopyrightVisible] = useState(false);

  const showNewCopyrightModal = () => {
    setNewCopyrightVisible(true);
  };

  const hideNewCopyrightModal = () => {
    setNewCopyrightVisible(false);
  };

  const showModifyCopyrightModal = () => {
    setModifyCopyrightVisible(true);
  };

  const hideModifyCopyrightModal = () => {
    setModifyCopyrightVisible(false);
  };

  return (
    <div>
      <Button
        type='primary'
        style={{ marginBottom: 16 }}
        onClick={showNewCopyrightModal}
      >
        新增软件著作权
      </Button>
      <Modal
        title='新增软件著作权'
        visible={newCopyrightVisible}
        onOk={hideNewCopyrightModal}
        onCancel={hideNewCopyrightModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyCopyrightContent />
      </Modal>
      <Modal
        title='修改软件著作权内容'
        visible={modifyCopyrightVisible}
        onOk={hideModifyCopyrightModal}
        onCancel={hideModifyCopyrightModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyCopyrightContent />
      </Modal>
      <Table
        dataSource={leadCopyrightList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1100 }}
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
          title='修改'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showModifyCopyrightModal}>
              修改软件著作权内容
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
                  title: '删除软件著作权?',
                  okType: 'primary',
                  content: '确认要删除软件著作权?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              删除软件著作权
            </Button>
          )}
        />
      </Table>
      <Button type='primary'>暂存</Button>
    </div>
  );
};
