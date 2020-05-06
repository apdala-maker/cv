import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './passenger-location-update.reducer';
import { IPassengerLocationUpdate } from 'app/shared/model/passenger-location-update.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerLocationUpdateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerLocationUpdateDetail = (props: IPassengerLocationUpdateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { passengerLocationUpdateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.detail.title">PassengerLocationUpdate</Translate> [
          <b>{passengerLocationUpdateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="passengerCode">
              <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.passengerCode">Passenger Code</Translate>
            </span>
          </dt>
          <dd>{passengerLocationUpdateEntity.passengerCode}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerLocationUpdateEntity.startTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{passengerLocationUpdateEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerLocationUpdateEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerLocationUpdateEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.locationData">Location Data</Translate>
          </dt>
          <dd>{passengerLocationUpdateEntity.locationData ? passengerLocationUpdateEntity.locationData.latitude : ''}</dd>
        </dl>
        <Button tag={Link} to="/passenger-location-update" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/passenger-location-update/${passengerLocationUpdateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ passengerLocationUpdate }: IRootState) => ({
  passengerLocationUpdateEntity: passengerLocationUpdate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassengerLocationUpdateDetail);
