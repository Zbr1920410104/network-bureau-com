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
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='trophy' className='icon' />
          <span>获奖情况</span>
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
                        获奖情况
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
      <Modal
        title='下载附件'
        visible={uploadAwardVisible}
        onOk={hideUploadAwardModal}
        onCancel={hideUploadAwardModal}
        okText='已下载'
        cancelText='取消'
      >
        <div className='download-button-box'>
          <Button
            icon='download'
            size='large'
            className='download-button'
            type='primary'
          >
            获奖证明附件下载
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
          title='查看附件'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showUploadAwardModal}>
              查看附件
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
