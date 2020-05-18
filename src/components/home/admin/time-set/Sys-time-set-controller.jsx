import React from 'react';

import { DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <DatePicker placeholder='20XX-XX-XX' showTime />
    </ConfigProvider>
  );
};
