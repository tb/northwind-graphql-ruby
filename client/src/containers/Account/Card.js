import React from 'react';
import {Container, Row, Col, Card, CardHeader, CardBlock} from 'reactstrap';

export default ({children, header}) => (
  <Container style={{paddingTop: '30px'}}>
    <Row>
      <Col lg={4} md={6} sm={2} />
      <Col lg={4} md={6} sm={8} xs={12}>
        <Card>
          <CardHeader>{header}</CardHeader>
          <CardBlock>{children}</CardBlock>
        </Card>
      </Col>
    </Row>
  </Container>
);
