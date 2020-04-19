import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_JPG_FILE,
  GET_FILE_URL,
  SELECT_UPLOAD_AWARD,
  SAVE_UPLOAD_AWARD,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 样式
import { Form, Upload, Button, Icon, Alert, message } from 'antd';

export default Form.create({ name: 'uploadAward' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { staffAwardUuid } = useSelector((state) => state.userStore),
    [awardLoading, setAwardLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch(),
    formAwardUrl = getFieldValue('awardUrl') && getFieldValue('awardUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (staffAwardUuid) {
      (async () => {
        let writeAward = await proxyFetch(
          SELECT_UPLOAD_AWARD,
          { uuid: staffAwardUuid },
          'GET'
        );

        // 数据回显
        if (writeAward && writeAward.url) {
          // 数据处理
          setFieldsValue({ awardUrl: [writeAward.url] });
          setIsNeedUrlFresh(true);
        } else {
          setPreviewUrl('');
        }
      })();
    }
  }, [staffAwardUuid, setFieldsValue]);

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setAwardLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_JPG_FILE, {
        file: file.file,
        folderName: 'write/award',
      });

      // loading
      setAwardLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ awardUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formAwardUrl && isNeedUrlFresh) {
      (async () => {
        setAwardLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formAwardUrl },
          'GET'
        );

        setAwardLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formAwardUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (staffAwardUuid) {
        if (!err) {
          value.uuid = staffAwardUuid;
          value.awardUrl = value.awardUrl[0];

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_UPLOAD_AWARD, value);
          setSaveDataLoading(false);

          if (res) {
            dispatch(userAction.setChangeAward(true));
          }
        }
      }
    });
  };

  return (
    <div className='inner-form-box'>
      <Alert
        className='inner-alert'
        message='上传附件注意事项'
        description='请各位技术人员确保上传的jpg\jpeg\png文件内容真实完整,确保上传完毕后点击下方保存按钮。'
        type='info'
      />
      <Form>
        <Form.Item
          label='获奖证明附件'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardUrl', {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => {
              return e && e.fileList;
            },
            rules: [{ required: true, message: '请上传获奖证明附件' }],
          })(
            <Upload
              showUploadList={false}
              // 进行将图片格式和大小判断
              customRequest={handleUploadFile}
            >
              {previewUrl && !awardLoading ? (
                <div>
                  <Button
                    className='half-button'
                    size='large'
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(previewUrl);
                    }}
                  >
                    查看上传
                  </Button>
                  <Button size='large' className='half-button'>
                    重新上传
                  </Button>
                </div>
              ) : (
                <Button className='button' size='large' loading={awardLoading}>
                  点击文件上传图片文件
                  <Icon type='inbox' />
                </Button>
              )}
            </Upload>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type='primary'
            htmlType='submit'
            loading={saveDataLoading}
            onClick={handleSumbitSave}
            className='button'
            size='large'
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

const handleBeforeUpload = ({ file }) => {
  // 后缀名
  const extensionName = file.name.split('.')[1].toLowerCase();

  // 判断后缀名是否非法
  if (
    extensionName !== 'jpg' &&
    extensionName !== 'jpeg' &&
    extensionName !== 'png'
  ) {
    message.error('文件类型必须为jpg,jpeg,png');
    return false;
  }

  // 判断大小是否符合
  if (file.size > 1024 * 1024 * 10) {
    // 10MB
    message.error('文件大小必须小于10MB');
    return false;
  }

  return true;
};
