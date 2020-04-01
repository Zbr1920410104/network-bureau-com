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
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='book' className='icon' />
          <span>论文/专著</span>
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
                      <span className='important-text'>论文/专著</span>
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
        title='查看附件'
        visible={uploadThesisVisible}
        onOk={hideUploadThesisModal}
        onCancel={hideUploadThesisModal}
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
      </Table>
    </div>
  );
};
