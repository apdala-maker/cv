import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocationData } from 'app/shared/model/location-data.model';
import { getEntities as getLocationData } from 'app/entities/location-data/location-data.reducer';
import { IVehicleDriver } from 'app/shared/model/vehicle-driver.model';
import { getEntities as getVehicleDrivers } from 'app/entities/vehicle-driver/vehicle-driver.reducer';
import { IMongoFileTypes } from 'app/shared/model/mongo-file-types.model';
import { getEntities as getMongoFileTypes } from 'app/entities/mongo-file-types/mongo-file-types.reducer';
import { getEntity, updateEntity, createEntity, reset } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverUpdate = (props: IDriverUpdateProps) => {
  const [latestLocationId, setLatestLocationId] = useState('0');
  const [myVehicleId, setMyVehicleId] = useState('0');
  const [mongoFileTypesId, setMongoFileTypesId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { driverEntity, locationData, vehicleDrivers, mongoFileTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/driver');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocationData();
    props.getVehicleDrivers();
    props.getMongoFileTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...driverEntity,
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
          <h2 id="catchControlPanelApp.driver.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.driver.home.createOrEditLabel">Create or edit a Driver</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driverEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="driver-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="driver-status">
                  <Translate contentKey="catchControlPanelApp.driver.status">Status</Translate>
                </Label>
                <AvField id="driver-status" type="text" name="status" />
              </AvGroup>
              <AvGroup check>
                <Label id="iSDrivingLabel">
                  <AvInput id="driver-iSDriving" type="checkbox" className="form-check-input" name="iSDriving" />
                  <Translate contentKey="catchControlPanelApp.driver.iSDriving">I S Driving</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="ontripLabel" for="driver-ontrip">
                  <Translate contentKey="catchControlPanelApp.driver.ontrip">Ontrip</Translate>
                </Label>
                <AvField id="driver-ontrip" type="text" name="ontrip" />
              </AvGroup>
              <AvGroup check>
                <Label id="iSApprovedLabel">
                  <AvInput id="driver-iSApproved" type="checkbox" className="form-check-input" name="iSApproved" />
                  <Translate contentKey="catchControlPanelApp.driver.iSApproved">I S Approved</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="driver-driverCode">
                  <Translate contentKey="catchControlPanelApp.driver.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="driver-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="tripCountLabel" for="driver-tripCount">
                  <Translate contentKey="catchControlPanelApp.driver.tripCount">Trip Count</Translate>
                </Label>
                <AvField id="driver-tripCount" type="string" className="form-control" name="tripCount" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="driver-areaCode">
                  <Translate contentKey="catchControlPanelApp.driver.areaCode">Area Code</Translate>
                </Label>
                <AvField id="driver-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="driver-dateCreated">
                  <Translate contentKey="catchControlPanelApp.driver.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="driver-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="driver-dateModified">
                  <Translate contentKey="catchControlPanelApp.driver.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="driver-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="driver-latestLocation">
                  <Translate contentKey="catchControlPanelApp.driver.latestLocation">Latest Location</Translate>
                </Label>
                <AvInput id="driver-latestLocation" type="select" className="form-control" name="latestLocation.id">
                  <option value="" key="0" />
                  {locationData
                    ? locationData.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.latitude}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-myVehicle">
                  <Translate contentKey="catchControlPanelApp.driver.myVehicle">My Vehicle</Translate>
                </Label>
                <AvInput id="driver-myVehicle" type="select" className="form-control" name="myVehicle.id">
                  <option value="" key="0" />
                  {vehicleDrivers
                    ? vehicleDrivers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.registrationNumber}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="driver-mongoFileTypes">
                  <Translate contentKey="catchControlPanelApp.driver.mongoFileTypes">Mongo File Types</Translate>
                </Label>
                <AvInput id="driver-mongoFileTypes" type="select" className="form-control" name="mongoFileTypes.id">
                  <option value="" key="0" />
                  {mongoFileTypes
                    ? mongoFileTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.fileName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/driver" replace color="info">
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
  locationData: storeState.locationData.entities,
  vehicleDrivers: storeState.vehicleDriver.entities,
  mongoFileTypes: storeState.mongoFileTypes.entities,
  driverEntity: storeState.driver.entity,
  loading: storeState.driver.loading,
  updating: storeState.driver.updating,
  updateSuccess: storeState.driver.updateSuccess
});

const mapDispatchToProps = {
  getLocationData,
  getVehicleDrivers,
  getMongoFileTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverUpdate);
