import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './otp.reducer';
import { IOTP } from 'app/shared/model/otp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOTPDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OTPDetail = (props: IOTPDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { oTPEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.oTP.detail.title">OTP</Translate> [<b>{oTPEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="catchControlPanelApp.oTP.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{oTPEntity.phoneNumber}</dd>
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.oTP.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{oTPEntity.userCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.oTP.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{oTPEntity.areaCode}</dd>
          <dt>
            <span id="oTPCode">
              <Translate contentKey="catchControlPanelApp.oTP.oTPCode">O TP Code</Translate>
            </span>
          </dt>
          <dd>{oTPEntity.oTPCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.oTP.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={oTPEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.oTP.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={oTPEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/otp" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/otp/${oTPEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ oTP }: IRootState) => ({
  oTPEntity: oTP.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OTPDetail);
