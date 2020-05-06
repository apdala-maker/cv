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
import { getEntity, updateEntity, createEntity, reset } from './passenger-location-update.reducer';
import { IPassengerLocationUpdate } from 'app/shared/model/passenger-location-update.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPassengerLocationUpdateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerLocationUpdateUpdate = (props: IPassengerLocationUpdateUpdateProps) => {
  const [locationDataId, setLocationDataId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { passengerLocationUpdateEntity, locationData, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/passenger-location-update');
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
        ...passengerLocationUpdateEntity,
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
          <h2 id="catchControlPanelApp.passengerLocationUpdate.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.home.createOrEditLabel">
              Create or edit a PassengerLocationUpdate
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : passengerLocationUpdateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="passenger-location-update-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="passenger-location-update-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="passengerCodeLabel" for="passenger-location-update-passengerCode">
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.passengerCode">Passenger Code</Translate>
                </Label>
                <AvField id="passenger-location-update-passengerCode" type="text" name="passengerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="startTimeLabel" for="passenger-location-update-startTime">
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.startTime">Start Time</Translate>
                </Label>
                <AvField id="passenger-location-update-startTime" type="date" className="form-control" name="startTime" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="passenger-location-update-areaCode">
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.areaCode">Area Code</Translate>
                </Label>
                <AvField id="passenger-location-update-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="passenger-location-update-dateCreated">
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="passenger-location-update-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="passenger-location-update-dateModified">
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="passenger-location-update-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="passenger-location-update-locationData">
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.locationData">Location Data</Translate>
                </Label>
                <AvInput id="passenger-location-update-locationData" type="select" className="form-control" name="locationData.id">
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
              <Button tag={Link} id="cancel-save" to="/passenger-location-update" replace color="info">
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
  passengerLocationUpdateEntity: storeState.passengerLocationUpdate.entity,
  loading: storeState.passengerLocationUpdate.loading,
  updating: storeState.passengerLocationUpdate.updating,
  updateSuccess: storeState.passengerLocationUpdate.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(PassengerLocationUpdateUpdate);
