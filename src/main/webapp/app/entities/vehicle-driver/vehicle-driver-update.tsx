import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-driver.reducer';
import { IVehicleDriver } from 'app/shared/model/vehicle-driver.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleDriverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleDriverUpdate = (props: IVehicleDriverUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleDriverEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-driver');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleDriverEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="catchControlPanelApp.vehicleDriver.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.vehicleDriver.home.createOrEditLabel">Create or edit a VehicleDriver</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleDriverEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-driver-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-driver-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="modelCodeLabel" for="vehicle-driver-modelCode">
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.modelCode">Model Code</Translate>
                </Label>
                <AvField id="vehicle-driver-modelCode" type="text" name="modelCode" />
              </AvGroup>
              <AvGroup>
                <Label id="makeCodeLabel" for="vehicle-driver-makeCode">
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.makeCode">Make Code</Translate>
                </Label>
                <AvField id="vehicle-driver-makeCode" type="text" name="makeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleTypeCodeLabel" for="vehicle-driver-vehicleTypeCode">
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.vehicleTypeCode">Vehicle Type Code</Translate>
                </Label>
                <AvField id="vehicle-driver-vehicleTypeCode" type="text" name="vehicleTypeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="yearLabel" for="vehicle-driver-year">
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.year">Year</Translate>
                </Label>
                <AvField id="vehicle-driver-year" type="string" className="form-control" name="year" />
              </AvGroup>
              <AvGroup>
                <Label id="registrationNumberLabel" for="vehicle-driver-registrationNumber">
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.registrationNumber">Registration Number</Translate>
                </Label>
                <AvField id="vehicle-driver-registrationNumber" type="text" name="registrationNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="vehicle-driver-color">
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.color">Color</Translate>
                </Label>
                <AvField id="vehicle-driver-color" type="text" name="color" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-driver" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  vehicleDriverEntity: storeState.vehicleDriver.entity,
  loading: storeState.vehicleDriver.loading,
  updating: storeState.vehicleDriver.updating,
  updateSuccess: storeState.vehicleDriver.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDriverUpdate);
