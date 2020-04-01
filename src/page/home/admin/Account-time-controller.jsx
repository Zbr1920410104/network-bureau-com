import React from 'react';

import StaffTimeSet from '@/components/home/admin/time-set/Staff-time-set-controller.jsx';
import BusinessManagerTimeSet from '@/components/home/admin/time-set/Business-manager-time-set-controller.jsx';
import ReviewManagerTimeSet from '@/components/home/admin/time-set/Review-manager-time-set-controller.jsx';

// 样式
import '@/style/home/admin/account-time-set.styl';

export default props => {
  return (
    <div className='time-set-box'>
      <p className='title-box'>
        <span>开放时间设置</span>
      </p>
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
