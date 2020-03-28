import React, { useState } from 'react';

import VerifyProjectController from '@/components/home/business-manager/detail/Verify-project-controller.jsx';
import VerifyBasicController from '@/components/home/business-manager/detail/Verify-basic-controller.jsx';
import VerifyPatentController from '@/components/home/business-manager/detail/Verify-patent-controller.jsx';
import VerifyCopyrightController from '@/components/home/business-manager/detail/Verify-copyright-controller.jsx';
import VerifyAwardController from '@/components/home/business-manager/detail/Verify-award-controller.jsx';
import VerifyThesisController from '@/components/home/business-manager/detail/Verify-thesis-controller.jsx';

// 路由
import { HOME_VERIFY_LIST } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

import ExportOneContent from '@/components/home/public/Export-one-content-controller.jsx';

// 样式
import { Icon, Button, Modal, Input, Tabs } from 'antd';
import '@/style/home/business-manager/verify-detail.styl';
const { TabPane } = Tabs,
  { TextArea } = Input,
  { confirm } = Modal;

export default props => {
  const [exportOneVisible, setExportOneVisible] = useState(false),
    [verifyVisible, setVerifyVisible] = useState(false);

  const showExportOneModal = () => {
    setExportOneVisible(true);
  };

  const hideExportOneModal = () => {
    setExportOneVisible(false);
  };

  const showVerifyModal = () => {
    setVerifyVisible(true);
  };

  const hideVerifyModal = () => {
    setVerifyVisible(false);
  };
  return (
    <div className='verify-detail-box'>
      <p className='title-box'>
        <span>查看详情</span>
      </p>
      <div className='subtitle-box'>
        <Link to={HOME_VERIFY_LIST.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          <span>信息核实</span>
        </p>
      </div>
      <div className='detail-content-box'>
        <div className='list-title-box'>
          <Button
            type='primary'
            className='opinion-button'
            onClick={showVerifyModal}
          >
            回退
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
                    <span>我已审核完</span>
                    <span className='important-text'>
                      基本信息,获奖情况,论文/专著,项目,授权专利,软件著作权
                    </span>
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
            已核实所有信息,审核通过
          </Button>
          <Button
            type='primary'
            className='export-button'
            onClick={showExportOneModal}
          >
            导出当前员工信息
          </Button>
          <Modal
            title='导出当前员工信息'
            visible={exportOneVisible}
            onOk={hideExportOneModal}
            onCancel={hideExportOneModal}
            okText='确定'
            cancelText='取消'
          >
            <ExportOneContent />
          </Modal>
          <Modal
            title='请输入审核意见(不通过理由)'
            visible={verifyVisible}
            onOk={hideVerifyModal}
            onCancel={hideVerifyModal}
            okText='确定'
            cancelText='取消'
          >
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='100'
              placeholder='请输入审核意见(不通过理由)'
              className='modal-textArea-box'
            />
          </Modal>
        </div>
        <div className='verify-form-box'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='基本信息' key='1'>
              <VerifyBasicController />
            </TabPane>
            <TabPane tab='项目' key='2'>
              <VerifyProjectController />
            </TabPane>
            <TabPane tab='授权专利' key='3'>
              <VerifyPatentController />
            </TabPane>
            <TabPane tab='软件著作权' key='4'>
              <VerifyCopyrightController />
            </TabPane>
            <TabPane tab='获奖情况' key='5'>
              <VerifyAwardController />
            </TabPane>
            <TabPane tab='论文/专著' key='6'>
              <VerifyThesisController />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
