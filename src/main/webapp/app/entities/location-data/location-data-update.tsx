import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './location-data.reducer';
import { ILocationData } from 'app/shared/model/location-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDataUpdate = (props: ILocationDataUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationDataEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/location-data');
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
        ...locationDataEntity,
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
          <h2 id="catchControlPanelApp.locationData.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.locationData.home.createOrEditLabel">Create or edit a LocationData</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-data-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="location-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="latitudeLabel" for="location-data-latitude">
                  <Translate contentKey="catchControlPanelApp.locationData.latitude">Latitude</Translate>
                </Label>
                <AvField id="location-data-latitude" type="string" className="form-control" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="location-data-longitude">
                  <Translate contentKey="catchControlPanelApp.locationData.longitude">Longitude</Translate>
                </Label>
                <AvField id="location-data-longitude" type="string" className="form-control" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label id="bearingLabel" for="location-data-bearing">
                  <Translate contentKey="catchControlPanelApp.locationData.bearing">Bearing</Translate>
                </Label>
                <AvField id="location-data-bearing" type="text" name="bearing" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location-data" replace color="info">
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
  locationDataEntity: storeState.locationData.entity,
  loading: storeState.locationData.loading,
  updating: storeState.locationData.updating,
  updateSuccess: storeState.locationData.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDataUpdate);
