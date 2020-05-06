import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Trip = (props: ITripProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tripList, match, loading } = props;
  return (
    <div>
      <h2 id="trip-heading">
        <Translate contentKey="catchControlPanelApp.trip.home.title">Trips</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.trip.home.createLabel">Create new Trip</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tripList && tripList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.tripCode">Trip Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.vehicleCode">Vehicle Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.tripStatus">Trip Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.dateEnded">Date Ended</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.tripStartDate">Trip Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.arrivedDate">Arrived Date</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.tripInitiatedDate">Trip Initiated Date</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.passengerCode">Passenger Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.pickUpLongitude">Pick Up Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.pickUpLatitude">Pick Up Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.dropOfLatitude">Drop Of Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.dropOfLongitude">Drop Of Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.projectedAmount">Projected Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.totalDistanceInMetresCoverd">Total Distance In Metres Coverd</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.actualAmountPaid">Actual Amount Paid</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.cancelledBy">Cancelled By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.tripType">Trip Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.priceMongoModel">Price Mongo Model</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.rating">Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.trip.stops">Stops</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripList.map((trip, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trip.id}`} color="link" size="sm">
                      {trip.id}
                    </Button>
                  </td>
                  <td>{trip.tripCode}</td>
                  <td>{trip.driverCode}</td>
                  <td>{trip.vehicleCode}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.TripStatus.${trip.tripStatus}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.dateEnded} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.tripStartDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.arrivedDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.tripInitiatedDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{trip.passengerCode}</td>
                  <td>{trip.pickUpLongitude}</td>
                  <td>{trip.pickUpLatitude}</td>
                  <td>{trip.dropOfLatitude}</td>
                  <td>{trip.dropOfLongitude}</td>
                  <td>{trip.projectedAmount}</td>
                  <td>{trip.totalDistanceInMetresCoverd}</td>
                  <td>{trip.actualAmountPaid}</td>
                  <td>{trip.cancelledBy}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.TripType.${trip.tripType}`} />
                  </td>
                  <td>{trip.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={trip.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {trip.priceMongoModel ? (
                      <Link to={`price-mongo-model/${trip.priceMongoModel.id}`}>{trip.priceMongoModel.amountToBePaid}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{trip.rating ? <Link to={`rating/${trip.rating.id}`}>{trip.rating.value}</Link> : ''}</td>
                  <td>{trip.stops ? <Link to={`stops/${trip.stops.id}`}>{trip.stops.latitude}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trip.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trip.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trip.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="catchControlPanelApp.trip.home.notFound">No Trips found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ trip }: IRootState) => ({
  tripList: trip.entities,
  loading: trip.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
