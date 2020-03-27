import React from 'react';
import '@/style/index.styl';

// 样式
import { Icon } from 'antd';

// 组件
import LoginComponent from '@/components/index/Login.jsx';

export default props => {
  return (
    <div className='index-box'>
      <div className='index-inner-box'>
        <div className='left-box'>
          <img
            className='image-background'
            src='/image/left.jpg'
            alt='Paris'
          />
          <div className='text-box'>
            <p className='main-describe'>欢迎使用</p>
            <p className='main-describe'>业务线上</p>
            <p className='main-describe'>评审系统</p>
            <p className='sub-describe'>
              轻松线上填写与评审,带给您愉快便捷的使用体验。
            </p>
          </div>
        </div>
        <div className='right-box'>
          <h1 className='logo'>
            <Icon type='reconciliation' /> <span>业务评审系统</span>
          </h1>
          <div className='form'>
            <LoginComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
