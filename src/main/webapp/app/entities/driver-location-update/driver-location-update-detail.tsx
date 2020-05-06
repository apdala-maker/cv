import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver-location-update.reducer';
import { IDriverLocationUpdate } from 'app/shared/model/driver-location-update.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverLocationUpdateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLocationUpdateDetail = (props: IDriverLocationUpdateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverLocationUpdateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.driverLocationUpdate.detail.title">DriverLocationUpdate</Translate> [
          <b>{driverLocationUpdateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.driverLocationUpdate.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{driverLocationUpdateEntity.driverCode}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="catchControlPanelApp.driverLocationUpdate.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverLocationUpdateEntity.startTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.driverLocationUpdate.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{driverLocationUpdateEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.driverLocationUpdate.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverLocationUpdateEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.driverLocationUpdate.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverLocationUpdateEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.driverLocationUpdate.locationData">Location Data</Translate>
          </dt>
          <dd>{driverLocationUpdateEntity.locationData ? driverLocationUpdateEntity.locationData.latitude : ''}</dd>
        </dl>
        <Button tag={Link} to="/driver-location-update" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver-location-update/${driverLocationUpdateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driverLocationUpdate }: IRootState) => ({
  driverLocationUpdateEntity: driverLocationUpdate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLocationUpdateDetail);
