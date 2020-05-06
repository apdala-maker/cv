import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverDetail = (props: IDriverDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.driver.detail.title">Driver</Translate> [<b>{driverEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.driver.status">Status</Translate>
            </span>
          </dt>
          <dd>{driverEntity.status}</dd>
          <dt>
            <span id="iSDriving">
              <Translate contentKey="catchControlPanelApp.driver.iSDriving">I S Driving</Translate>
            </span>
          </dt>
          <dd>{driverEntity.iSDriving ? 'true' : 'false'}</dd>
          <dt>
            <span id="ontrip">
              <Translate contentKey="catchControlPanelApp.driver.ontrip">Ontrip</Translate>
            </span>
          </dt>
          <dd>{driverEntity.ontrip}</dd>
          <dt>
            <span id="iSApproved">
              <Translate contentKey="catchControlPanelApp.driver.iSApproved">I S Approved</Translate>
            </span>
          </dt>
          <dd>{driverEntity.iSApproved ? 'true' : 'false'}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.driver.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{driverEntity.driverCode}</dd>
          <dt>
            <span id="tripCount">
              <Translate contentKey="catchControlPanelApp.driver.tripCount">Trip Count</Translate>
            </span>
          </dt>
          <dd>{driverEntity.tripCount}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.driver.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{driverEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.driver.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.driver.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.driver.latestLocation">Latest Location</Translate>
          </dt>
          <dd>{driverEntity.latestLocation ? driverEntity.latestLocation.latitude : ''}</dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.driver.myVehicle">My Vehicle</Translate>
          </dt>
          <dd>{driverEntity.myVehicle ? driverEntity.myVehicle.registrationNumber : ''}</dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.driver.mongoFileTypes">Mongo File Types</Translate>
          </dt>
          <dd>{driverEntity.mongoFileTypes ? driverEntity.mongoFileTypes.fileName : ''}</dd>
        </dl>
        <Button tag={Link} to="/driver" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver/${driverEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverDetail);
