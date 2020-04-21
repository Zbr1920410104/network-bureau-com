import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_VERIFY_PROJECT_LIST } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

import moment from 'moment';

// 样式
import '@/style/home/business-manager/verify-detail.styl';
import { Icon, Button, Modal, Input, Skeleton, Descriptions } from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default (props) => {
  const { staffUuid } = useSelector((state) => state.userStore),
    [verifyVisible, setVerifyVisible] = useState(false),
    [verifyProjectList, setVerifyProjectList] = useState([]),
    [verifyProjectLoading, setVerifyProjectLoading] = useState(false),
    dispatch = useDispatch();

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };
  useEffect(() => {
    (async () => {
      setVerifyProjectLoading(true);

      const verifyProjectList = await proxyFetch(
        GET_VERIFY_PROJECT_LIST,
        { staffUuid },
        'GET'
      );

      if (verifyProjectList) {
        setVerifyProjectList(verifyProjectList);
        setVerifyVisible(false);
        dispatch(userAction.setVerifyProject(false));
      }

      setVerifyProjectLoading(false);
    })();
  }, [staffUuid, dispatch]);

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='file-done' className='icon' />
          <span>项目</span>
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
                      <span className='important-text'>项目</span>
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
        <Skeleton loading={verifyProjectLoading}>
          {verifyProjectList?.length ? (
            verifyProjectList.map((item, index) => (
              <Descriptions
                key={item.uuid}
                title={
                  <div className='verify-description-title'>
                    <div className='description-title-text'>
                      <span>{`项目${index + 1}:  ${item.name}`}</span>
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
                <Descriptions.Item label='项目类型'>
                  {item.type === 1 ? (
                    <span>主持项目</span>
                  ) : (
                    <span>参与项目</span>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label='开始时间'>
                  {item.startTime
                    ? moment(item.startTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='结束时间'>
                  {item.endTime
                    ? moment(item.endTime).format('YYYY-MM-DD')
                    : ''}
                </Descriptions.Item>
                <Descriptions.Item label='项目编号'>
                  {item.code}
                </Descriptions.Item>
                <Descriptions.Item label='项目来源'>
                  {item.resource}
                </Descriptions.Item>
                <Descriptions.Item label='项目经费'>
                  {`${item.funds}万元`}
                </Descriptions.Item>
                <Descriptions.Item label='负责人'>
                  {item.controller}
                </Descriptions.Item>
                <Descriptions.Item label='参与人名单' span={2}>
                  {item.participant}
                </Descriptions.Item>
                <Descriptions.Item label='主要研究内容' span={3}>
                  {item.content}
                </Descriptions.Item>
              </Descriptions>
            ))
          ) : (
            <span>未填写项目</span>
          )}
        </Skeleton>
      </div>
    </div>
    // <Table
    //   dataSource={leadProjectList}
    //   className='table'
    //   rowKey={(record) => record.id}
    //   scroll={{ x: 1000 }}
    //   rowSelection={{
    //     type: 'radio',
    //     columnWidth: '100px',
    //   }}
    // >
    //   <Column
    //     align='center'
    //     title='项目类型'
    //     dataIndex='type'
    //     key=''
    //     fixed='left'
    //     width='100px'
    //     render={(text, record) =>
    //       record.type === 1 ? '主持项目' : '参与项目'
    //     }
    //   />
    //   <Column
    //     align='center'
    //     title='项目名称'
    //     dataIndex='name'
    //     key=''
    //     fixed='left'
    //     width='200px'
    //   />
    //   <Column
    //     align='center'
    //     title='项目起止时间'
    //     dataIndex='time'
    //     key=''
    //     width='150px'
    //   />
    //   <Column
    //     align='center'
    //     title='项目编号'
    //     dataIndex='code'
    //     key=''
    //     width='150px'
    //   />
    //   <Column
    //     align='center'
    //     title='项目来源'
    //     dataIndex='resource'
    //     key=''
    //     width='150px'
    //   />
    //   <Column
    //     align='center'
    //     title='项目经费(万元)'
    //     dataIndex='funds'
    //     key=''
    //     width='100px'
    //   />
    //   <Column
    //     align='center'
    //     title='主要研究内容'
    //     dataIndex='content'
    //     key='content'
    //     width='300px'
    //   />
    //   <Column
    //     align='center'
    //     title='参与者名单'
    //     dataIndex='participant'
    //     key=''
    //     width='300px'
    //   />
    // </Table>
  );
};
