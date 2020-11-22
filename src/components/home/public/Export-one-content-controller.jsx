import React from "react";

// 样式
import { Checkbox, Row, Col } from "antd";

export default (props) => {
  return (
    <Checkbox.Group style={{ width: "100%" }}>
      <Row>
        <Col span={8}>
          <Checkbox value="基本信息">基本信息</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="项目经验">项目经验</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="专利">专利</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="软件著作权">软件著作权</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="获奖情况">获奖情况</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="论文">论文</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="专著">专著</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
};
