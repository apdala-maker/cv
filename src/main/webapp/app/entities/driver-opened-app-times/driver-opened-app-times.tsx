import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver-opened-app-times.reducer';
import { IDriverOpenedAppTimes } from 'app/shared/model/driver-opened-app-times.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverOpenedAppTimesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DriverOpenedAppTimes = (props: IDriverOpenedAppTimesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { driverOpenedAppTimesList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-opened-app-times-heading">
        <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.home.title">Driver Opened App Times</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.home.createLabel">Create new Driver Opened App Times</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {driverOpenedAppTimesList && driverOpenedAppTimesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.dateOpened">Date Opened</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.tripCount">Trip Count</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.dateModified">Date Modified</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverOpenedAppTimesList.map((driverOpenedAppTimes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driverOpenedAppTimes.id}`} color="link" size="sm">
                      {driverOpenedAppTimes.id}
                    </Button>
                  </td>
                  <td>{driverOpenedAppTimes.driverCode}</td>
                  <td>
                    <TextFormat type="date" value={driverOpenedAppTimes.dateOpened} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{driverOpenedAppTimes.tripCount}</td>
                  <td>{driverOpenedAppTimes.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={driverOpenedAppTimes.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={driverOpenedAppTimes.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driverOpenedAppTimes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverOpenedAppTimes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverOpenedAppTimes.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.home.notFound">No Driver Opened App Times found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driverOpenedAppTimes }: IRootState) => ({
  driverOpenedAppTimesList: driverOpenedAppTimes.entities,
  loading: driverOpenedAppTimes.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverOpenedAppTimes);
