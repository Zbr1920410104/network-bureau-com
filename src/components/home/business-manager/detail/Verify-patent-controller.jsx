import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_VERIFY_PATENT_LIST } from '@/constants/api-constants';

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
  const { staffUuid } = useSelector((state) => state.userStore),
    [verifyVisible, setVerifyVisible] = useState(false),
    [verifyPatentList, setVerifyPatentList] = useState([]),
    [verifyPatentLoading, setVerifyPatentLoading] = useState(false),
    dispatch = useDispatch();

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };
  useEffect(() => {
    (async () => {
      setVerifyPatentLoading(true);

      const verifyPatentList = await proxyFetch(
        GET_VERIFY_PATENT_LIST,
        { staffUuid },
        'GET'
      );

      if (verifyPatentList) {
        setVerifyPatentList(verifyPatentList);
        setVerifyVisible(false);
        dispatch(userAction.setVerifyPatent(false));
      }

      setVerifyPatentLoading(false);
    })();
  }, [staffUuid, dispatch]);

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='tool' className='icon' />
          <span>专利</span>
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
                      <span className='important-text'>专利</span>
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
      <div className='verify-description-box'>
        <Skeleton loading={verifyPatentLoading}>
          {verifyPatentList?.length ? (
            verifyPatentList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`专利${index + 1}:  ${item.patentName}`}</span>
                      <span>{`状态: ${item.isVerify}`}</span>
                      <span>{`最近填写/修改于: ${
                        item.currentWriteTime
                          ? moment(item.currentWriteTime).format(
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
                <Descriptions.Item label='专利类型'>
                  {item.patentType}
                </Descriptions.Item>
                <Descriptions.Item label='授权号' span={2}>
                  {item.patentCode}
                </Descriptions.Item>
                <Descriptions.Item label='授权国家和地区' span={3}>
                  {item.patentNation}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写专利</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
