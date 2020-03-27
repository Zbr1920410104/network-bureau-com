import React, { useState } from 'react';

// 路由
import { HOME_VERIFY_LIST } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// 样式
import { Icon, Descriptions, Button, Input } from 'antd';
import '@/style/home/business-manager/modify-detail.styl';

export default props => {
  const [modify, setModify] = useState(false);
  const history = useHistory();

  return (
    <div className='modify-detail-box'>
      <p className='title-box'>
        <span>查看详情</span>
      </p>
      <div className='subtitle-box'>
        <Link to={HOME_VERIFY_LIST.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          <span>信息核实</span>
        </p>
      </div>
      <div className='detail-content-box'>
        <Descriptions bordered>
          <Descriptions.Item span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>上次填写</span>
              </div>
              <div className='item-right-box'>
                <span>本次填写</span>
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='姓名' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>李锐</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='姓名'
                    defaultValue='李锐'
                  />
                ) : (
                  <span>李锐</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='身份证号' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>230108198005120614</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='身份证号'
                    defaultValue='230108198005120614'
                  />
                ) : (
                  <span>230108198005120614</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='性别' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>男</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='性别'
                    defaultValue='男'
                  />
                ) : (
                  <span>男</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='民族' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>汉</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='民族'
                    defaultValue='汉'
                  />
                ) : (
                  <span>汉</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='籍贯' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>辽宁省盖州</span>
              </div>
              <div className='item-right-modify-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='籍贯'
                    defaultValue='黑龙江省哈尔滨'
                  />
                ) : (
                  <span>黑龙江省哈尔滨</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='政治面貌' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>共产党员</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='政治面貌'
                    defaultValue='共产党员'
                  />
                ) : (
                  <span>共产党员</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='科室' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>战略研究科</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='科室'
                    defaultValue='战略研究科'
                  />
                ) : (
                  <span>战略研究科</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='办公电话' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>0451-58685774</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='办公电话'
                    defaultValue='0451-58685774'
                  />
                ) : (
                  <span>0451-58685774</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='手机' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>18351923820</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='手机'
                    defaultValue='18351923820'
                  />
                ) : (
                  <span>18351923820</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='学历/学位' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>硕士</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='学历/学位'
                    defaultValue='硕士'
                  />
                ) : (
                  <span>硕士</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='毕业学校' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>哈尔滨理工大学</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='毕业学校'
                    defaultValue='哈尔滨理工大学'
                  />
                ) : (
                  <span>哈尔滨理工大学</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='所学专业' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>软件工程</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='所学专业'
                    defaultValue='软件工程'
                  />
                ) : (
                  <span>软件工程</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='职务' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>研究员</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='职务'
                    defaultValue='研究员'
                  />
                ) : (
                  <span>研究员</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='参加工作时间' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>2020-03-10</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='参加工作时间'
                    defaultValue='2020-03-10'
                  />
                ) : (
                  <span>2020-03-10</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='职称' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>副高级</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='职称'
                    defaultValue='副高级'
                  />
                ) : (
                  <span>副高级</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='获得时间' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>2020-03-11</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='获得时间'
                    defaultValue='2020-03-11'
                  />
                ) : (
                  <span>2020-03-11</span>
                )}
              </div>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='研究方向' span={3}>
            <div className='item-box'>
              <div className='item-left-box'>
                <span>人工智能</span>
              </div>
              <div className='item-right-box'>
                {modify ? (
                  <Input
                    className='input-box'
                    placeholder='研究方向'
                    defaultValue='人工智能'
                  />
                ) : (
                  <span>人工智能</span>
                )}
              </div>
            </div>
          </Descriptions.Item>

          {/* 主持项目 */}
          <Descriptions.Item label='主持项目' span={3}>
            <div className='item-box'>
              <div className='inner-description-left-box'>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目1</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    <span>软件测试</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    <span>100010001000</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    <span>哈尔滨理工大学1819</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    <span>JS开发</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    <span>100</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    <span>2020-03-01~2020-04-30</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    <span>在研</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    <span>马超</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    <span>钱程、张博荣</span>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目2</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    <span>软件测试</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    <span>100010001000</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    <span>哈尔滨理工大学1819</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    <span>JS开发</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    <span>100</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    <span>2020-03-01~2020-04-30</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    <span>在研</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    <span>马超</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    <span>钱程、张博荣</span>
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className='inner-description-right-box'>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目1</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目名称'
                        defaultValue='软件测试'
                      />
                    ) : (
                      <span>软件测试</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目编号'
                        defaultValue='100010001000'
                      />
                    ) : (
                      <span>100010001000</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目来源'
                        defaultValue='哈尔滨理工大学1819'
                      />
                    ) : (
                      <span>哈尔滨理工大学1819</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='主要研究内容'
                        defaultValue='JS开发'
                      />
                    ) : (
                      <span>JS开发</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目经费(万元)'
                        defaultValue='100'
                      />
                    ) : (
                      <span>100</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='起止时间'
                        defaultValue='2020-03-01~2020-04-30'
                      />
                    ) : (
                      <span>2020-03-01~2020-04-30</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='在研/结题'
                        defaultValue='在研'
                      />
                    ) : (
                      <span>在研</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='负责人'
                        defaultValue='马超'
                      />
                    ) : (
                      <span>马超</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='参与人名单'
                        defaultValue='钱程、张博荣'
                      />
                    ) : (
                      <span>钱程、张博荣</span>
                    )}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目2</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目名称'
                        defaultValue='软件测试'
                      />
                    ) : (
                      <span>软件测试</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目编号'
                        defaultValue='100010001000'
                      />
                    ) : (
                      <span>100010001000</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目来源'
                        defaultValue='哈尔滨理工大学1819'
                      />
                    ) : (
                      <span>哈尔滨理工大学1819</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='主要研究内容'
                        defaultValue='JS开发'
                      />
                    ) : (
                      <span>JS开发</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目经费(万元)'
                        defaultValue='100'
                      />
                    ) : (
                      <span>100</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='起止时间'
                        defaultValue='2020-03-01~2020-04-30'
                      />
                    ) : (
                      <span>2020-03-01~2020-04-30</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='在研/结题'
                        defaultValue='在研'
                      />
                    ) : (
                      <span>在研</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='负责人'
                        defaultValue='马超'
                      />
                    ) : (
                      <span>马超</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='参与人名单'
                        defaultValue='钱程、张博荣'
                      />
                    ) : (
                      <span>钱程、张博荣</span>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Descriptions.Item>

          {/* 参与项目 */}
          <Descriptions.Item label='参与项目' span={3}>
            <div className='item-box'>
              <div className='inner-description-left-box'>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目1</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    <span>软件测试</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    <span>100010001000</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    <span>哈尔滨理工大学1819</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    <span>js开发</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    <span>100</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    <span>2020-03-01~2020-04-30</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    <span>在研</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    <span>马超</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    <span>钱程、张博荣</span>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目2</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    <span>软件测试</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    <span>100010001000</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    <span>哈尔滨理工大学1819</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    <span>JS开发</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    <span>100</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    <span>2020-03-01~2020-04-30</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    <span>在研</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    <span>马超</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    <span>钱程、张博荣</span>
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div className='inner-description-right-box'>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目1</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    style={{fontsize:'12px'}}
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目名称'
                        defaultValue='软件测试'
                      />
                    ) : (
                      <span>软件测试</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目编号'
                        defaultValue='100010001000'
                      />
                    ) : (
                      <span>100010001000</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目来源'
                        defaultValue='哈尔滨理工大学1819'
                      />
                    ) : (
                      <span>哈尔滨理工大学1819</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-modify-box'
                    label='主要研究内容'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-modify-box'
                        placeholder='主要研究内容'
                        defaultValue='系统开发'
                      />
                    ) : (
                      <span>系统开发</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目经费(万元)'
                        defaultValue='100'
                      />
                    ) : (
                      <span>100</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='起止时间'
                        defaultValue='2020-03-01~2020-04-30'
                      />
                    ) : (
                      <span>2020-03-01~2020-04-30</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='在研/结题'
                        defaultValue='在研'
                      />
                    ) : (
                      <span>在研</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='负责人'
                        defaultValue='马超'
                      />
                    ) : (
                      <span>马超</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='参与人名单'
                        defaultValue='钱程、张博荣'
                      />
                    ) : (
                      <span>钱程、张博荣</span>
                    )}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions
                  className='inner-descriptions-box'
                  bordered='false'
                  title={
                    <div className='inner-descriptions-title-box'>项目2</div>
                  }
                >
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目名称'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目名称'
                        defaultValue='软件测试'
                      />
                    ) : (
                      <span>软件测试</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目编号'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目编号'
                        defaultValue='100010001000'
                      />
                    ) : (
                      <span>100010001000</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目来源'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目来源'
                        defaultValue='哈尔滨理工大学1819'
                      />
                    ) : (
                      <span>哈尔滨理工大学1819</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='主要研究内容'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='主要研究内容'
                        defaultValue='JS开发'
                      />
                    ) : (
                      <span>JS开发</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='项目经费(万元)'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='项目经费(万元)'
                        defaultValue='100'
                      />
                    ) : (
                      <span>100</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='起止时间'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='起止时间'
                        defaultValue='2020-03-01~2020-04-30'
                      />
                    ) : (
                      <span>2020-03-01~2020-04-30</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='在研/结题'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='在研/结题'
                        defaultValue='在研'
                      />
                    ) : (
                      <span>在研</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='负责人'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='负责人'
                        defaultValue='马超'
                      />
                    ) : (
                      <span>马超</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className='inner-descriptions-item-box'
                    label='参与人名单'
                    span={3}
                  >
                    {modify ? (
                      <Input
                        className='inner-input-box'
                        placeholder='参与人名单'
                        defaultValue='钱程、张博荣'
                      />
                    ) : (
                      <span>钱程、张博荣</span>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className='detail-bottom-box'>
        <Button
          type='primary'
          className='modify-button'
          htmlType='submit'
          onClick={() => {
            setModify(true);
          }}
        >
          修改
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          className='grade-button'
          onClick={() => {
            history.push(HOME_VERIFY_LIST.path);
          }}
        >
          打分
        </Button>
      </div>
    </div>
  );
};
