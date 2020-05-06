import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Driver = (props: IDriverProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { driverList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-heading">
        <Translate contentKey="catchControlPanelApp.driver.home.title">Drivers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.driver.home.createLabel">Create new Driver</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {driverList && driverList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.iSDriving">I S Driving</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.ontrip">Ontrip</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.iSApproved">I S Approved</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.tripCount">Trip Count</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.latestLocation">Latest Location</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.myVehicle">My Vehicle</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driver.mongoFileTypes">Mongo File Types</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverList.map((driver, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driver.id}`} color="link" size="sm">
                      {driver.id}
                    </Button>
                  </td>
                  <td>{driver.status}</td>
                  <td>{driver.iSDriving ? 'true' : 'false'}</td>
                  <td>{driver.ontrip}</td>
                  <td>{driver.iSApproved ? 'true' : 'false'}</td>
                  <td>{driver.driverCode}</td>
                  <td>{driver.tripCount}</td>
                  <td>{driver.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={driver.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={driver.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {driver.latestLocation ? (
                      <Link to={`location-data/${driver.latestLocation.id}`}>{driver.latestLocation.latitude}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {driver.myVehicle ? (
                      <Link to={`vehicle-driver/${driver.myVehicle.id}`}>{driver.myVehicle.registrationNumber}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {driver.mongoFileTypes ? (
                      <Link to={`mongo-file-types/${driver.mongoFileTypes.id}`}>{driver.mongoFileTypes.fileName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driver.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driver.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driver.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.driver.home.notFound">No Drivers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driver }: IRootState) => ({
  driverList: driver.entities,
  loading: driver.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
