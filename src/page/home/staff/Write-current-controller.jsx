import React from 'react';

// 样式
import '@/style/home/staff/write-current.styl';
import { Tabs, Descriptions } from 'antd';
const { TabPane } = Tabs;

export default props => {
  return (
    <div className='write-current-box'>
      <p className='title-box'>
        <span>最新信息</span>
      </p>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='基本信息' key='1'>
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
            <Descriptions.Item label='办公电话'>
              0451-58685774
            </Descriptions.Item>
            <Descriptions.Item label='手机'>18351923820</Descriptions.Item>
            <Descriptions.Item label='学历/学位'>硕士</Descriptions.Item>
            <Descriptions.Item label='毕业学校'>
              哈尔滨理工大学
            </Descriptions.Item>
            <Descriptions.Item label='所学专业'>软件工程</Descriptions.Item>
            <Descriptions.Item label='职务'>研究员</Descriptions.Item>
            <Descriptions.Item label='参加工作时间'>
              2020-03-10
            </Descriptions.Item>
            <Descriptions.Item label='职称'>副高级</Descriptions.Item>
            <Descriptions.Item label='获得时间'>2020-03-11</Descriptions.Item>
            <Descriptions.Item label='研究方向'>人工智能</Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab='主持项目' key='2'>
          <Descriptions className='description-box'>
            <Descriptions.Item label='项目名称'>软件测试</Descriptions.Item>
            <Descriptions.Item label='项目编号'>100010001000</Descriptions.Item>
            <Descriptions.Item label='项目来源'>
              哈尔滨理工大学1819
            </Descriptions.Item>
            <Descriptions.Item label='主要研究内容' span={3}>
              JS开发
            </Descriptions.Item>
            <Descriptions.Item label='项目经费(万元)'>100</Descriptions.Item>
            <Descriptions.Item label='起止时间'>
              2020-03-01~2020-04-30
            </Descriptions.Item>
            <Descriptions.Item label='在研/结题'>在研</Descriptions.Item>
            <Descriptions.Item label='负责人'>马超</Descriptions.Item>
            <Descriptions.Item label='参与人名单'>
              钱程、张博荣
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab='参与项目' key='3'>
          <Descriptions className='description-box'>
            <Descriptions.Item label='项目名称'>软件测试</Descriptions.Item>
            <Descriptions.Item label='项目编号'>100010001000</Descriptions.Item>
            <Descriptions.Item label='项目来源'>
              哈尔滨理工大学1819
            </Descriptions.Item>
            <Descriptions.Item label='主要研究内容' span={3}>
              JS开发
            </Descriptions.Item>
            <Descriptions.Item label='项目经费(万元)'>100</Descriptions.Item>
            <Descriptions.Item label='起止时间'>
              2020-03-01~2020-04-30
            </Descriptions.Item>
            <Descriptions.Item label='在研/结题'>在研</Descriptions.Item>
            <Descriptions.Item label='负责人'>马超</Descriptions.Item>
            <Descriptions.Item label='参与人名单'>
              钱程、张博荣
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
      </Tabs>
    </div>
  );
};
