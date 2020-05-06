import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-driver.reducer';
import { IVehicleDriver } from 'app/shared/model/vehicle-driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleDriverDetail = (props: IVehicleDriverDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleDriverEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.vehicleDriver.detail.title">VehicleDriver</Translate> [<b>{vehicleDriverEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="modelCode">
              <Translate contentKey="catchControlPanelApp.vehicleDriver.modelCode">Model Code</Translate>
            </span>
          </dt>
          <dd>{vehicleDriverEntity.modelCode}</dd>
          <dt>
            <span id="makeCode">
              <Translate contentKey="catchControlPanelApp.vehicleDriver.makeCode">Make Code</Translate>
            </span>
          </dt>
          <dd>{vehicleDriverEntity.makeCode}</dd>
          <dt>
            <span id="vehicleTypeCode">
              <Translate contentKey="catchControlPanelApp.vehicleDriver.vehicleTypeCode">Vehicle Type Code</Translate>
            </span>
          </dt>
          <dd>{vehicleDriverEntity.vehicleTypeCode}</dd>
          <dt>
            <span id="year">
              <Translate contentKey="catchControlPanelApp.vehicleDriver.year">Year</Translate>
            </span>
          </dt>
          <dd>{vehicleDriverEntity.year}</dd>
          <dt>
            <span id="registrationNumber">
              <Translate contentKey="catchControlPanelApp.vehicleDriver.registrationNumber">Registration Number</Translate>
            </span>
          </dt>
          <dd>{vehicleDriverEntity.registrationNumber}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="catchControlPanelApp.vehicleDriver.color">Color</Translate>
            </span>
          </dt>
          <dd>{vehicleDriverEntity.color}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-driver" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-driver/${vehicleDriverEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleDriver }: IRootState) => ({
  vehicleDriverEntity: vehicleDriver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDriverDetail);
