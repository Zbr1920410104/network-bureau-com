import React, { useState } from 'react';

// 样式
import '@/style/home/business-manager/verify-item-detail.styl';
import { Descriptions, Icon, Button, Modal, Input } from 'antd';
const { TextArea } = Input,
  { confirm } = Modal;

export default props => {
  const [verifyVisible, setVerifyVisible] = useState(false);

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };

  return (
    <div className='verify-item-detail-box'>
      <div className='detail-title-box'>
        <div className='title-left-box'>
          <Icon type='file-text' className='icon' />
          <span>基本信息</span>
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
                      <span className='important-text'>基本信息</span>
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
      <Descriptions className='description-box'>
        <Descriptions.Item label='姓名'>李锐</Descriptions.Item>
        <Descriptions.Item label='身份证号'>
          230108198005120614
        </Descriptions.Item>
        <Descriptions.Item label='性别'>男</Descriptions.Item>
        <Descriptions.Item label='民族'>汉</Descriptions.Item>
        <Descriptions.Item label='籍贯'>辽宁省盖州</Descriptions.Item>
        <Descriptions.Item label='政治面貌'>共产党员</Descriptions.Item>
        <Descriptions.Item label='科室'>战略研究科</Descriptions.Item>
        <Descriptions.Item label='办公电话'>0451-58685774</Descriptions.Item>
        <Descriptions.Item label='手机'>18351923820</Descriptions.Item>
        <Descriptions.Item label='学历/学位'>硕士</Descriptions.Item>
        <Descriptions.Item label='毕业学校'>哈尔滨理工大学</Descriptions.Item>
        <Descriptions.Item label='所学专业'>软件工程</Descriptions.Item>
        <Descriptions.Item label='职务'>研究员</Descriptions.Item>
        <Descriptions.Item label='参加工作时间'>2020-03-10</Descriptions.Item>
        <Descriptions.Item label='职称'>副高级</Descriptions.Item>
        <Descriptions.Item label='获得时间'>2020-03-11</Descriptions.Item>
        <Descriptions.Item label='研究方向'>人工智能</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
