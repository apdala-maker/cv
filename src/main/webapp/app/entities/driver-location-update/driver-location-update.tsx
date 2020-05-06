import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver-location-update.reducer';
import { IDriverLocationUpdate } from 'app/shared/model/driver-location-update.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverLocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DriverLocationUpdate = (props: IDriverLocationUpdateProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { driverLocationUpdateList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-location-update-heading">
        <Translate contentKey="catchControlPanelApp.driverLocationUpdate.home.title">Driver Location Updates</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.driverLocationUpdate.home.createLabel">Create new Driver Location Update</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {driverLocationUpdateList && driverLocationUpdateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.startTime">Start Time</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverLocationUpdate.locationData">Location Data</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverLocationUpdateList.map((driverLocationUpdate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driverLocationUpdate.id}`} color="link" size="sm">
                      {driverLocationUpdate.id}
                    </Button>
                  </td>
                  <td>{driverLocationUpdate.driverCode}</td>
                  <td>
                    <TextFormat type="date" value={driverLocationUpdate.startTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{driverLocationUpdate.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={driverLocationUpdate.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={driverLocationUpdate.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {driverLocationUpdate.locationData ? (
                      <Link to={`location-data/${driverLocationUpdate.locationData.id}`}>{driverLocationUpdate.locationData.latitude}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driverLocationUpdate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverLocationUpdate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverLocationUpdate.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.driverLocationUpdate.home.notFound">No Driver Location Updates found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driverLocationUpdate }: IRootState) => ({
  driverLocationUpdateList: driverLocationUpdate.entities,
  loading: driverLocationUpdate.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLocationUpdate);
