import React, { useState } from 'react';

import ModifyAwardContent from '@/components/home/staff/award/Modify-award-content-controller.jsx';
import UploadAwardContent from '@/components/home/staff/award/Upload-award-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Table, Modal } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

export default props => {
  const leadAwardList = [
      {
        id: 1,
        awardType: '个人',
        awardName: '陈德杯',
        awardTime: '2020-03-06',
        awardGrade: '一等奖',
        awardDepartment: '人力部'
      },
      {
        id: 2,
        awardType: '团体',
        awardName: '陈德杯',
        awardTime: '2020-03-06',
        awardGrade: '一等奖',
        awardDepartment: '人力部',
        awardNameList: '钱程、张博荣'
      }
    ],
    [newAwardVisible, setNewAwardVisible] = useState(false),
    [modifyAwardVisible, setModifyAwardVisible] = useState(false),
    [uploadAwardVisible, setUploadAwardVisible] = useState(false);

  const showNewAwardModal = () => {
    setNewAwardVisible(true);
  };

  const hideNewAwardModal = () => {
    setNewAwardVisible(false);
  };

  const showModifyAwardModal = () => {
    setModifyAwardVisible(true);
  };

  const hideModifyAwardModal = () => {
    setModifyAwardVisible(false);
  };

  const showUploadAwardModal = () => {
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    setUploadAwardVisible(false);
  };

  return (
    <div>
      <Button
        type='primary'
        style={{ marginBottom: 16 }}
        onClick={showNewAwardModal}
      >
        新增奖项
      </Button>
      <Modal
        title='新增奖项'
        visible={newAwardVisible}
        onOk={hideNewAwardModal}
        onCancel={hideNewAwardModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyAwardContent />
      </Modal>
      <Modal
        title='修改奖项'
        visible={modifyAwardVisible}
        onOk={hideModifyAwardModal}
        onCancel={hideModifyAwardModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyAwardContent />
      </Modal>
      <Modal
        title='上传文件'
        visible={uploadAwardVisible}
        onOk={hideUploadAwardModal}
        onCancel={hideUploadAwardModal}
        okText='保存'
        cancelText='取消'
      >
        <UploadAwardContent />
      </Modal>
      <Table
        dataSource={leadAwardList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1450 }}
      >
        <Column
          align='center'
          title='奖项名称'
          dataIndex='awardName'
          key=''
          fixed='left'
          width='150px'
        />
        <Column
          align='center'
          title='奖项类型'
          dataIndex='awardType'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='获奖时间'
          dataIndex='awardTime'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='奖项级别'
          dataIndex='awardGrade'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='颁奖部门'
          dataIndex='awardDepartment'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='获奖名单(团体)'
          dataIndex='awardNameList'
          key=''
          width='200px'
        />
        <Column
          align='center'
          title='上传/查看文件'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showUploadAwardModal}>
              上传/查看文件
            </Button>
          )}
        />
        <Column
          align='center'
          title='修改'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showModifyAwardModal}>
              修改奖项内容
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
                  title: '删除奖项?',
                  okType: 'primary',
                  content: '确认要删除奖项?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              删除奖项
            </Button>
          )}
        />
      </Table>
      <Button type='primary'>暂存</Button>
    </div>
  );
};
