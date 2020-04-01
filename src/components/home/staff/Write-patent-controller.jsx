import React, { useState } from 'react';

import ModifyPatentContent from '@/components/home/staff/patent/Modify-patent-content-controller.jsx';

// 样式
import '@/style/home/staff/write-item.styl';
import { Button, Table, Modal, Icon } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

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
    ],
    [newPatentVisible, setNewPatentVisible] = useState(false),
    [modifyPatentVisible, setModifyPatentVisible] = useState(false);

  const showNewPatentModal = () => {
    setNewPatentVisible(true);
  };

  const hideNewPatentModal = () => {
    setNewPatentVisible(false);
  };

  const showModifyPatentModal = () => {
    setModifyPatentVisible(true);
  };

  const hideModifyPatentModal = () => {
    setModifyPatentVisible(false);
  };

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='tool' className='icon' />
          <span>专利</span>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewPatentModal}
          className='new-button'
        >
          新增专利
        </Button>
      </div>
      <Modal
        title='新增专利'
        visible={newPatentVisible}
        onOk={hideNewPatentModal}
        onCancel={hideNewPatentModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyPatentContent />
      </Modal>
      <Modal
        title='修改专利内容'
        visible={modifyPatentVisible}
        onOk={hideModifyPatentModal}
        onCancel={hideModifyPatentModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyPatentContent />
      </Modal>
      <Table
        dataSource={leadPatentList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1300 }}
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
          title='修改'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showModifyPatentModal}>
              修改专利内容
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
                  title: '删除专利?',
                  okType: 'primary',
                  content: '确认要删除专利?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              删除专利
            </Button>
          )}
        />
      </Table>
      <div className='item-bottom-box'>
        <Button type='primary' className='save-button'>
          暂存
        </Button>
      </div>
    </div>
  );
};
