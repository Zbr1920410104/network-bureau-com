import React, { useState } from 'react';

import ReviewCopyrightContent from '@/components/home/review-manager/copyright/Review-copyright-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Table, Modal, Button, Icon } from 'antd';
const { Column } = Table;

export default props => {
  const [reviewCopyrightVisible, setReviewCopyrightVisible] = useState(false);

  const showReviewCopyrightModal = () => {
    setReviewCopyrightVisible(true);
  };

  const hideReviewCopyrightModal = () => {
    setReviewCopyrightVisible(false);
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
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='audit' className='icon' />
        <span>软件著作权</span>
      </div>
      <Modal
        title='打分'
        visible={reviewCopyrightVisible}
        onOk={hideReviewCopyrightModal}
        onCancel={hideReviewCopyrightModal}
        okText='确定'
        cancelText='取消'
      >
        <ReviewCopyrightContent />
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
            <Button type='link' onClick={showReviewCopyrightModal}>
              打分
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
