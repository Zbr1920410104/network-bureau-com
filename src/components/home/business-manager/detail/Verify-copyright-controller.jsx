import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_VERIFY_COPYRIGHT_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

import { Icon, Button, Modal, Input, Descriptions, Skeleton } from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const [verifyVisible, setVerifyVisible] = useState(false),
    { staffUuid, verifyCopyright } = useSelector((state) => state.userStore),
    [verifyCopyrightList, setVerifyCopyrightList] = useState([]),
    [verifyCopyrightLoading, setVerifyCopyrightLoading] = useState(false),
    dispatch = useDispatch();

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };
  useEffect(() => {
    (async () => {
      setVerifyCopyrightLoading(true);

      const verifyCopyrightList = await proxyFetch(
        GET_VERIFY_COPYRIGHT_LIST,
        { staffUuid },
        'GET'
      );

      if (verifyCopyrightList) {
        setVerifyVisible(false);
        setVerifyCopyrightList(verifyCopyrightList);
        dispatch(userAction.setVerifyCopyright(false));
      }

      setVerifyCopyrightLoading(false);
    })();
  }, [verifyCopyright, staffUuid, dispatch]);

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='audit' className='icon' />
          <span>软件著作权</span>
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
        <Skeleton loading={verifyCopyrightLoading}>
          {verifyCopyrightList?.length ? (
            verifyCopyrightList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`软件著作权${index + 1}:  ${
                        item.copyrightName
                      }`}</span>
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
                <Descriptions.Item label='权利取得方式'>
                  {item.copyrightType}
                </Descriptions.Item>
                <Descriptions.Item label='登记号'>
                  {item.copyrightCode}
                </Descriptions.Item>
                <Descriptions.Item label='授权范围'>
                  {item.copyrightArrange}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写软件著作权</span>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
