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
import { getEntity, updateEntity, createEntity, reset } from './passenger.reducer';
import { IPassenger } from 'app/shared/model/passenger.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPassengerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerUpdate = (props: IPassengerUpdateProps) => {
  const [latestLocationId, setLatestLocationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { passengerEntity, locationData, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/passenger');
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
        ...passengerEntity,
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
          <h2 id="catchControlPanelApp.passenger.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.passenger.home.createOrEditLabel">Create or edit a Passenger</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : passengerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="passenger-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="passenger-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="passenger-status">
                  <Translate contentKey="catchControlPanelApp.passenger.status">Status</Translate>
                </Label>
                <AvField id="passenger-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="passengerCodeLabel" for="passenger-passengerCode">
                  <Translate contentKey="catchControlPanelApp.passenger.passengerCode">Passenger Code</Translate>
                </Label>
                <AvField id="passenger-passengerCode" type="text" name="passengerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="passenger-areaCode">
                  <Translate contentKey="catchControlPanelApp.passenger.areaCode">Area Code</Translate>
                </Label>
                <AvField id="passenger-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="passenger-dateCreated">
                  <Translate contentKey="catchControlPanelApp.passenger.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="passenger-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="passenger-dateModified">
                  <Translate contentKey="catchControlPanelApp.passenger.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="passenger-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="passenger-latestLocation">
                  <Translate contentKey="catchControlPanelApp.passenger.latestLocation">Latest Location</Translate>
                </Label>
                <AvInput id="passenger-latestLocation" type="select" className="form-control" name="latestLocation.id">
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
              <Button tag={Link} id="cancel-save" to="/passenger" replace color="info">
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
  passengerEntity: storeState.passenger.entity,
  loading: storeState.passenger.loading,
  updating: storeState.passenger.updating,
  updateSuccess: storeState.passenger.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(PassengerUpdate);
