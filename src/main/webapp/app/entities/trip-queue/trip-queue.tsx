import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trip-queue.reducer';
import { ITripQueue } from 'app/shared/model/trip-queue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripQueueProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TripQueue = (props: ITripQueueProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tripQueueList, match, loading } = props;
  return (
    <div>
      <h2 id="trip-queue-heading">
        <Translate contentKey="catchControlPanelApp.tripQueue.home.title">Trip Queues</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.tripQueue.home.createLabel">Create new Trip Queue</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tripQueueList && tripQueueList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.tripCode">Trip Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.passengerCode">Passenger Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripQueue.dateModified">Date Modified</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripQueueList.map((tripQueue, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tripQueue.id}`} color="link" size="sm">
                      {tripQueue.id}
                    </Button>
                  </td>
                  <td>{tripQueue.tripCode}</td>
                  <td>{tripQueue.driverCode}</td>
                  <td>{tripQueue.passengerCode}</td>
                  <td>{tripQueue.status}</td>
                  <td>{tripQueue.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={tripQueue.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={tripQueue.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tripQueue.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tripQueue.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tripQueue.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.tripQueue.home.notFound">No Trip Queues found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tripQueue }: IRootState) => ({
  tripQueueList: tripQueue.entities,
  loading: tripQueue.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripQueue);
