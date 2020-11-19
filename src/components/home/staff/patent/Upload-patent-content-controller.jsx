import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch, { proxyFileFetch } from '@/util/request';
import {
  UPLOAD_FILE,
  GET_FILE_URL,
  SELECT_UPLOAD_PATENT,
  SAVE_UPLOAD_PATENT,
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import userAction from '@/redux/action/user';

// 样式
import { Form, Upload, Button, Icon, Alert, message } from 'antd';
import '@/style/home/staff/write-inner-modal.styl';

export default Form.create({ name: 'uploadPatent' })(({ form }) => {
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form,
    { staffPatentUuid } = useSelector((state) => state.userStore),
    [patentLoading, setPatentLoading] = useState(false),
    [isNeedUrlFresh, setIsNeedUrlFresh] = useState(false),
    [firstPreviewUrl, setFirstPreviewUrl] = useState(''),
    [secondPreviewUrl, setSecondPreviewUrl] = useState(''),
    [thirdPreviewUrl, setThirdPreviewUrl] = useState(''),
    [firstFileName, setFirstFileName] = useState(''),
    [secondFileName, setSecondFileName] = useState(''),
    [thirdFileName, setThirdFileName] = useState(''),
    [saveDataLoading, setSaveDataLoading] = useState(false),
    dispatch = useDispatch(),
    firstFormPatentUrl =
      getFieldValue('firstUrl') && getFieldValue('firstUrl')[0],
    secondFormPatentUrl =
      getFieldValue('secondUrl') && getFieldValue('secondUrl')[0],
    thirdFormPatentUrl =
      getFieldValue('thirdUrl') && getFieldValue('thirdUrl')[0];

  // 将已有的数据回显
  useEffect(() => {
    if (staffPatentUuid) {
      (async () => {
        let writePatent = await proxyFetch(
          SELECT_UPLOAD_PATENT,
          { uuid: staffPatentUuid },
          'GET'
        );

        // 数据回显
        if (writePatent && writePatent.firstUrl) {
          // 数据处理
          setFieldsValue({ firstUrl: [writePatent.firstUrl] });
          setFieldsValue({
            secondUrl: [writePatent.secondUrl],
          });
          setFieldsValue({
            thirdUrl: [writePatent.thirdUrl],
          });
          setIsNeedUrlFresh(true);
        } else {
          setFirstPreviewUrl('');
          setSecondPreviewUrl('');
          setThirdPreviewUrl('');
        }
      })();
    }
  }, [staffPatentUuid, setFieldsValue]);

  /**
   * 上传头像
   * @param {File} file 上传的文件
   */
  const handleUploadFirstFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setPatentLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_FILE, {
        file: file.file,
        folderName: 'write/patent',
      });

      // loading
      setPatentLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ firstUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  const handleUploadSecondFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setPatentLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_FILE, {
        file: file.file,
        folderName: 'write/patent',
      });

      // loading
      setPatentLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ secondUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  const handleUploadThirdFile = async (file) => {
    if (handleBeforeUpload(file)) {
      // loading
      setPatentLoading(true);

      // 参数需要加上oss的文件夹位置
      const fileUrl = await proxyFileFetch(UPLOAD_FILE, {
        file: file.file,
        folderName: 'write/patent',
      });

      // loading
      setPatentLoading(false);

      if (fileUrl) {
        // 设置form
        setFieldsValue({ thirdUrl: [fileUrl] });
        setIsNeedUrlFresh(true);
      }
    }
  };

  useEffect(() => {
    if (firstFormPatentUrl && isNeedUrlFresh) {
      (async () => {
        setPatentLoading(true);

        const firstPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: firstFormPatentUrl },
          'GET'
        );

        setPatentLoading(false);
        // 切换下载的url
        setFirstPreviewUrl(firstPreviewUrl);
        const firstUrlArr = firstPreviewUrl.split('?');
        const firstUrlArrList = firstUrlArr[0],
          firstAppU = firstUrlArrList.split('/');
        const firstFileName = firstAppU[firstAppU.length - 1];
        setFirstFileName(firstFileName.split('.')[1].toLowerCase());
        setIsNeedUrlFresh(false);
      })();
    }
  }, [firstFormPatentUrl, isNeedUrlFresh]);

  useEffect(() => {
    if (secondFormPatentUrl && isNeedUrlFresh) {
      (async () => {
        setPatentLoading(true);

        const secondPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: secondFormPatentUrl },
          'GET'
        );

        setPatentLoading(false);
        // 切换下载的url
        setSecondPreviewUrl(secondPreviewUrl);
        const secondUrlArr = secondPreviewUrl.split('?');
        const secondUrlArrList = secondUrlArr[0],
          secondAppU = secondUrlArrList.split('/');
        const secondFileName = secondAppU[secondAppU.length - 1];
        setSecondFileName(secondFileName.split('.')[1].toLowerCase());
        setIsNeedUrlFresh(false);
      })();
    }
  }, [secondFormPatentUrl, isNeedUrlFresh]);

  useEffect(() => {
    if (thirdFormPatentUrl && isNeedUrlFresh) {
      (async () => {
        setPatentLoading(true);

        const thirdPreviewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: thirdFormPatentUrl },
          'GET'
        );

        setPatentLoading(false);
        // 切换下载的url
        setThirdPreviewUrl(thirdPreviewUrl);
        const thirdUrlArr = thirdPreviewUrl.split('?');
        const thirdUrlArrList = thirdUrlArr[0],
          thirdAppU = thirdUrlArrList.split('/');
        const thirdFileName = thirdAppU[thirdAppU.length - 1];
        setThirdFileName(thirdFileName.split('.')[1].toLowerCase());
        setIsNeedUrlFresh(false);
      })();
    }
  }, [thirdFormPatentUrl, isNeedUrlFresh]);

  /**
   * 提交事件
   */
  const handleSumbitSave = (e) => {
    e.preventDefault();

    // 表单判断
    form.validateFields(async (err, value) => {
      if (staffPatentUuid) {
        if (!err) {
          value.uuid = staffPatentUuid;
          value.firstUrl = value.firstUrl[0];
          value.secondUrl = value.secondUrl ? value.secondUrl[0] : '';
          value.thirdUrl = value.thirdUrl ? value.thirdUrl[0] : '';

          setSaveDataLoading(true);
          const res = await proxyFetch(SAVE_UPLOAD_PATENT, value);
          setSaveDataLoading(false);

          if (res) {
            dispatch(userAction.setChangePatent(true));
          }
        }
      }
    });
  };

  return (
    <div className='inner-form-box'>
      <Alert
        className='inner-alert'
        message='上传专利附件注意事项'
        description={
          <div className='text-box'>
            <span>
              请各位技术人员确保上传的文件内容真实完整，其中可上传的文件格式有:
            </span>
            <span className='important-text'>jpg\jpeg\png</span>
            <span>(图片)，</span>
            <span className='important-text'>doc\docx\pdf\xls\xlsx</span>
            <span>(文档)，</span>
            <span className='important-text'>zip\rar</span>
            <span>
              (压缩文件)，请尽量上传图片或文档，并按照从上至下的顺序上传(
            </span>
            <span className='important-text'>专利附件1必须上传</span>
            <span>)，当需要上传的文件超过三个时，请</span>
            <span className='important-text'>压缩打包</span>
            <span>后上传。确保全部上传完毕后点击下方</span>
            <span className='important-text'>保存</span>
            <span>按钮，否则新上传的文件不会保存。</span>
          </div>
        }
        type='info'
      />
      <Form>
        <Form.Item
          label='专利附件1'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('firstUrl', {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => {
              return e && e.fileList;
            },
            rules: [{ required: true, message: '请上传专利附件1!' }],
          })(
            <div>
              {firstFileName === 'jpg' ||
                firstFileName === 'jpeg' ||
                firstFileName === 'png' ? (
                  <img
                    src={firstPreviewUrl}
                    alt='avatar'
                    style={{ width: '100%' }}
                    className='img'
                  />
                ) : null}
              <Upload
                showUploadList={false}
                // 进行将图片格式和大小判断
                customRequest={handleUploadFirstFile}
              >
                {firstPreviewUrl && !patentLoading ? (
                  <div>
                    <Button
                      className='half-button'
                      size='large'
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          firstFileName === 'doc' ||
                          firstFileName === 'docx' ||
                          firstFileName === 'xls' ||
                          firstFileName === 'xlsx'
                        ) {
                          window.open(
                            `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                              firstPreviewUrl
                            )}`
                          );
                        } else {
                          window.open(firstPreviewUrl, '_blank');
                        }
                      }}
                    >
                      查看上传
                    </Button>
                    <Button size='large' className='half-button'>
                      重新上传
                    </Button>
                  </div>
                ) : (
                    <Button
                      className='button'
                      size='large'
                      loading={patentLoading}
                    >
                      点击上传压缩/图片文件
                      <Icon type='inbox' />
                    </Button>
                  )}
              </Upload>
            </div>
          )}
        </Form.Item>

        <Form.Item
          label='专利附件2'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('secondUrl', {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => {
              return e && e.fileList;
            },
          })(
            <div>
              {secondFileName === 'jpg' ||
                secondFileName === 'jpeg' ||
                secondFileName === 'png' ? (
                  <img
                    src={secondPreviewUrl}
                    alt='avatar'
                    style={{ width: '100%' }}
                    className='img'
                  />
                ) : null}
              <Upload
                showUploadList={false}
                // 进行将图片格式和大小判断
                customRequest={handleUploadSecondFile}
              >
                {secondPreviewUrl && !patentLoading ? (
                  <div>
                    <Button
                      className='half-button'
                      size='large'
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          secondFileName === 'doc' ||
                          secondFileName === 'docx' ||
                          secondFileName === 'xls' ||
                          secondFileName === 'xlsx'
                        ) {
                          window.open(
                            `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                              secondPreviewUrl
                            )}`
                          );
                        } else {
                          window.open(secondPreviewUrl, '_blank');
                        }
                      }}
                    >
                      查看上传
                    </Button>
                    <Button size='large' className='half-button'>
                      重新上传
                    </Button>
                  </div>
                ) : (
                    <Button
                      className='button'
                      size='large'
                      loading={patentLoading}
                    >
                      点击上传图片文件
                      <Icon type='inbox' />
                    </Button>
                  )}
              </Upload>
            </div>
          )}
        </Form.Item>

        <Form.Item
          label='专利附件3'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thirdUrl', {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => {
              return e && e.fileList;
            },
          })(
            <div>
              {thirdFileName === 'jpg' ||
                thirdFileName === 'jpeg' ||
                thirdFileName === 'png' ? (
                  <img
                    src={thirdPreviewUrl}
                    alt='avatar'
                    style={{ width: '100%' }}
                    className='img'
                  />
                ) : null}
              <Upload
                showUploadList={false}
                // 进行将图片格式和大小判断
                customRequest={handleUploadThirdFile}
              >
                {thirdPreviewUrl && !patentLoading ? (
                  <div>
                    <Button
                      className='half-button'
                      size='large'
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          thirdFileName === 'doc' ||
                          thirdFileName === 'docx' ||
                          thirdFileName === 'xls' ||
                          thirdFileName === 'xlsx'
                        ) {
                          window.open(
                            `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                              thirdPreviewUrl
                            )}`
                          );
                        } else {
                          window.open(thirdPreviewUrl, '_blank');
                        }
                      }}
                    >
                      查看上传
                    </Button>
                    <Button size='large' className='half-button'>
                      重新上传
                    </Button>
                  </div>
                ) : (
                    <Button
                      className='button'
                      size='large'
                      loading={patentLoading}
                    >
                      点击上传图片文件
                      <Icon type='inbox' />
                    </Button>
                  )}
              </Upload>
            </div>
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
    extensionName !== 'png' &&
    extensionName !== 'doc' &&
    extensionName !== 'docx' &&
    extensionName !== 'pdf' &&
    extensionName !== 'xls' &&
    extensionName !== 'xlsx' &&
    extensionName !== 'zip' &&
    extensionName !== 'rar'
  ) {
    message.error('文件类型错误');
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
