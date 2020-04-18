import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_ZIP_FILE,
  GET_FILE_URL,
  SELECT_UPLOAD_THESIS,
  SAVE_UPLOAD_THESIS,
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Form, Upload, Button, Icon, Alert, message } from 'antd';
import '@/style/home/staff/write-inner-modal.styl';

export default Form.create({ name: 'uploadThesis' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { staffThesisUuid } = useSelector((state) => state.userStore),
    [thesisLoading, setThesisLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [previewUrl, setPreviewUrl] = useState(''),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    formThesisUrl = getFieldValue('thesisUrl') && getFieldValue('thesisUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (staffThesisUuid) {
      (async () => {
        let writeThesis = await proxyFetch(
          SELECT_UPLOAD_THESIS,
          { uuid: staffThesisUuid },
          'GET'
        );

        // 数据回显
        if (writeThesis && writeThesis.url) {
          // 数据处理
          setFieldsValue({ thesisUrl: [writeThesis.url] });
          setIsNeedUrlFresh(true);
        } else {
          setPreviewUrl('');
        }
      })();
    }
  }, [staffThesisUuid, setFieldsValue]);

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setThesisLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_ZIP_FILE, {
        file: file.file,
        folderName: 'write/thesis',
      });

      // loading
      setThesisLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ thesisUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (formThesisUrl && isNeedUrlFresh) {
      (async () => {
        setThesisLoading(true);

        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formThesisUrl },
          'GET'
        );

        setThesisLoading(false);
        // 切换下载的url
        setPreviewUrl(previewUrl);
        setIsNeedUrlFresh(false);
      })();
    }
  }, [formThesisUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (staffThesisUuid) {
        if (!err) {
          value.uuid = staffThesisUuid;
          value.thesisUrl = value.thesisUrl[0];

          setSaveDataLoading(true);
          await proxyFetch(SAVE_UPLOAD_THESIS, value);
          setSaveDataLoading(false);
        }
      }
    });
  };

  return (
    <div className='inner-form-box'>
      <Alert
        className='inner-alert'
        message='上传论文/专著注意事项'
        description='请各位技术人员将所有文件打包成以论文/专著名为文件名的zip或rar文件,并确保上传的zip/rar文件内容真实完整,确保上传完毕后点击下方保存按钮。'
        type='info'
      />
      <Form>
        <Form.Item
          label='论文/专著附件'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisUrl', {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => {
              return e && e.fileList;
            },
            rules: [{ required: true, message: '请上传论文/专著附件' }],
          })(
            <Upload
              showUploadList={false}
              // 进行将图片格式和大小判断
              customRequest={handleUploadFile}
            >
              {previewUrl && !thesisLoading ? (
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
                <Button className='button' size='large' loading={thesisLoading}>
                  点击文件上传压缩文件
                  <Icon type='inbox' />
                </Button>
              )}
            </Upload>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
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
  if (extensionName !== 'zip' && extensionName !== 'rar') {
    message.error('文件类型必须为zip,rar');
    return false;
  }

  // 判断大小是否符合
  if (file.size > 1024 * 1024 * 100) {
    // 10MB
    message.error('文件大小必须小于100MB');
    return false;
  }

  return true;
};
