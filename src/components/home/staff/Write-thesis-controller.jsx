import React, { useState } from 'react';

import ModifyThesisContent from '@/components/home/staff/thesis/Modify-thesis-content-controller.jsx';
import UploadThesisContent from '@/components/home/staff/thesis/Upload-thesis-content-controller.jsx';

// 样式
import '@/style/home/staff/write-detail.styl';
import { Button, Table, Modal, Icon } from 'antd';
const { Column } = Table,
  { confirm } = Modal;

export default props => {
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
    [newThesisVisible, setNewThesisVisible] = useState(false),
    [modifyThesisVisible, setModifyThesisVisible] = useState(false),
    [uploadThesisVisible, setUploadThesisVisible] = useState(false);

  const showNewThesisModal = () => {
    setNewThesisVisible(true);
  };

  const hideNewThesisModal = () => {
    setNewThesisVisible(false);
  };

  const showModifyThesisModal = () => {
    setModifyThesisVisible(true);
  };

  const hideModifyThesisModal = () => {
    setModifyThesisVisible(false);
  };

  const showUploadThesisModal = () => {
    setUploadThesisVisible(true);
  };

  const hideUploadThesisModal = () => {
    setUploadThesisVisible(false);
  };

  return (
    <div className='write-item-box'>
      <div className='item-title-box'>
        <div className='title-left-box'>
          <Icon type='book' className='icon' />
          <span>论文/专著</span>
        </div>
        <Button
          type='link'
          icon='plus'
          style={{ marginBottom: 16 }}
          onClick={showNewThesisModal}
        >
          新增论文/专著
        </Button>
      </div>
      <Modal
        title='新增论文/专著'
        visible={newThesisVisible}
        onOk={hideNewThesisModal}
        onCancel={hideNewThesisModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyThesisContent />
      </Modal>
      <Modal
        title='修改论文/专著'
        visible={modifyThesisVisible}
        onOk={hideModifyThesisModal}
        onCancel={hideModifyThesisModal}
        okText='保存'
        cancelText='取消'
      >
        <ModifyThesisContent />
      </Modal>
      <Modal
        title='上传附件'
        visible={uploadThesisVisible}
        onOk={hideUploadThesisModal}
        onCancel={hideUploadThesisModal}
        okText='保存'
        cancelText='取消'
      >
        <UploadThesisContent />
      </Modal>
      <Table
        dataSource={leadThesisList}
        className='table'
        rowKey={record => record.id}
        scroll={{ x: 1850 }}
      >
        <Column
          align='center'
          title='标题'
          dataIndex='thesisTitle'
          key=''
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
          title='上传/查看附件'
          dataIndex=''
          fixed='right'
          width='100px'
          key=''
          render={() => (
            <Button type='link' onClick={showUploadThesisModal}>
              上传/查看附件
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
            <Button type='link' onClick={showModifyThesisModal}>
              修改论文/专著
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
                  title: '删除论文/专著?',
                  okType: 'primary',
                  content: '确认要删除论文/专著?',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {}
                });
              }}
            >
              删除论文/专著
            </Button>
          )}
        />
      </Table>
      <div className='item-bottom-box'>
        <Button type='primary' className='save-button'>
          暂存
        </Button>
      </div>
    </div>
  );
};
