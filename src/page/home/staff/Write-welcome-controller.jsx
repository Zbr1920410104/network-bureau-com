import React from 'react';

// 样式
import { Table, Button } from 'antd';
import '@/style/home/staff/write-welcome.styl';

// 路由
import { HOME_WRITE_DETAIL } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

const { Column } = Table;

export default props => {
  const history = useHistory();
  const enterpriseRegistrationList = [];
  return (
    <div className='write-welcome-box'>
      <p className='title-box'>
        <span>欢迎填写个人信息</span>
      </p>
      <div className='subtitle-box'>
        <p className='subtitle-title'>查看填写/修改历史</p>
        <Button
          type='primary'
          htmlType='submit'
          className='button'
          onClick={() => {
            history.push(HOME_WRITE_DETAIL.path);
          }}
        >
          我要修改
        </Button>
      </div>
      <div className='write-list-box'>
        <Table
          dataSource={enterpriseRegistrationList}
          className='table'
          rowKey={record => record.uuid}
        >
          <Column title='修改时间' dataIndex='' key='' />
          <Column title='查看修改详情' dataIndex='' key='' />
        </Table>
      </div>
    </div>
  );
};
