import React from 'react';

// 样式
import { Form, Upload, Button, Icon } from 'antd';

export default Form.create({ name: 'awardFile' })(({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div className='inner-form-box'>
      <Form>
        <Form.Item
          label='获奖证明文件'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('awardFile', {
            rules: [{ required: true, message: '请上传获奖证明文件' }]
          })(
            <Upload htmlType='button'>
              <Button htmlType='button' size='large' className='button'>
                点击文件上传JPG
                <Icon type='inbox' />
              </Button>
            </Upload>
          )}
        </Form.Item>
      </Form>
    </div>
  );
});
