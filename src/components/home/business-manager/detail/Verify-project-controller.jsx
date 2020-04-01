import React, { useState } from 'react';

// 样式
import '@/style/home/business-manager/verify-detail.styl';
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
  const leadProjectList = [
    {
      id: 1,
      type: 1,
      name: '软件测试1',
      time: '2020-03-04~202003-20',
      code: '101010101',
      resource: '网信办',
      funds: 23,
      participant: '钱程、张博荣',
      content: 'js开发'
    },
    {
      id: 2,
      type: 2,
      name: '软件测试2',
      time: '2020-03-05~202003-25',
      code: '101010106',
      resource: '网信办',
      funds: 32,
      participant: '钱程、张博荣',
      content: '系统开发'
    }
  ];

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='file-done' className='icon' />
          <span>项目</span>
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
                        项目
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
        dataSource={leadProjectList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1000 }}
        rowSelection={{
          type: 'radio',
          columnWidth: '100px'
        }}
      >
        <Column
          align='center'
          title='项目类型'
          dataIndex='type'
          key=''
          fixed='left'
          width='100px'
          render={(text, record) =>
            record.type === 1 ? '主持项目' : '参与项目'
          }
        />
        <Column
          align='center'
          title='项目名称'
          dataIndex='name'
          key=''
          fixed='left'
          width='200px'
        />
        <Column
          align='center'
          title='项目起止时间'
          dataIndex='time'
          key=''
          width='150px'
        />
        <Column
          align='center'
          title='项目编号'
          dataIndex='code'
          key=''
          width='150px'
        />
        <Column
          align='center'
          title='项目来源'
          dataIndex='resource'
          key=''
          width='150px'
        />
        <Column
          align='center'
          title='项目经费(万元)'
          dataIndex='funds'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='主要研究内容'
          dataIndex='content'
          key='content'
          width='300px'
        />
        <Column
          align='center'
          title='参与者名单'
          dataIndex='participant'
          key=''
          width='300px'
        />
      </Table>
    </div>
  );
};
