import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-type.reducer';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleTypeDetail = (props: IVehicleTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.vehicleType.detail.title">VehicleType</Translate> [<b>{vehicleTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.vehicleType.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.areaCode}</dd>
          <dt>
            <span id="isMotorBike">
              <Translate contentKey="catchControlPanelApp.vehicleType.isMotorBike">Is Motor Bike</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.isMotorBike ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.vehicleType.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.description}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.vehicleType.code">Code</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.code}</dd>
          <dt>
            <span id="numberOfSeats">
              <Translate contentKey="catchControlPanelApp.vehicleType.numberOfSeats">Number Of Seats</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.numberOfSeats}</dd>
          <dt>
            <span id="minimumCC">
              <Translate contentKey="catchControlPanelApp.vehicleType.minimumCC">Minimum CC</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.minimumCC}</dd>
          <dt>
            <span id="maximumCC">
              <Translate contentKey="catchControlPanelApp.vehicleType.maximumCC">Maximum CC</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.maximumCC}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.vehicleType.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleTypeEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.vehicleType.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicleType.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.vehicleType.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleTypeEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.vehicleType.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicleType.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleTypeEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-type/${vehicleTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleType }: IRootState) => ({
  vehicleTypeEntity: vehicleType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTypeDetail);
