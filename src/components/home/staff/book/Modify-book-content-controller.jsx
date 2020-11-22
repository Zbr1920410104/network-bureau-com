import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import userAction from "@/redux/action/user";

// 请求
import proxyFetch from "@/util/request";
import {
  MODIFY_STAFF_BOOK,
  GET_STAFF_BOOK_BY_UUID,
} from "@/constants/api-constants";

// 组件
import moment from "moment";

// 样式
import { Form, Input, DatePicker, Select, Button } from "antd";
const { Option } = Select;

export default Form.create({ name: "modifyBook" })(({ form }) => {
  const { getFieldDecorator, setFieldsValue } = form,
    { staffBookUuid } = useSelector((state) => state.userStore),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (staffBookUuid) {
        const staffBook = await proxyFetch(
          GET_STAFF_BOOK_BY_UUID,
          { staffBookUuid },
          "GET"
        );

        if (staffBook) {
          // 时间处理
          if (staffBook.time) {
            staffBook.time = moment(staffBook.time);
          }

          setFieldsValue(staffBook);
          dispatch(userAction.setChangeBook(false));
        }
      }
    })();
  }, [setFieldsValue, staffBookUuid, dispatch]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (!err) {
        setSaveDataLoading(true);

        value.uuid = staffBookUuid;
        const res = await proxyFetch(MODIFY_STAFF_BOOK, value);

        setSaveDataLoading(false);

        if (res) {
          dispatch(userAction.setChangeBook(true));
        }
      }
    });
  };

  return (
    <div className="inner-form-box">
      <Form>
        <Form.Item
          label="著作名称"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入著作名称!" }],
          })(<Input placeholder="请输入著作名称" />)}
        </Form.Item>

        <Form.Item
          label="发表时间"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator("time", {
            rules: [{ required: true, message: "请输入发表时间" }],
          })(<DatePicker placeholder="20XX-XX-XX" />)}
        </Form.Item>

        <Form.Item
          label="著作ISBN号"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator("copyrightOwner", {
            rules: [{ required: true, message: "请输入著作ISBN号" }],
          })(<Input placeholder="著作ISBN号" />)}
        </Form.Item>

        <Form.Item
          label="著作出版社"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator("publisher", {
            rules: [{ required: true, message: "请输入著作出版社" }],
          })(<Input placeholder="著作出版社" />)}
        </Form.Item>

        <Form.Item
          label="编辑排名"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator("rank", {
            rules: [{ required: true, message: "请输入编辑排名" }],
          })(
            <Select placeholder="编辑排名">
              <Option value="第一作者">第一作者</Option>
              <Option value="第二作者">第二作者</Option>
              <Option value="第三作者">第三作者</Option>
              <Option value="主编">主编</Option>
              <Option value="副主编">副主编</Option>
              <Option value="翻译作者">翻译作者</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="著作主编"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator("chiefEditor", {
            rules: [{ required: true, message: "请输入著作主编" }],
          })(<Input placeholder="著作主编" />)}
        </Form.Item>

        {/* 保存按钮 */}
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="button"
            size="large"
            onClick={handleSumbitSave}
            loading={saveDataLoading}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
