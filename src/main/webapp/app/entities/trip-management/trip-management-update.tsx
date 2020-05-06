import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './trip-management.reducer';
import { ITripManagement } from 'app/shared/model/trip-management.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripManagementUpdate = (props: ITripManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tripManagementEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/trip-management');
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
        ...tripManagementEntity,
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
          <h2 id="catchControlPanelApp.tripManagement.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.tripManagement.home.createOrEditLabel">Create or edit a TripManagement</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tripManagementEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="trip-management-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="trip-management-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="trip-management-areaCode">
                  <Translate contentKey="catchControlPanelApp.tripManagement.areaCode">Area Code</Translate>
                </Label>
                <AvField id="trip-management-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="startimeLabel" for="trip-management-startime">
                  <Translate contentKey="catchControlPanelApp.tripManagement.startime">Startime</Translate>
                </Label>
                <AvField id="trip-management-startime" type="date" className="form-control" name="startime" />
              </AvGroup>
              <AvGroup>
                <Label id="endtimeLabel" for="trip-management-endtime">
                  <Translate contentKey="catchControlPanelApp.tripManagement.endtime">Endtime</Translate>
                </Label>
                <AvField id="trip-management-endtime" type="date" className="form-control" name="endtime" />
              </AvGroup>
              <AvGroup>
                <Label id="startLongitudeLabel" for="trip-management-startLongitude">
                  <Translate contentKey="catchControlPanelApp.tripManagement.startLongitude">Start Longitude</Translate>
                </Label>
                <AvField id="trip-management-startLongitude" type="text" name="startLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="startLatitudeLabel" for="trip-management-startLatitude">
                  <Translate contentKey="catchControlPanelApp.tripManagement.startLatitude">Start Latitude</Translate>
                </Label>
                <AvField id="trip-management-startLatitude" type="text" name="startLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="distanceLabel" for="trip-management-distance">
                  <Translate contentKey="catchControlPanelApp.tripManagement.distance">Distance</Translate>
                </Label>
                <AvField id="trip-management-distance" type="string" className="form-control" name="distance" />
              </AvGroup>
              <AvGroup>
                <Label id="tripCostLabel" for="trip-management-tripCost">
                  <Translate contentKey="catchControlPanelApp.tripManagement.tripCost">Trip Cost</Translate>
                </Label>
                <AvField id="trip-management-tripCost" type="text" name="tripCost" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="trip-management-driverCode">
                  <Translate contentKey="catchControlPanelApp.tripManagement.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="trip-management-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="passengerCodeLabel" for="trip-management-passengerCode">
                  <Translate contentKey="catchControlPanelApp.tripManagement.passengerCode">Passenger Code</Translate>
                </Label>
                <AvField id="trip-management-passengerCode" type="text" name="passengerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="trip-management-status">
                  <Translate contentKey="catchControlPanelApp.tripManagement.status">Status</Translate>
                </Label>
                <AvField id="trip-management-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="tripCodeLabel" for="trip-management-tripCode">
                  <Translate contentKey="catchControlPanelApp.tripManagement.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="trip-management-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="trip-management-dateCreated">
                  <Translate contentKey="catchControlPanelApp.tripManagement.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="trip-management-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="trip-management-createdBy">
                  <Translate contentKey="catchControlPanelApp.tripManagement.createdBy">Created By</Translate>
                </Label>
                <AvField id="trip-management-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="trip-management-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.tripManagement.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="trip-management-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="trip-management-dateModified">
                  <Translate contentKey="catchControlPanelApp.tripManagement.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="trip-management-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="trip-management-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.tripManagement.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="trip-management-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="trip-management-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.tripManagement.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="trip-management-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/trip-management" replace color="info">
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
  tripManagementEntity: storeState.tripManagement.entity,
  loading: storeState.tripManagement.loading,
  updating: storeState.tripManagement.updating,
  updateSuccess: storeState.tripManagement.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripManagementUpdate);
