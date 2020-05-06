import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './passenger.reducer';
import { IPassenger } from 'app/shared/model/passenger.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Passenger = (props: IPassengerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { passengerList, match, loading } = props;
  return (
    <div>
      <h2 id="passenger-heading">
        <Translate contentKey="catchControlPanelApp.passenger.home.title">Passengers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.passenger.home.createLabel">Create new Passenger</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {passengerList && passengerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passenger.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passenger.passengerCode">Passenger Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passenger.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passenger.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passenger.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passenger.latestLocation">Latest Location</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {passengerList.map((passenger, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${passenger.id}`} color="link" size="sm">
                      {passenger.id}
                    </Button>
                  </td>
                  <td>{passenger.status}</td>
                  <td>{passenger.passengerCode}</td>
                  <td>{passenger.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={passenger.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={passenger.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {passenger.latestLocation ? (
                      <Link to={`location-data/${passenger.latestLocation.id}`}>{passenger.latestLocation.latitude}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${passenger.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passenger.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passenger.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.passenger.home.notFound">No Passengers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ passenger }: IRootState) => ({
  passengerList: passenger.entities,
  loading: passenger.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Passenger);
