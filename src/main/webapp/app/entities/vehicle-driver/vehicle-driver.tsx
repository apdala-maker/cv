import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-driver.reducer';
import { IVehicleDriver } from 'app/shared/model/vehicle-driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDriverProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleDriver = (props: IVehicleDriverProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vehicleDriverList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-driver-heading">
        <Translate contentKey="catchControlPanelApp.vehicleDriver.home.title">Vehicle Drivers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.vehicleDriver.home.createLabel">Create new Vehicle Driver</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vehicleDriverList && vehicleDriverList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.modelCode">Model Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.makeCode">Make Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.vehicleTypeCode">Vehicle Type Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.year">Year</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.registrationNumber">Registration Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleDriver.color">Color</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleDriverList.map((vehicleDriver, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleDriver.id}`} color="link" size="sm">
                      {vehicleDriver.id}
                    </Button>
                  </td>
                  <td>{vehicleDriver.modelCode}</td>
                  <td>{vehicleDriver.makeCode}</td>
                  <td>{vehicleDriver.vehicleTypeCode}</td>
                  <td>{vehicleDriver.year}</td>
                  <td>{vehicleDriver.registrationNumber}</td>
                  <td>{vehicleDriver.color}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleDriver.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleDriver.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleDriver.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.vehicleDriver.home.notFound">No Vehicle Drivers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleDriver }: IRootState) => ({
  vehicleDriverList: vehicleDriver.entities,
  loading: vehicleDriver.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDriver);
