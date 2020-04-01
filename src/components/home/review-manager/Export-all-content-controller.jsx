import React from 'react';

// 样式
import { Checkbox, Row, Col } from 'antd';

export default props => {
  return (
    <Checkbox.Group style={{ width: '100%' }}>
      <Row>
        <Col span={8}>
          <Checkbox value='全部'>全部</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='已评分'>已评分</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='未评分'>未评分</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
};
