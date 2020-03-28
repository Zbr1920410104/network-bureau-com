import React from 'react';

// 样式
import { Form, Upload, Button, Icon, Alert } from 'antd';

export default Form.create({ name: 'thesisFile' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='相关证明附件'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('thesisFile', {
            rules: [{ required: true, message: '请上传相关证明附件' }]
          })(
            <Upload htmlType='button'>
              <Button htmlType='button' size='large' className='button'>
                点击附件上传zip/rar
                <Icon type='inbox' />
              </Button>
            </Upload>
          )}
        </Form.Item>
      </Form>
      <div className='inner-alert-box'>
        <Alert
          message='上传相关证明附件注意事项'
          description='请用户将论文专著、SCI/EI检索证明等扫描件及其他相关证明材料压缩为zip/rar文件后上传'
          type='info'
          showIcon
        />
      </div>
    </div>
  );
});
