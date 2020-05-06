import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip-management.reducer';
import { ITripManagement } from 'app/shared/model/trip-management.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripManagementDetail = (props: ITripManagementDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tripManagementEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.tripManagement.detail.title">TripManagement</Translate> [
          <b>{tripManagementEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.tripManagement.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.areaCode}</dd>
          <dt>
            <span id="startime">
              <Translate contentKey="catchControlPanelApp.tripManagement.startime">Startime</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripManagementEntity.startime} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="endtime">
              <Translate contentKey="catchControlPanelApp.tripManagement.endtime">Endtime</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripManagementEntity.endtime} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="startLongitude">
              <Translate contentKey="catchControlPanelApp.tripManagement.startLongitude">Start Longitude</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.startLongitude}</dd>
          <dt>
            <span id="startLatitude">
              <Translate contentKey="catchControlPanelApp.tripManagement.startLatitude">Start Latitude</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.startLatitude}</dd>
          <dt>
            <span id="distance">
              <Translate contentKey="catchControlPanelApp.tripManagement.distance">Distance</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.distance}</dd>
          <dt>
            <span id="tripCost">
              <Translate contentKey="catchControlPanelApp.tripManagement.tripCost">Trip Cost</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.tripCost}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.tripManagement.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.driverCode}</dd>
          <dt>
            <span id="passengerCode">
              <Translate contentKey="catchControlPanelApp.tripManagement.passengerCode">Passenger Code</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.passengerCode}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.tripManagement.status">Status</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.status}</dd>
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.tripManagement.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.tripCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.tripManagement.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripManagementEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.tripManagement.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.tripManagement.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.tripManagement.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripManagementEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.tripManagement.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.tripManagement.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{tripManagementEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/trip-management" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/trip-management/${tripManagementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tripManagement }: IRootState) => ({
  tripManagementEntity: tripManagement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripManagementDetail);
