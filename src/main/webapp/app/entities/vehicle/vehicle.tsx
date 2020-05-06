import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Vehicle = (props: IVehicleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vehicleList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-heading">
        <Translate contentKey="catchControlPanelApp.vehicle.home.title">Vehicles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.vehicle.home.createLabel">Create new Vehicle</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vehicleList && vehicleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.modelName">Model Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.modelCode">Model Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.makeCode">Make Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicle.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleList.map((vehicle, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicle.id}`} color="link" size="sm">
                      {vehicle.id}
                    </Button>
                  </td>
                  <td>{vehicle.modelName}</td>
                  <td>{vehicle.modelCode}</td>
                  <td>{vehicle.makeCode}</td>
                  <td>
                    <TextFormat type="date" value={vehicle.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicle.createdBy}</td>
                  <td>{vehicle.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={vehicle.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicle.modifiedBy}</td>
                  <td>{vehicle.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicle.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicle.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicle.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.vehicle.home.notFound">No Vehicles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleList: vehicle.entities,
  loading: vehicle.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
