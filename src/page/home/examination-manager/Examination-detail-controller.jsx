import React, { useState } from 'react';

import ExaminationProjectController from '@/components/home/examination-manager/detail/Examination-project-controller.jsx';
import ExaminationBasicController from '@/components/home/examination-manager/detail/Examination-basic-controller.jsx';
import ExaminationPatentController from '@/components/home/examination-manager/detail/Examination-patent-controller.jsx';
import ExaminationCopyrightController from '@/components/home/examination-manager/detail/Examination-copyright-controller.jsx';
import ExaminationAwardController from '@/components/home/examination-manager/detail/Examination-award-controller.jsx';
import ExaminationThesisController from '@/components/home/examination-manager/detail/Examination-thesis-controller.jsx';

// 路由
import { HOME_EXAMINATION_LIST } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

import ExportOneContent from '@/components/home/public/Export-one-content-controller.jsx';

// 样式
import { Icon, Button, Modal, Tabs } from 'antd';
import '@/style/home/examination-manager/examination-detail.styl';
const { TabPane } = Tabs,
  { confirm } = Modal;

export default props => {
  const [exportOneVisible, setExportOneVisible] = useState(false);

  const showExportOneModal = () => {
    setExportOneVisible(true);
  };

  const hideExportOneModal = () => {
    setExportOneVisible(false);
  };

  return (
    <div className='examination-detail-box'>
      <p className='title-box'>
        <span>查看详情</span>
      </p>
      <div className='subtitle-box'>
        <Link to={HOME_EXAMINATION_LIST.path}>
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
            className='success-button'
            onClick={() => {
              confirm({
                title: '确认全部评分完毕?',
                okType: 'primary',
                content: (
                  <div className='text-box'>
                    <span>确认已对</span>
                    <span className='important-text'>
                      基本信息,获奖情况,论文/专著,项目,授权专利,软件著作权
                    </span>
                    <span>的所有信息评分完毕?</span>
                  </div>
                ),
                okText: '确认',
                cancelText: '取消',
                onOk() {},
                onCancel() {}
              });
            }}
          >
            我已确认对所有内容完成评分
          </Button>
          <Button
            type='primary'
            className='export-button'
            onClick={showExportOneModal}
          >
            导出当前员工信息
          </Button>
          <Button
            type='primary'
            className='export-button'
          >
            导出当前员工得分表
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
        </div>
        <div className='examination-form-box'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='基本信息' key='1'>
              <ExaminationBasicController />
            </TabPane>
            <TabPane tab='项目' key='2'>
              <ExaminationProjectController />
            </TabPane>
            <TabPane tab='授权专利' key='3'>
              <ExaminationPatentController />
            </TabPane>
            <TabPane tab='软件著作权' key='4'>
              <ExaminationCopyrightController />
            </TabPane>
            <TabPane tab='获奖情况' key='5'>
              <ExaminationAwardController />
            </TabPane>
            <TabPane tab='论文/专著' key='6'>
              <ExaminationThesisController />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
