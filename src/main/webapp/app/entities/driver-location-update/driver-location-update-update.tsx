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
import { getEntity, updateEntity, createEntity, reset } from './driver-location-update.reducer';
import { IDriverLocationUpdate } from 'app/shared/model/driver-location-update.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverLocationUpdateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLocationUpdateUpdate = (props: IDriverLocationUpdateUpdateProps) => {
  const [locationDataId, setLocationDataId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { driverLocationUpdateEntity, locationData, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/driver-location-update');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocationData();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...driverLocationUpdateEntity,
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
          <h2 id="catchControlPanelApp.driverLocationUpdate.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.driverLocationUpdate.home.createOrEditLabel">
              Create or edit a DriverLocationUpdate
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driverLocationUpdateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-location-update-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="driver-location-update-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="driverCodeLabel" for="driver-location-update-driverCode">
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="driver-location-update-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="startTimeLabel" for="driver-location-update-startTime">
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.startTime">Start Time</Translate>
                </Label>
                <AvField id="driver-location-update-startTime" type="date" className="form-control" name="startTime" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="driver-location-update-areaCode">
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.areaCode">Area Code</Translate>
                </Label>
                <AvField id="driver-location-update-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="driver-location-update-dateCreated">
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="driver-location-update-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="driver-location-update-dateModified">
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="driver-location-update-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="driver-location-update-locationData">
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.locationData">Location Data</Translate>
                </Label>
                <AvInput id="driver-location-update-locationData" type="select" className="form-control" name="locationData.id">
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
              <Button tag={Link} id="cancel-save" to="/driver-location-update" replace color="info">
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
  driverLocationUpdateEntity: storeState.driverLocationUpdate.entity,
  loading: storeState.driverLocationUpdate.loading,
  updating: storeState.driverLocationUpdate.updating,
  updateSuccess: storeState.driverLocationUpdate.updateSuccess
});

const mapDispatchToProps = {
  getLocationData,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLocationUpdateUpdate);
