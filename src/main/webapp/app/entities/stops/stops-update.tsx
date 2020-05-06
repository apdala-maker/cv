import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './stops.reducer';
import { IStops } from 'app/shared/model/stops.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStopsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StopsUpdate = (props: IStopsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { stopsEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/stops');
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
        ...stopsEntity,
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
          <h2 id="catchControlPanelApp.stops.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.stops.home.createOrEditLabel">Create or edit a Stops</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : stopsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="stops-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="stops-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="latitudeLabel" for="stops-latitude">
                  <Translate contentKey="catchControlPanelApp.stops.latitude">Latitude</Translate>
                </Label>
                <AvField id="stops-latitude" type="text" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="stops-longitude">
                  <Translate contentKey="catchControlPanelApp.stops.longitude">Longitude</Translate>
                </Label>
                <AvField id="stops-longitude" type="text" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label id="orderLabel" for="stops-order">
                  <Translate contentKey="catchControlPanelApp.stops.order">Order</Translate>
                </Label>
                <AvField id="stops-order" type="string" className="form-control" name="order" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/stops" replace color="info">
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
  stopsEntity: storeState.stops.entity,
  loading: storeState.stops.loading,
  updating: storeState.stops.updating,
  updateSuccess: storeState.stops.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StopsUpdate);
