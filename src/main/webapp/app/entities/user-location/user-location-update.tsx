import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-location.reducer';
import { IUserLocation } from 'app/shared/model/user-location.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserLocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserLocationUpdate = (props: IUserLocationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userLocationEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-location');
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
        ...userLocationEntity,
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
          <h2 id="catchControlPanelApp.userLocation.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.userLocation.home.createOrEditLabel">Create or edit a UserLocation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userLocationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-location-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-location-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="latitudeLabel" for="user-location-latitude">
                  <Translate contentKey="catchControlPanelApp.userLocation.latitude">Latitude</Translate>
                </Label>
                <AvField id="user-location-latitude" type="text" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="user-location-longitude">
                  <Translate contentKey="catchControlPanelApp.userLocation.longitude">Longitude</Translate>
                </Label>
                <AvField id="user-location-longitude" type="text" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label id="tripCodeLabel" for="user-location-tripCode">
                  <Translate contentKey="catchControlPanelApp.userLocation.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="user-location-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="userCodeLabel" for="user-location-userCode">
                  <Translate contentKey="catchControlPanelApp.userLocation.userCode">User Code</Translate>
                </Label>
                <AvField id="user-location-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="user-location-areaCode">
                  <Translate contentKey="catchControlPanelApp.userLocation.areaCode">Area Code</Translate>
                </Label>
                <AvField id="user-location-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="user-location-dateCreated">
                  <Translate contentKey="catchControlPanelApp.userLocation.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="user-location-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="user-location-dateModified">
                  <Translate contentKey="catchControlPanelApp.userLocation.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="user-location-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-location" replace color="info">
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
  userLocationEntity: storeState.userLocation.entity,
  loading: storeState.userLocation.loading,
  updating: storeState.userLocation.updating,
  updateSuccess: storeState.userLocation.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationUpdate);
