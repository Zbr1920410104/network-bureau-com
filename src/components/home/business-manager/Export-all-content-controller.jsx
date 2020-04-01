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
          <Checkbox value='已核实'>已核实</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value='未核实'>未核实</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
};
