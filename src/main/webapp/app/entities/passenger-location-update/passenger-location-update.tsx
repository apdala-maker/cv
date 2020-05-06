import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './passenger-location-update.reducer';
import { IPassengerLocationUpdate } from 'app/shared/model/passenger-location-update.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerLocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PassengerLocationUpdate = (props: IPassengerLocationUpdateProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { passengerLocationUpdateList, match, loading } = props;
  return (
    <div>
      <h2 id="passenger-location-update-heading">
        <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.home.title">Passenger Location Updates</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.home.createLabel">
            Create new Passenger Location Update
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {passengerLocationUpdateList && passengerLocationUpdateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.passengerCode">Passenger Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.startTime">Start Time</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.locationData">Location Data</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {passengerLocationUpdateList.map((passengerLocationUpdate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${passengerLocationUpdate.id}`} color="link" size="sm">
                      {passengerLocationUpdate.id}
                    </Button>
                  </td>
                  <td>{passengerLocationUpdate.passengerCode}</td>
                  <td>
                    <TextFormat type="date" value={passengerLocationUpdate.startTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{passengerLocationUpdate.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={passengerLocationUpdate.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={passengerLocationUpdate.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {passengerLocationUpdate.locationData ? (
                      <Link to={`location-data/${passengerLocationUpdate.locationData.id}`}>
                        {passengerLocationUpdate.locationData.latitude}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${passengerLocationUpdate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passengerLocationUpdate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passengerLocationUpdate.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.passengerLocationUpdate.home.notFound">
                No Passenger Location Updates found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ passengerLocationUpdate }: IRootState) => ({
  passengerLocationUpdateList: passengerLocationUpdate.entities,
  loading: passengerLocationUpdate.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassengerLocationUpdate);
