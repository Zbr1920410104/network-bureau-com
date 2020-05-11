import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_STAFF_WRITE_INFO,
  GET_PERSONAL_EXPORT_INFO_URL,
} from '@/constants/api-constants';

// 样式
import { Table, Button, Skeleton, Modal, Checkbox } from 'antd';
import '@/style/home/staff/write-welcome.styl';

import moment from 'moment';

// 路由
import { HOME_WRITE_DETAIL } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

const { Column } = Table;

export default (props) => {
  const [staffWriteInfo, setStaffWriteInfo] = useState([]),
    [staffLoading, setStaffLoading] = useState(false),
    [exportOneVisible, setExportOneVisible] = useState(false),
    [exportList, setExportList] = useState([0, 1, 2, 3, 4, 5]),
    history = useHistory();

  const showExportOneModal = () => {
    setExportOneVisible(true);
  };

  const hideExportOneModal = () => {
    setExportOneVisible(false);
  };

  const handleExportStaff = async () => {
    let tempUrl = await proxyFetch(GET_PERSONAL_EXPORT_INFO_URL, {
      exportList,
    });

    if (tempUrl) {
      setExportOneVisible(false);

      const url = `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
        tempUrl
      )}`;
      window.open(url);
    }
  };

  const handleChange = (e) => {
    setExportList(e);
  };

  const expandedRowRender = (record) => {
    return (
      <div className='table-inner-info-box'>
        <span>{`项目得分:${
          record.projectScoreSum !== null ? record.projectScoreSum : '未评分  '
        }`}</span>
        <span>{`专利得分:${
          record.patentScoreSum !== null ? record.patentScoreSum : '未评分  '
        }`}</span>
        <span>{`软件著作权得分:${
          record.copyrightScoreSum !== null
            ? record.copyrightScoreSum
            : '未评分  '
        }`}</span>
        <span>{`奖项得分:${
          record.awardScoreSum !== null ? record.awardScoreSum : '未评分  '
        }`}</span>
        <span>{`论文/专著得分:${
          record.thesisScoreSum !== null ? record.thesisScoreSum : '未评分  '
        }`}</span>
      </div>
    );
  };

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
          className='export-button'
          onClick={showExportOneModal}
        >
          导出个人填写信息
        </Button>
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
        <Modal
          title='导出个人填写信息'
          visible={exportOneVisible}
          onOk={handleExportStaff}
          onCancel={hideExportOneModal}
          okText='确定'
          cancelText='取消'
        >
          <Checkbox.Group
            options={[
              { label: '基本信息', value: 0 },
              { label: '项目', value: 1 },
              { label: '专利', value: 2 },
              { label: '软件著作权', value: 3 },
              { label: '奖项', value: 4 },
              { label: '论文/专著', value: 5 },
            ]}
            value={exportList}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Modal>
      </div>
      <div className='write-list-box'>
        <Skeleton loading={staffLoading}>
          <Table
            dataSource={staffWriteInfo}
            className='table'
            rowKey={(record) => record.name}
            expandedRowRender={(record) => expandedRowRender(record)}
          >
            <Column align='center' title='姓名' dataIndex='name' key='' />
            <Column align='center' title='科室' dataIndex='department' key='' />
            <Column
              align='center'
              title='最后修改时间'
              dataIndex='writeTime'
              key=''
              render={(text, record) => (
                <span>
                  {record.currentWriteTime
                    ? moment(record.currentWriteTime).format('YYYY-MM-DD h:mm:ss a')
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
            <Column
              align='center'
              title='总得分'
              dataIndex='totalScore'
              key=''
              render={(text, record) => (
                <span>
                  {record.totalScore !== null ? record.totalScore : '未评分'}
                </span>
              )}
            />
          </Table>
        </Skeleton>
      </div>
    </div>
  );
};
