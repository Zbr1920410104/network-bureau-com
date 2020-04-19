import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import { GET_STAFF_WRITE_INFO } from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 样式
import { Table, Button, Skeleton, message } from 'antd';
import '@/style/home/staff/write-welcome.styl';

import moment from 'moment';
import md5 from 'md5';

// 路由
import { HOME_WRITE_DETAIL, HOME_PASSWORD } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

const { Column } = Table;

export default (props) => {
  const { password, modifyPassword } = useSelector((state) => state.userStore),
    [staffWriteInfo, setStaffWriteInfo] = useState([]),
    [staffLoading, setStaffLoading] = useState(false),
    history = useHistory(),
    dispatch = useDispatch();

  useEffect(() => {
    if (password === md5('123456') && !modifyPassword) {
      message.error('请修改初始密码后再进行评审');
      history.push(HOME_PASSWORD.path);
      dispatch(userAction.setModifyPassword(false));
    }
  }, [password, modifyPassword, dispatch, history]);

  useEffect(() => {
    (async () => {
      setStaffLoading(true);

      const staffWriteInfo = await proxyFetch(GET_STAFF_WRITE_INFO, {}, 'GET');

      setStaffWriteInfo(staffWriteInfo);
      setStaffLoading(false);
    })();
  }, []);
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
        <Skeleton loading={staffLoading}>
          <Table
            dataSource={staffWriteInfo}
            className='table'
            rowKey={(record) => record.id}
          >
            <Column align='center' title='序号' dataIndex='id' key='' />
            <Column align='center' title='姓名' dataIndex='name' key='' />
            <Column align='center' title='科室' dataIndex='department' key='' />
            <Column
              align='center'
              title='最后修改时间'
              dataIndex='writeTime'
              key=''
              render={(text, record) => (
                <span>
                  {record.writeTime
                    ? moment(record.writeTime).format('YYYY-MM-DD h:mm:ss a')
                    : ''}
                </span>
              )}
            />
            <Column
              align='center'
              title='最后核实时间'
              dataIndex='verifyTime'
              key=''
              render={(text, record) => (
                <span>
                  {record.verifyTime
                    ? moment(record.verifyTime).format('YYYY-MM-DD h:mm:ss a')
                    : ''}
                </span>
              )}
            />
            <Column
              align='center'
              title='核实状态'
              dataIndex='verifyStatus'
              key=''
            />
          </Table>
        </Skeleton>
      </div>
    </div>
  );
};
