import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './trip-queue.reducer';
import { ITripQueue } from 'app/shared/model/trip-queue.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripQueueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripQueueUpdate = (props: ITripQueueUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tripQueueEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/trip-queue');
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
        ...tripQueueEntity,
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
          <h2 id="catchControlPanelApp.tripQueue.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.tripQueue.home.createOrEditLabel">Create or edit a TripQueue</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tripQueueEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="trip-queue-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="trip-queue-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tripCodeLabel" for="trip-queue-tripCode">
                  <Translate contentKey="catchControlPanelApp.tripQueue.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="trip-queue-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="trip-queue-driverCode">
                  <Translate contentKey="catchControlPanelApp.tripQueue.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="trip-queue-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="passengerCodeLabel" for="trip-queue-passengerCode">
                  <Translate contentKey="catchControlPanelApp.tripQueue.passengerCode">Passenger Code</Translate>
                </Label>
                <AvField id="trip-queue-passengerCode" type="text" name="passengerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="trip-queue-status">
                  <Translate contentKey="catchControlPanelApp.tripQueue.status">Status</Translate>
                </Label>
                <AvField id="trip-queue-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="trip-queue-areaCode">
                  <Translate contentKey="catchControlPanelApp.tripQueue.areaCode">Area Code</Translate>
                </Label>
                <AvField id="trip-queue-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="trip-queue-dateCreated">
                  <Translate contentKey="catchControlPanelApp.tripQueue.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="trip-queue-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="trip-queue-dateModified">
                  <Translate contentKey="catchControlPanelApp.tripQueue.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="trip-queue-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/trip-queue" replace color="info">
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
  tripQueueEntity: storeState.tripQueue.entity,
  loading: storeState.tripQueue.loading,
  updating: storeState.tripQueue.updating,
  updateSuccess: storeState.tripQueue.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripQueueUpdate);
