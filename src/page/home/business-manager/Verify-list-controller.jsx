import React, { useState, useEffect } from 'react';

import ExportAllContent from '@/components/home/business-manager/Export-all-content-controller.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 请求
import proxyFetch from '@/util/request';
import { GET_STAFF_VERIFY_INFO } from '@/constants/api-constants';

// redux
import { useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 路由
import { HOME_VERIFY_DETAIL } from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

// 样式
import {
  Checkbox,
  Table,
  Button,
  Select,
  Modal,
  Skeleton,
  Input,
  message,
} from 'antd';
import '@/style/home/business-manager/verify-list.styl';
const { Option } = Select,
  { Column } = Table,
  { Search } = Input;

export default (props) => {
  const plainOptions = [
    'basic',
    'project',
    'patent',
    'copyright',
    'award',
    'thesis',
  ];
  const localStorageVerifyItem = localStorage.getItem(
      `${LOCAL_STORAGE}-verifyItem`
    ),
    history = useHistory(),
    [staffVerifyInfo, setStaffVerifyInfo] = useState([]),
    [exportAllVisible, setExportAllVisible] = useState(false),
    [verifyItemVisible, setVerifyItemVisible] = useState(false),
    [staffLoading, setStaffLoading] = useState(false),
    [verifyStatus, setVerifyStatus] = useState(0),
    [name, setName] = useState(''),
    [isNeedRefresh, setIsNeedRefresh] = useState(true),
    [checkedList, setCheckedList] = useState(
      localStorageVerifyItem ? localStorageVerifyItem.split(',') : plainOptions
    ),
    [checkAll, setCheckAll] = useState(true),
    dispatch = useDispatch();

  const showExportAllModal = () => {
    setExportAllVisible(true);
  };

  const showVerifyItemModal = () => {
    setVerifyItemVisible(true);
  };

  const hideExportAllModal = () => {
    setExportAllVisible(false);
  };

  const hideVerifyItemModal = () => {
    if (!checkedList.length) {
      message.error('请选择需要审核的内容!');
    } else {
      setVerifyItemVisible(false);
    }
  };

  const handleSuccess = (uuid) => {
    localStorage.setItem(`${LOCAL_STORAGE}-verifyItem`, checkedList);
    dispatch(userAction.setVerifyItem([]));
    localStorage.setItem(`${LOCAL_STORAGE}-staffUuid`, uuid);
    dispatch(userAction.setStaffUuid(uuid));
    history.push(HOME_VERIFY_DETAIL.path);
  };

  const showError = () => {
    Modal.error({
      title: '无法核实',
      content: '员工未填写完毕或已全部核实后通过无法再核实',
      okText: '确认',
    });
  };

  const handleChange = (e) => {
    setCheckedList(e);
  };

  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      setCheckedList([
        'basic',
        'project',
        'patent',
        'copyright',
        'award',
        'thesis',
      ]);
    } else {
      setCheckedList([]);
    }
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    (async () => {
      if (isNeedRefresh) {
        setStaffLoading(true);

        const staffVerifyInfo = await proxyFetch(
          GET_STAFF_VERIFY_INFO,
          { verifyStatus, name },
          'GET'
        );

        setStaffVerifyInfo(staffVerifyInfo);
        setStaffLoading(false);
        setIsNeedRefresh(false);
      }
    })();
  }, [isNeedRefresh, verifyStatus, name]);

  return (
    <div className='verify-list-box'>
      <p className='title-box'>
        <span>查看信息列表</span>
      </p>
      <div className='subtitle-box'>
        <p className='subtitle-title'>查看人员填写信息</p>
      </div>
      <div className='list-content-box'>
        <div className='list-title-box'>
          <Select
            placeholder='分类查看'
            className='list-select'
            defaultValue='0'
            onChange={(e) => {
              setVerifyStatus(e);
              setName('');
              setIsNeedRefresh(true);
            }}
          >
            <Option value='0'>全部</Option>
            <Option value='未填写完毕'>未填写完毕</Option>
            <Option value='待核实'>待核实</Option>
            <Option value='核实通过'>核实通过</Option>
            <Option value='核实未通过'>核实未通过</Option>
          </Select>
          <Search
            className='search'
            placeholder='请输入姓名'
            enterButton
            onSearch={(e) => {
              setName(e);
              setIsNeedRefresh(true);
            }}
          />
          <Button
            type='primary'
            className='export-all-button'
            onClick={showExportAllModal}
          >
            批量导出信息
          </Button>
          <Button
            type='primary'
            className='export-all-button'
            onClick={showVerifyItemModal}
          >
            选择审核内容
          </Button>
          <Modal
            title='批量导出信息'
            visible={exportAllVisible}
            onOk={hideExportAllModal}
            onCancel={hideExportAllModal}
            okText='确定'
            cancelText='取消'
          >
            <ExportAllContent />
          </Modal>
          <Modal
            title='选择审核的内容'
            visible={verifyItemVisible}
            onOk={hideVerifyItemModal}
            onCancel={hideVerifyItemModal}
            okText='确定'
            cancelText='取消'
          >
            <div className='verify-item-select-box'>
              <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                全选
              </Checkbox>
              <Checkbox.Group
                options={[
                  { label: '基本信息', value: 'basic' },
                  { label: '项目', value: 'project' },
                  { label: '专利', value: 'patent' },
                  { label: '软件著作权', value: 'copyright' },
                  { label: '奖项', value: 'award' },
                  { label: '论文/专著', value: 'thesis' },
                ]}
                defaultValue={[]}
                value={checkedList}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </Modal>
        </div>
        <Skeleton loading={staffLoading}>
          <Table
            dataSource={staffVerifyInfo}
            className='table'
            rowKey={(record) => record.uuid}
          >
            <Column align='center' title='姓名' dataIndex='name' key='' />
            <Column align='center' title='科室' dataIndex='department' key='' />
            <Column align='center' title='手机号码' dataIndex='phone' key='' />
            <Column
              align='center'
              title='最后修改时间'
              dataIndex='currentWriteTime'
              key=''
              render={(text, record) => (
                <span>
                  {record.currentWriteTime
                    ? moment(record.currentWriteTime).format(
                        'YYYY-MM-DD h:mm:ss a'
                      )
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
              title='核实'
              dataIndex=''
              key=''
              render={(text, record) => (
                <Button
                  type='link'
                  onClick={() => {
                    if (record.verifyStatus === '待核实') {
                      handleSuccess(record.uuid);
                    } else {
                      showError();
                    }
                  }}
                >
                  核实
                </Button>
              )}
            />
          </Table>
        </Skeleton>
      </div>
    </div>
  );
};
