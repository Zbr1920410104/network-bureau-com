import React, { useState } from 'react';

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
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='audit' className='icon' />
          <span>软件著作权</span>
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
              onClick={hideVerifyModal}
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
                      <span className='important-text'>软件著作权</span>
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
