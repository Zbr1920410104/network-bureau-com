import React, { useState } from 'react';

import ReviewAwardContent from '@/components/home/review-manager/award/Review-award-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Button, Table, Modal, Icon } from 'antd';
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
    [uploadAwardVisible, setUploadAwardVisible] = useState(false),
    [reviewAwardVisible, setReviewAwardVisible] = useState(false);

  const showUploadAwardModal = () => {
    setUploadAwardVisible(true);
  };

  const hideUploadAwardModal = () => {
    setUploadAwardVisible(false);
  };

  const showReviewAwardModal = () => {
    setReviewAwardVisible(true);
  };

  const hideReviewAwardModal = () => {
    setReviewAwardVisible(false);
  };

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='trophy' className='icon' />
        <span>获奖情况</span>
      </div>
      <Modal
        title='下载附件'
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
            获奖证明附件下载
          </Button>
        </div>
      </Modal>
      <Modal
        title='打分'
        visible={reviewAwardVisible}
        onOk={hideReviewAwardModal}
        onCancel={hideReviewAwardModal}
        okText='确定'
        cancelText='取消'
      >
        <ReviewAwardContent />
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
        <Column
          align='center'
          title='打分'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showReviewAwardModal}>
              打分
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
