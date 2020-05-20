import React from 'react';

import StaffTimeSet from '@/components/home/admin/time-set/Staff-time-set-controller.jsx';
import BusinessManagerTimeSet from '@/components/home/admin/time-set/Business-manager-time-set-controller.jsx';
import ReviewManagerTimeSet from '@/components/home/admin/time-set/Review-manager-time-set-controller.jsx';

// 样式
import { Alert } from 'antd';
import '@/style/home/admin/account-time-set.styl';

export default (props) => {
  return (
    <div className='time-set-box'>
      <p className='title-box'>
        <span>开放时间设置</span>
      </p>
      <Alert
        message='开放时间设置说明'
        description={
          <div className='text-box'>
            <span className='important-text'>系统开关</span>
            <span>控制系统是否开放；</span>
            <span className='important-text'>时间设置开关</span>
            <span>控制是否设置时间限制，当</span>
            <span className='important-text'>时间设置开关</span>
            <span>打开时，需设置系统开放的</span>
            <span className='important-text'>开始时间</span>
            <span>和</span>
            <span className='important-text'>结束时间</span>
            <span>，用户可以在这段时间内登录使用本系统。关闭</span>
            <span className='important-text'>时间设置开关</span>
            <span>时，用户可以无限期登录使用本系统。</span>
          </div>
        }
        type='info'
        showIcon
      />
      <div className='time-staff-content-box'>
        <div className='content-left-box'>
          <StaffTimeSet />
        </div>

        <div className='content-middle-box'>
          <BusinessManagerTimeSet />
        </div>

        <div className='content-right-box'>
          <ReviewManagerTimeSet />
        </div>
      </div>
    </div>
  );
};
