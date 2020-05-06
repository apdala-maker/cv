import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trip-management.reducer';
import { ITripManagement } from 'app/shared/model/trip-management.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TripManagement = (props: ITripManagementProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tripManagementList, match, loading } = props;
  return (
    <div>
      <h2 id="trip-management-heading">
        <Translate contentKey="catchControlPanelApp.tripManagement.home.title">Trip Managements</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.tripManagement.home.createLabel">Create new Trip Management</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tripManagementList && tripManagementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.startime">Startime</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.endtime">Endtime</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.startLongitude">Start Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.startLatitude">Start Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.distance">Distance</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.tripCost">Trip Cost</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.passengerCode">Passenger Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.tripCode">Trip Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.tripManagement.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripManagementList.map((tripManagement, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tripManagement.id}`} color="link" size="sm">
                      {tripManagement.id}
                    </Button>
                  </td>
                  <td>{tripManagement.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={tripManagement.startime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={tripManagement.endtime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{tripManagement.startLongitude}</td>
                  <td>{tripManagement.startLatitude}</td>
                  <td>{tripManagement.distance}</td>
                  <td>{tripManagement.tripCost}</td>
                  <td>{tripManagement.driverCode}</td>
                  <td>{tripManagement.passengerCode}</td>
                  <td>{tripManagement.status}</td>
                  <td>{tripManagement.tripCode}</td>
                  <td>
                    <TextFormat type="date" value={tripManagement.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{tripManagement.createdBy}</td>
                  <td>{tripManagement.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={tripManagement.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{tripManagement.modifiedBy}</td>
                  <td>{tripManagement.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tripManagement.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tripManagement.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tripManagement.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.tripManagement.home.notFound">No Trip Managements found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tripManagement }: IRootState) => ({
  tripManagementList: tripManagement.entities,
  loading: tripManagement.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripManagement);
