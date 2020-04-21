import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_VERIFY_THESIS_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

// 样式
import '@/style/home/business-manager/verify-item-detail.styl';
import { Icon, Button, Modal, Input, Descriptions, Skeleton } from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid, verifyThesis } = useSelector((state) => state.userStore),
    [verifyVisible, setVerifyVisible] = useState(false),
    [uploadThesisVisible, setUploadThesisVisible] = useState(false),
    [verifyThesisList, setVerifyThesisList] = useState([]),
    [verifyThesisLoading, setVerifyThesisLoading] = useState(false),
    dispatch = useDispatch();

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };

  const showUploadThesisModal = () => {
    setUploadThesisVisible(true);
  };

  const hideUploadThesisModal = () => {
    setUploadThesisVisible(false);
  };

  useEffect(() => {
    (async () => {
      setVerifyThesisLoading(true);

      const verifyThesisList = await proxyFetch(
        GET_VERIFY_THESIS_LIST,
        { staffUuid },
        'GET'
      );

      if (verifyThesisList) {
        setVerifyThesisList(verifyThesisList);
        setUploadThesisVisible(false);
        setVerifyVisible(false);
        dispatch(userAction.setVerifyThesis(false));
      }

      setVerifyThesisLoading(false);
    })();
  }, [verifyThesis, staffUuid, dispatch]);

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='book' className='icon' />
          <span>论文/专著</span>
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
                      <span className='important-text'>论文/专著</span>
                      <span>的所有信息,确认通过?</span>
                    </div>
                  ),
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {},
                  onCancel() {},
                });
              }}
            >
              核实通过
            </Button>
          </div>
          <TextArea
            rows={3}
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
      <div className='verify-description-box'>
        <Skeleton loading={verifyThesisLoading}>
          {verifyThesisList?.length ? (
            verifyThesisList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`论文/专著${index + 1}:  ${
                        item.thesisTitle
                      }`}</span>
                      <span>{`状态: ${item.isVerify}`}</span>
                      <span>{`最近填写/修改于: ${
                        item.currentVerifyTime
                          ? moment(item.currentVerifyTime).format(
                              'YYYY-MM-DD h:mm:ss a'
                            )
                          : ''
                      }`}</span>
                    </div>
                    <div className='description-title-button'>
                      <Button
                        type='link'
                        icon='edit'
                        className='opinion-button'
                        onClick={showVerifyModal}
                      >
                        核实
                      </Button>
                    </div>
                  </div>
                }
              >
                <Descriptions.Item label='类型'>
                  {item.thesisType}
                </Descriptions.Item>
                <Descriptions.Item label='发表时间'>
                  {item.thesisTime
                    ? moment(item.thesisTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                {item.thesisType === '论文' ? (
                  <>
                    <Descriptions.Item label='发表期刊名称'>
                      {item.thesisJournal}
                    </Descriptions.Item>
                    <Descriptions.Item label='期刊级别'>
                      {item.thesisGrade}
                    </Descriptions.Item>
                    <Descriptions.Item label='论文索引号'>
                      {item.thesisCode}
                    </Descriptions.Item>
                  </>
                ) : null}
                <Descriptions.Item label='第一作者'>
                  {item.thesisFirstAuthor}
                </Descriptions.Item>
                <Descriptions.Item label='提交人作者次序'>
                  {item.thesisAuthorSequence}
                </Descriptions.Item>
                <Descriptions.Item label='查看附件'>
                  <Button
                    type='link'
                    onClick={() => {
                      showUploadThesisModal(item.uuid);
                    }}
                    className='link-button'
                  >
                    <Icon type='download' />
                    <span>查看</span>
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写论文/专著</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
