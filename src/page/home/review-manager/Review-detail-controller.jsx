import React, { useState } from 'react';

import ReviewProjectController from '@/components/home/review-manager/detail/Review-project-controller.jsx';
import ReviewBasicController from '@/components/home/review-manager/detail/Review-basic-controller.jsx';
import ReviewPatentController from '@/components/home/review-manager/detail/Review-patent-controller.jsx';
import ReviewCopyrightController from '@/components/home/review-manager/detail/Review-copyright-controller.jsx';
import ReviewAwardController from '@/components/home/review-manager/detail/Review-award-controller.jsx';
import ReviewThesisController from '@/components/home/review-manager/detail/Review-thesis-controller.jsx';

// 路由
import { HOME_REVIEW_LIST } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

import ExportOneContent from '@/components/home/public/Export-one-content-controller.jsx';

// 样式
import { Icon, Button, Modal } from 'antd';
import '@/style/home/review-manager/review-detail.styl';
const { confirm } = Modal;

export default props => {
  const [exportOneVisible, setExportOneVisible] = useState(false);

  const showExportOneModal = () => {
    setExportOneVisible(true);
  };

  const hideExportOneModal = () => {
    setExportOneVisible(false);
  };

  return (
    <div className='review-detail-box'>
      <p className='title-box'>
        <span>查看详情</span>
      </p>
      <div className='subtitle-box'>
        <Link to={HOME_REVIEW_LIST.path}>
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
          <Button type='primary' className='export-button'>
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
        <div className='review-form-box'>
          <ReviewBasicController />
          <ReviewProjectController />
          <ReviewPatentController />
          <ReviewCopyrightController />
          <ReviewAwardController />
          <ReviewThesisController />
        </div>
      </div>
    </div>
  );
};
