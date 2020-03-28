import React, { useState } from 'react';

// 样式
import '@/style/home/business-manager/verify-detail.styl';
import { Button, Table, Modal } from 'antd';
const { Column } = Table;

export default props => {
  const leadAwardList = [
      {
        id: 1,
        awardType: '个人',
        awardName: '陈德杯',
        awardTime: '2020-03-06',
        awardGrade: '一等奖',
        awardDepartment: '黑龙江省人民政府'
      },
      {
        id: 2,
        awardType: '团体',
        awardName: '陈德杯',
        awardTime: '2020-03-06',
        awardGrade: '一等奖',
        awardDepartment: '黑龙江省人民政府',
        awardNameList: '钱程、张博荣'
      }
    ],
    [uploadAwardVisible, setUploadAwardVisible] = useState(false);

  const showUploadAwardModal = () => {
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    setUploadAwardVisible(false);
  };

  return (
    <div>
      <Modal
        title='下载文件'
        visible={uploadAwardVisible}
        onOk={hideUploadAwardModal}
        onCancel={hideUploadAwardModal}
        okText='保存'
        cancelText='取消'
      >
        <div className='download-button-box'>
          <Button
            icon='download'
            size='large'
            className='download-button'
            type='primary'
          >
            获奖证明文件下载
          </Button>
        </div>
      </Modal>
      <Table
        dataSource={leadAwardList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1200 }}
        rowSelection={{
          type: 'radio',
          columnWidth: '100px'
        }}
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
          title='查看文件'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showUploadAwardModal}>
              查看文件
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
