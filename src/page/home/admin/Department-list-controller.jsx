import React, { useEffect, useState } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  QUARY_DEPARTMENT,
  SAVE_DEPARTMENT,
  DELETE_DEPARTMENT,
} from '@/constants/api-constants';

// 样式
import '@/style/home/admin/department-list.styl';
import { Button, Table, Modal, Input, Form } from 'antd';
const { Column } = Table;
const { confirm } = Modal;

export default Form.create({ name: 'department' })(({ form }) => {
  const { getFieldDecorator } = form;
  const [departmentLoading, setDepartmentLoading] = useState(false),
    [departmentVisible, setDepartmentVisible] = useState(false),
    [departmentList, setDepartmentList] = useState([]),
    [isRefresh, setIsRefresh] = useState(false),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [deleteUuid, setDeleteUuid] = useState(''),
    [saveDataLoading, setSaveDataLoading] = useState(false);

  const showDepartmentModal = () => {
    setDepartmentVisible(true);
  };

  const hideDepartmentModal = () => {
    setDepartmentVisible(false);
  };

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);
        const res = await proxyFetch(SAVE_DEPARTMENT, value);
        setSaveDataLoading(false);
        setIsRefresh(true);

        if (res) {
          setDepartmentVisible(false);
        }
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (deleteUuid) {
        setDepartmentLoading(true);

        await proxyFetch(DELETE_DEPARTMENT, { uuid: deleteUuid }, 'DELETE');

        setDepartmentLoading(false);
        setIsRefresh(true);
      }
    })();

    // 删除之后将uuid清空
    return () => {
      setDeleteUuid('');
    };
  }, [deleteUuid]);

  /**
   * 当前没有数据时向前一页查询
   */
  useEffect(() => {
    if (departmentList.length === 0) {
      if (page !== 1) {
        setPage(page - 1);
      }
    }
  }, [departmentList, page]);

  useEffect(() => {
    setIsRefresh(true);
  }, [page]);

  useEffect(() => {
    let _isMounted = true;

    (async () => {
      if (isRefresh) {
        setDepartmentLoading(true);

        const { departmentList, pageSize, total } = await proxyFetch(
          QUARY_DEPARTMENT,
          { page },
          'GET'
        );

        if (_isMounted) {
          setDepartmentList(departmentList);
          setTotal(total);
          setPageSize(pageSize);
          setDepartmentLoading(false);
          setIsRefresh(false);
        }
      }
    })();
  }, [page, isRefresh]);

  return (
    <div className='department-list-box'>
      <p className='title-box'>
        <span>科室管理</span>
      </p>
      <div className='department-list-content-box'>
        <Button
          type='primary'
          style={{ marginBottom: 16 }}
          onClick={showDepartmentModal}
        >
          新增科室
        </Button>
        <Modal
          title='新增科室'
          visible={departmentVisible}
          onOk={hideDepartmentModal}
          onCancel={hideDepartmentModal}
          okText='确认'
          cancelText='取消'
        >
          <div className='inner-modal-box'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={handleSumbitSave}
            >
              {/* 科室 */}
              <Form.Item label='科室'>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入科室！',
                    },
                    {
                      message: '科室过长！',
                      max: 32,
                    },
                  ],
                })(
                  <Input
                    placeholder='请输入科室名称'
                    className='input'
                    size='large'
                  />
                )}
              </Form.Item>

              {/* 保存按钮 */}
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={saveDataLoading}
                  className='button'
                  size='large'
                >
                  保存
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Table
          dataSource={departmentList}
          loading={departmentLoading}
          className='table'
          rowKey={(record) => record.uuid}
          pagination={{
            current: page,
            total,
            pageSize,
            onChange: (page) => {
              setPage(page);
            },
          }}
        >
          <Column align='center' title='科室' dataIndex='name' key='name' />
          <Column
            align='center'
            title='操作'
            dataIndex=''
            key=''
            render={(text, record) => (
              <Button
                type='link'
                onClick={() => {
                  confirm({
                    title: '删除科室?',
                    okType: 'primary',
                    content: '确认要删除科室?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      setDeleteUuid(record.uuid);
                    },
                    onCancel() {},
                  });
                }}
              >
                删除
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
});
