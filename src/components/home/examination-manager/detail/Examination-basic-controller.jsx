import React from 'react';

// 样式
import '@/style/home/examination-manager/examination-detail.styl';
import { Descriptions } from 'antd';

export default props => {
  return (
    <div>
      <Descriptions className='description-box'>
        <Descriptions.Item label='姓名'>李锐</Descriptions.Item>
        <Descriptions.Item label='身份证号'>
          230108198005120614
        </Descriptions.Item>
        <Descriptions.Item label='性别'>男</Descriptions.Item>
        <Descriptions.Item label='民族'>汉</Descriptions.Item>
        <Descriptions.Item label='籍贯'>辽宁省盖州</Descriptions.Item>
        <Descriptions.Item label='政治面貌'>共产党员</Descriptions.Item>
        <Descriptions.Item label='科室'>战略研究科</Descriptions.Item>
        <Descriptions.Item label='办公电话'>0451-58685774</Descriptions.Item>
        <Descriptions.Item label='手机'>18351923820</Descriptions.Item>
        <Descriptions.Item label='学历/学位'>硕士</Descriptions.Item>
        <Descriptions.Item label='毕业学校'>哈尔滨理工大学</Descriptions.Item>
        <Descriptions.Item label='所学专业'>软件工程</Descriptions.Item>
        <Descriptions.Item label='职务'>研究员</Descriptions.Item>
        <Descriptions.Item label='参加工作时间'>2020-03-10</Descriptions.Item>
        <Descriptions.Item label='职称'>副高级</Descriptions.Item>
        <Descriptions.Item label='获得时间'>2020-03-11</Descriptions.Item>
        <Descriptions.Item label='研究方向'>人工智能</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
