import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './location-data.reducer';
import { ILocationData } from 'app/shared/model/location-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const LocationData = (props: ILocationDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { locationDataList, match, loading } = props;
  return (
    <div>
      <h2 id="location-data-heading">
        <Translate contentKey="catchControlPanelApp.locationData.home.title">Location Data</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.locationData.home.createLabel">Create new Location Data</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {locationDataList && locationDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.locationData.latitude">Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.locationData.longitude">Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.locationData.bearing">Bearing</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {locationDataList.map((locationData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${locationData.id}`} color="link" size="sm">
                      {locationData.id}
                    </Button>
                  </td>
                  <td>{locationData.latitude}</td>
                  <td>{locationData.longitude}</td>
                  <td>{locationData.bearing}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${locationData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${locationData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${locationData.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.locationData.home.notFound">No Location Data found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ locationData }: IRootState) => ({
  locationDataList: locationData.entities,
  loading: locationData.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationData);
