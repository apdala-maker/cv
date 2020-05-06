import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPriceMongoModel } from 'app/shared/model/price-mongo-model.model';
import { getEntities as getPriceMongoModels } from 'app/entities/price-mongo-model/price-mongo-model.reducer';
import { IRating } from 'app/shared/model/rating.model';
import { getEntities as getRatings } from 'app/entities/rating/rating.reducer';
import { IStops } from 'app/shared/model/stops.model';
import { getEntities as getStops } from 'app/entities/stops/stops.reducer';
import { getEntity, updateEntity, createEntity, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripUpdate = (props: ITripUpdateProps) => {
  const [priceMongoModelId, setPriceMongoModelId] = useState('0');
  const [ratingId, setRatingId] = useState('0');
  const [stopsId, setStopsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tripEntity, priceMongoModels, ratings, stops, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/trip');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPriceMongoModels();
    props.getRatings();
    props.getStops();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...tripEntity,
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
          <h2 id="catchControlPanelApp.trip.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.trip.home.createOrEditLabel">Create or edit a Trip</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tripEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="trip-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="trip-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tripCodeLabel" for="trip-tripCode">
                  <Translate contentKey="catchControlPanelApp.trip.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="trip-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="trip-driverCode">
                  <Translate contentKey="catchControlPanelApp.trip.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="trip-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleCodeLabel" for="trip-vehicleCode">
                  <Translate contentKey="catchControlPanelApp.trip.vehicleCode">Vehicle Code</Translate>
                </Label>
                <AvField id="trip-vehicleCode" type="text" name="vehicleCode" />
              </AvGroup>
              <AvGroup>
                <Label id="tripStatusLabel" for="trip-tripStatus">
                  <Translate contentKey="catchControlPanelApp.trip.tripStatus">Trip Status</Translate>
                </Label>
                <AvInput
                  id="trip-tripStatus"
                  type="select"
                  className="form-control"
                  name="tripStatus"
                  value={(!isNew && tripEntity.tripStatus) || 'STARTED'}
                >
                  <option value="STARTED">{translate('catchControlPanelApp.TripStatus.STARTED')}</option>
                  <option value="ONGOING">{translate('catchControlPanelApp.TripStatus.ONGOING')}</option>
                  <option value="COMPLETED">{translate('catchControlPanelApp.TripStatus.COMPLETED')}</option>
                  <option value="CANCELLED">{translate('catchControlPanelApp.TripStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dateEndedLabel" for="trip-dateEnded">
                  <Translate contentKey="catchControlPanelApp.trip.dateEnded">Date Ended</Translate>
                </Label>
                <AvField id="trip-dateEnded" type="date" className="form-control" name="dateEnded" />
              </AvGroup>
              <AvGroup>
                <Label id="tripStartDateLabel" for="trip-tripStartDate">
                  <Translate contentKey="catchControlPanelApp.trip.tripStartDate">Trip Start Date</Translate>
                </Label>
                <AvField id="trip-tripStartDate" type="date" className="form-control" name="tripStartDate" />
              </AvGroup>
              <AvGroup>
                <Label id="arrivedDateLabel" for="trip-arrivedDate">
                  <Translate contentKey="catchControlPanelApp.trip.arrivedDate">Arrived Date</Translate>
                </Label>
                <AvField id="trip-arrivedDate" type="date" className="form-control" name="arrivedDate" />
              </AvGroup>
              <AvGroup>
                <Label id="tripInitiatedDateLabel" for="trip-tripInitiatedDate">
                  <Translate contentKey="catchControlPanelApp.trip.tripInitiatedDate">Trip Initiated Date</Translate>
                </Label>
                <AvField id="trip-tripInitiatedDate" type="date" className="form-control" name="tripInitiatedDate" />
              </AvGroup>
              <AvGroup>
                <Label id="passengerCodeLabel" for="trip-passengerCode">
                  <Translate contentKey="catchControlPanelApp.trip.passengerCode">Passenger Code</Translate>
                </Label>
                <AvField id="trip-passengerCode" type="text" name="passengerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="pickUpLongitudeLabel" for="trip-pickUpLongitude">
                  <Translate contentKey="catchControlPanelApp.trip.pickUpLongitude">Pick Up Longitude</Translate>
                </Label>
                <AvField id="trip-pickUpLongitude" type="text" name="pickUpLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="pickUpLatitudeLabel" for="trip-pickUpLatitude">
                  <Translate contentKey="catchControlPanelApp.trip.pickUpLatitude">Pick Up Latitude</Translate>
                </Label>
                <AvField id="trip-pickUpLatitude" type="text" name="pickUpLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="dropOfLatitudeLabel" for="trip-dropOfLatitude">
                  <Translate contentKey="catchControlPanelApp.trip.dropOfLatitude">Drop Of Latitude</Translate>
                </Label>
                <AvField id="trip-dropOfLatitude" type="text" name="dropOfLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="dropOfLongitudeLabel" for="trip-dropOfLongitude">
                  <Translate contentKey="catchControlPanelApp.trip.dropOfLongitude">Drop Of Longitude</Translate>
                </Label>
                <AvField id="trip-dropOfLongitude" type="text" name="dropOfLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="projectedAmountLabel" for="trip-projectedAmount">
                  <Translate contentKey="catchControlPanelApp.trip.projectedAmount">Projected Amount</Translate>
                </Label>
                <AvField id="trip-projectedAmount" type="text" name="projectedAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="totalDistanceInMetresCoverdLabel" for="trip-totalDistanceInMetresCoverd">
                  <Translate contentKey="catchControlPanelApp.trip.totalDistanceInMetresCoverd">Total Distance In Metres Coverd</Translate>
                </Label>
                <AvField id="trip-totalDistanceInMetresCoverd" type="string" className="form-control" name="totalDistanceInMetresCoverd" />
              </AvGroup>
              <AvGroup>
                <Label id="actualAmountPaidLabel" for="trip-actualAmountPaid">
                  <Translate contentKey="catchControlPanelApp.trip.actualAmountPaid">Actual Amount Paid</Translate>
                </Label>
                <AvField id="trip-actualAmountPaid" type="text" name="actualAmountPaid" />
              </AvGroup>
              <AvGroup>
                <Label id="cancelledByLabel" for="trip-cancelledBy">
                  <Translate contentKey="catchControlPanelApp.trip.cancelledBy">Cancelled By</Translate>
                </Label>
                <AvField id="trip-cancelledBy" type="text" name="cancelledBy" />
              </AvGroup>
              <AvGroup>
                <Label id="tripTypeLabel" for="trip-tripType">
                  <Translate contentKey="catchControlPanelApp.trip.tripType">Trip Type</Translate>
                </Label>
                <AvInput
                  id="trip-tripType"
                  type="select"
                  className="form-control"
                  name="tripType"
                  value={(!isNew && tripEntity.tripType) || 'SCHEDULED'}
                >
                  <option value="SCHEDULED">{translate('catchControlPanelApp.TripType.SCHEDULED')}</option>
                  <option value="NOT_SCHEDULED">{translate('catchControlPanelApp.TripType.NOT_SCHEDULED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="trip-areaCode">
                  <Translate contentKey="catchControlPanelApp.trip.areaCode">Area Code</Translate>
                </Label>
                <AvField id="trip-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="trip-dateCreated">
                  <Translate contentKey="catchControlPanelApp.trip.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="trip-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="trip-dateModified">
                  <Translate contentKey="catchControlPanelApp.trip.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="trip-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="trip-priceMongoModel">
                  <Translate contentKey="catchControlPanelApp.trip.priceMongoModel">Price Mongo Model</Translate>
                </Label>
                <AvInput id="trip-priceMongoModel" type="select" className="form-control" name="priceMongoModel.id">
                  <option value="" key="0" />
                  {priceMongoModels
                    ? priceMongoModels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.amountToBePaid}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="trip-rating">
                  <Translate contentKey="catchControlPanelApp.trip.rating">Rating</Translate>
                </Label>
                <AvInput id="trip-rating" type="select" className="form-control" name="rating.id">
                  <option value="" key="0" />
                  {ratings
                    ? ratings.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.value}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="trip-stops">
                  <Translate contentKey="catchControlPanelApp.trip.stops">Stops</Translate>
                </Label>
                <AvInput id="trip-stops" type="select" className="form-control" name="stops.id">
                  <option value="" key="0" />
                  {stops
                    ? stops.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.latitude}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/trip" replace color="info">
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
  priceMongoModels: storeState.priceMongoModel.entities,
  ratings: storeState.rating.entities,
  stops: storeState.stops.entities,
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating,
  updateSuccess: storeState.trip.updateSuccess
});

const mapDispatchToProps = {
  getPriceMongoModels,
  getRatings,
  getStops,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripUpdate);
