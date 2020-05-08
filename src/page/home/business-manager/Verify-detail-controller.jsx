import React, { useEffect } from 'react';

import VerifyProjectController from '@/components/home/business-manager/detail/Verify-project-controller.jsx';
import VerifyBasicController from '@/components/home/business-manager/detail/Verify-basic-controller.jsx';
import VerifyPatentController from '@/components/home/business-manager/detail/Verify-patent-controller.jsx';
import VerifyCopyrightController from '@/components/home/business-manager/detail/Verify-copyright-controller.jsx';
import VerifyAwardController from '@/components/home/business-manager/detail/Verify-award-controller.jsx';
import VerifyThesisController from '@/components/home/business-manager/detail/Verify-thesis-controller.jsx';

// 路由
import { HOME_VERIFY_LIST } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// import ExportOneContent from '@/components/home/public/Export-one-content-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 请求
import proxyFetch from '@/util/request';
import {
  FINISH_BUSINESS_MANAGER_VERIFY,
} from '@/constants/api-constants';

// 样式
import { Icon, Button, Modal } from 'antd';
import '@/style/home/business-manager/verify-detail.styl';
const { confirm } = Modal;

export default (props) => {
  const localStorageStaffUuid = localStorage.getItem(
      `${LOCAL_STORAGE}-staffUuid`
    ),
    localStorageVerifyItem = localStorage.getItem(
      `${LOCAL_STORAGE}-verifyItem`
    ),
    { staffUuid, verifyItem } = useSelector((state) => state.userStore),
    dispatch = useDispatch(),
    history = useHistory();

  useEffect(() => {
    if (localStorageStaffUuid && !staffUuid) {
      dispatch(userAction.setStaffUuid(localStorageStaffUuid));
    }
  }, [localStorageStaffUuid, staffUuid, dispatch]);

  useEffect(() => {
    if (localStorageVerifyItem && !verifyItem.length) {
      dispatch(userAction.setVerifyItem(localStorageVerifyItem));
    }
  }, [localStorageVerifyItem, verifyItem, dispatch]);

  /**
   * 提交事件
   */
  const handleSumbitSave = () => {
    (async () => {
      const res = await proxyFetch(FINISH_BUSINESS_MANAGER_VERIFY, {
        uuid: staffUuid,
      });

      if (res) {
        history.push(HOME_VERIFY_LIST.path);
      }
    })();
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
            className='success-button'
            onClick={() => {
              confirm({
                title: '确认核实通过?',
                okType: 'primary',
                content: (
                  <div className='text-box'>
                    <span>我已核实完</span>
                    <span className='important-text'>
                      基本信息,获奖情况,论文/专著,项目,授权专利,软件著作权
                    </span>
                    <span>的所有信息,确认通过?</span>
                  </div>
                ),
                okText: '确认',
                cancelText: '取消',
                onOk() {
                  handleSumbitSave();
                },
                onCancel() {},
              });
            }}
          >
            已核实所有信息,核实通过
          </Button>
        </div>
        {staffUuid ? (
          <div className='verify-form-box'>
            {verifyItem.indexOf('basic') !== -1 ? (
              <VerifyBasicController />
            ) : null}
            {verifyItem.indexOf('project') !== -1 ? (
              <VerifyProjectController />
            ) : null}
            {verifyItem.indexOf('patent') !== -1 ? (
              <VerifyPatentController />
            ) : null}
            {verifyItem.indexOf('copyright') !== -1 ? (
              <VerifyCopyrightController />
            ) : null}
            {verifyItem.indexOf('award') !== -1 ? (
              <VerifyAwardController />
            ) : null}
            {verifyItem.indexOf('thesis') !== -1 ? (
              <VerifyThesisController />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
