import React from 'react';

// 路由
import { HOME_MODIFY_DETAIL } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// 样式
import { Table, Button } from 'antd';
import '@/style/home/business-manager/modify-list.styl';

const { Column } = Table;

export default props => {
  const history = useHistory();
  const personalInfoList = [
    {
      id:'1',
      name: '张博荣',
      office: '哈理工1819',
      phone: '0451-87654321',
      date: '2020-03-02'
    }
  ];
  return (
    <div className='modify-list-box'>
      <div className='subtitle-box'>
        <p className='subtitle-title'>查看人员填写信息</p>
      </div>
      <div className='write-list-box'>
        <Table
          dataSource={personalInfoList}
          className='table'
          rowKey={record => record.id}
        >
          <Column align='center' title='姓名' dataIndex='name' key='' />
          <Column align='center' title='科室' dataIndex='office' key='' />
          <Column align='center' title='办公号码' dataIndex='phone' key='' />
          <Column align='center' title='最后修改时间' dataIndex='date' key='' />
          <Column
            align='center'
            title='查看详情'
            dataIndex=''
            key=''
            render={(text, record) => (
              <Button
                type='link'
                onClick={() => {
                  history.push(HOME_MODIFY_DETAIL.path);
                }}
              >
                查看详情
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
