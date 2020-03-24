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
  const enterpriseRegistrationList = [
    {
      uuid: '1',
      name: '李锐',
      office: '战略研究科',
      date: '2020-03-22'
    },
    {
      uuid: '2',
      name: '李锐',
      office: '战略研究科',
      date: '2020-03-12'
    }
  ];
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
          <Column align='center' title='序号' dataIndex='uuid' key='' />
          <Column align='center' title='姓名' dataIndex='name' key='' />
          <Column align='center' title='科室' dataIndex='office' key='' />
          <Column align='center' title='最后修改时间' dataIndex='date' key='' />
        </Table>
      </div>
    </div>
  );
};
