import React, { useState } from 'react';

// 样式
import '@/style/home/business-manager/verify-item-detail.styl';
import { Table, Icon, Button, Modal, Input } from 'antd';
const { TextArea } = Input,
  { confirm } = Modal,
  { Column } = Table;

export default props => {
  const [verifyVisible, setVerifyVisible] = useState(false);

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
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
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='tool' className='icon' />
          <span>专利</span>
        </div>
        <div className='title-right-box'>
          <Button
            type='link'
            icon='edit'
            className='opinion-button'
            onClick={showVerifyModal}
          >
            核实
          </Button>
        </div>
        <Modal
          title='请核实'
          visible={verifyVisible}
          onOk={hideVerifyModal}
          onCancel={hideVerifyModal}
          okText='确定'
          cancelText='取消'
        >
          <div className='button-box'>
            <Button
              type='primary'
              className='fail-button'
              onOk={hideVerifyModal}
            >
              核实未通过
            </Button>
            <Button
              type='primary'
              className='success-button'
              onClick={() => {
                confirm({
                  title: '确认核实通过?',
                  okType: 'primary',
                  content: (
                    <div className='text-box'>
                      <span>我已核实完</span>
                      <span className='important-text'>
                        专利
                      </span>
                      <span>的所有信息,确认通过?</span>
                    </div>
                  ),
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              核实通过
            </Button>
          </div>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            maxLength='100'
            placeholder='请输入核实意见及不通过理由'
            className='modal-textArea-box'
          />
        </Modal>
      </div>
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
