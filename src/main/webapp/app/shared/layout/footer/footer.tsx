import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => <div className="footer  container-fluid bg-success">
  <Row>
    <Col md="12">
      <p className="pt-lg-3 text-white text-center">
        Copyright © {(new Date()).getFullYear()}. All rights reserved.
      </p>
    </Col>
  </Row>
</div>;

export default Footer;
