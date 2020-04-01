import React, { useState } from 'react';

import ReviewThesisContent from '@/components/home/review-manager/thesis/Review-thesis-content-controller.jsx';

// 样式
import '@/style/home/review-manager/review-item-detail.styl';
import { Table, Button, Modal, Icon } from 'antd';
const { Column } = Table;

export default props => {
  const [reviewThesisVisible, setReviewThesisVisible] = useState(false);

  const showReviewThesisModal = () => {
    setReviewThesisVisible(true);
  };

  const hideReviewThesisModal = () => {
    setReviewThesisVisible(false);
  };

  const leadThesisList = [
      {
        id: 1,
        thesisTitle: '基于VueJs的WEB前端开发研究',
        thesisType: 1,
        thesisJournal: 'Chinese Science Bulletin',
        thesisTime: '2020-03-06',
        thesisGrade: 'SCI',
        thesisCode: '123456',
        thesisFirstAuthor: '翟天临',
        thesisAuthorSequence: '通讯作者'
      },
      {
        id: 2,
        thesisType: 1,
        thesisTitle: 'Javascript的运用与提高',
        thesisJournal: 'Nature methods',
        thesisTime: '2020-03-06',
        thesisGrade: 'SCI',
        thesisCode: '12345678',
        thesisFirstAuthor: '翟天临',
        thesisAuthorSequence: '第一作者'
      },
      {
        id: 3,
        thesisType: 2,
        thesisTitle: 'Typescript的运用与提高',
        thesisFirstAuthor: '翟天临',
        thesisAuthorSequence: '编辑'
      }
    ],
    [uploadThesisVisible, setUploadThesisVisible] = useState(false);

  const showUploadThesisModal = () => {
    setUploadThesisVisible(true);
  };

  const hideUploadThesisModal = () => {
    setUploadThesisVisible(false);
  };

  return (
    <div className='review-item-detail-box'>
      <div className='detail-title-box'>
        <Icon type='book' className='icon' />
        <span>论文/专著</span>
      </div>
      <Modal
        title='打分'
        visible={reviewThesisVisible}
        onOk={hideReviewThesisModal}
        onCancel={hideReviewThesisModal}
        okText='确定'
        cancelText='取消'
      >
        <ReviewThesisContent />
      </Modal>
      <Modal
        title='查看附件'
        visible={uploadThesisVisible}
        onOk={hideUploadThesisModal}
        onCancel={hideUploadThesisModal}
        okText='确定'
        cancelText='取消'
      >
        <div className='download-button-box'>
          <Button
            icon='download'
            size='large'
            className='download-button'
            type='primary'
          >
            论文/专著证明附件下载
          </Button>
        </div>
      </Modal>
      <Table
        dataSource={leadThesisList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1450 }}
        rowSelection={{
          type: 'radio',
          columnWidth: '100px'
        }}
      >
        <Column
          align='center'
          title='标题'
          dataIndex='thesisTitle'
          key=''
          fixed='left'
          width='240px'
        />
        <Column
          align='center'
          title='类型'
          dataIndex='thesisType'
          key=''
          width='100px'
          render={(text, record) => (record.thesisType === 1 ? '论文' : '专著')}
        />
        <Column
          align='center'
          title='发表期刊名称'
          dataIndex='thesisJournal'
          key=''
          width='180px'
        />
        <Column
          align='center'
          title='发表期刊时间'
          dataIndex='thesisTime'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='期刊级别'
          dataIndex='thesisGrade'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='论文索引号'
          dataIndex='thesisCode'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='提交人作者次序'
          dataIndex='thesisAuthorSequence'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='第一作者'
          dataIndex='thesisFirstAuthor'
          key=''
          width='100px'
        />
        <Column
          align='center'
          title='查看附件'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showUploadThesisModal}>
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
            <Button type='link' onClick={showReviewThesisModal}>
              打分
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
