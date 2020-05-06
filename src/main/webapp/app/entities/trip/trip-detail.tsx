import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripDetail = (props: ITripDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tripEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.trip.detail.title">Trip</Translate> [<b>{tripEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.trip.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{tripEntity.tripCode}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.trip.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{tripEntity.driverCode}</dd>
          <dt>
            <span id="vehicleCode">
              <Translate contentKey="catchControlPanelApp.trip.vehicleCode">Vehicle Code</Translate>
            </span>
          </dt>
          <dd>{tripEntity.vehicleCode}</dd>
          <dt>
            <span id="tripStatus">
              <Translate contentKey="catchControlPanelApp.trip.tripStatus">Trip Status</Translate>
            </span>
          </dt>
          <dd>{tripEntity.tripStatus}</dd>
          <dt>
            <span id="dateEnded">
              <Translate contentKey="catchControlPanelApp.trip.dateEnded">Date Ended</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripEntity.dateEnded} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tripStartDate">
              <Translate contentKey="catchControlPanelApp.trip.tripStartDate">Trip Start Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripEntity.tripStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="arrivedDate">
              <Translate contentKey="catchControlPanelApp.trip.arrivedDate">Arrived Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripEntity.arrivedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tripInitiatedDate">
              <Translate contentKey="catchControlPanelApp.trip.tripInitiatedDate">Trip Initiated Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripEntity.tripInitiatedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="passengerCode">
              <Translate contentKey="catchControlPanelApp.trip.passengerCode">Passenger Code</Translate>
            </span>
          </dt>
          <dd>{tripEntity.passengerCode}</dd>
          <dt>
            <span id="pickUpLongitude">
              <Translate contentKey="catchControlPanelApp.trip.pickUpLongitude">Pick Up Longitude</Translate>
            </span>
          </dt>
          <dd>{tripEntity.pickUpLongitude}</dd>
          <dt>
            <span id="pickUpLatitude">
              <Translate contentKey="catchControlPanelApp.trip.pickUpLatitude">Pick Up Latitude</Translate>
            </span>
          </dt>
          <dd>{tripEntity.pickUpLatitude}</dd>
          <dt>
            <span id="dropOfLatitude">
              <Translate contentKey="catchControlPanelApp.trip.dropOfLatitude">Drop Of Latitude</Translate>
            </span>
          </dt>
          <dd>{tripEntity.dropOfLatitude}</dd>
          <dt>
            <span id="dropOfLongitude">
              <Translate contentKey="catchControlPanelApp.trip.dropOfLongitude">Drop Of Longitude</Translate>
            </span>
          </dt>
          <dd>{tripEntity.dropOfLongitude}</dd>
          <dt>
            <span id="projectedAmount">
              <Translate contentKey="catchControlPanelApp.trip.projectedAmount">Projected Amount</Translate>
            </span>
          </dt>
          <dd>{tripEntity.projectedAmount}</dd>
          <dt>
            <span id="totalDistanceInMetresCoverd">
              <Translate contentKey="catchControlPanelApp.trip.totalDistanceInMetresCoverd">Total Distance In Metres Coverd</Translate>
            </span>
          </dt>
          <dd>{tripEntity.totalDistanceInMetresCoverd}</dd>
          <dt>
            <span id="actualAmountPaid">
              <Translate contentKey="catchControlPanelApp.trip.actualAmountPaid">Actual Amount Paid</Translate>
            </span>
          </dt>
          <dd>{tripEntity.actualAmountPaid}</dd>
          <dt>
            <span id="cancelledBy">
              <Translate contentKey="catchControlPanelApp.trip.cancelledBy">Cancelled By</Translate>
            </span>
          </dt>
          <dd>{tripEntity.cancelledBy}</dd>
          <dt>
            <span id="tripType">
              <Translate contentKey="catchControlPanelApp.trip.tripType">Trip Type</Translate>
            </span>
          </dt>
          <dd>{tripEntity.tripType}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.trip.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{tripEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.trip.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.trip.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.trip.priceMongoModel">Price Mongo Model</Translate>
          </dt>
          <dd>{tripEntity.priceMongoModel ? tripEntity.priceMongoModel.amountToBePaid : ''}</dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.trip.rating">Rating</Translate>
          </dt>
          <dd>{tripEntity.rating ? tripEntity.rating.value : ''}</dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.trip.stops">Stops</Translate>
          </dt>
          <dd>{tripEntity.stops ? tripEntity.stops.latitude : ''}</dd>
        </dl>
        <Button tag={Link} to="/trip" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/trip/${tripEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trip }: IRootState) => ({
  tripEntity: trip.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripDetail);
