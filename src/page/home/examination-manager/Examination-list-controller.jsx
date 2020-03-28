import React, { useState } from 'react';

import ExportAllContent from '@/components/home/public/Export-all-content-controller.jsx';

// 路由
import { HOME_EXAMINATION_DETAIL } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// 样式
import { Table, Button, Select, Modal } from 'antd';
import '@/style/home/examination-manager/examination-list.styl';
const { Option } = Select,
  { Column } = Table;

export default props => {
  const history = useHistory();
  const personalInfoList = [
      {
        id: 1,
        name: '李锐',
        office: '战略研究科',
        phone: '0451-87654321',
        date: '2020-03-02'
      },
      {
        id: 2,
        name: '葛军',
        office: '数学教研科',
        phone: '0451-87654321',
        date: '2020-03-02'
      }
    ],
    [exportAllVisible, setExportAllVisible] = useState(false);

  const showExportAllModal = () => {
    setExportAllVisible(true);
  };

  const hideExportAllModal = () => {
    setExportAllVisible(false);
  };

  return (
    <div className='examination-list-box'>
      <p className='title-box'>
        <span>查看信息列表</span>
      </p>
      <div className='subtitle-box'>
        <p className='subtitle-title'>查看人员填写信息</p>
      </div>
      <div className='list-content-box'>
        <div className='list-title-box'>
          <Select placeholder='分类查看' className='list-select'>
            <Option value='已评分'>已评分</Option>
            <Option value='未评分'>未评分</Option>
          </Select>
          <Button
            type='primary'
            className='export-all-button'
            onClick={showExportAllModal}
          >
            导出所有人信息
          </Button>
          <Modal
            title='导出所有人信息'
            visible={exportAllVisible}
            onOk={hideExportAllModal}
            onCancel={hideExportAllModal}
            okText='确定'
            cancelText='取消'
          >
            <ExportAllContent />
          </Modal>
        </div>
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
            title='评分'
            dataIndex=''
            key=''
            render={(text, record) => (
              <Button
                type='link'
                onClick={() => {
                  history.push(HOME_EXAMINATION_DETAIL.path);
                }}
              >
                评分
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
