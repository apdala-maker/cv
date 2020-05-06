import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-type.reducer';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleType = (props: IVehicleTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vehicleTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-type-heading">
        <Translate contentKey="catchControlPanelApp.vehicleType.home.title">Vehicle Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.vehicleType.home.createLabel">Create new Vehicle Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vehicleTypeList && vehicleTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.isMotorBike">Is Motor Bike</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.numberOfSeats">Number Of Seats</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.minimumCC">Minimum CC</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.maximumCC">Maximum CC</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleType.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleTypeList.map((vehicleType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleType.id}`} color="link" size="sm">
                      {vehicleType.id}
                    </Button>
                  </td>
                  <td>{vehicleType.areaCode}</td>
                  <td>{vehicleType.isMotorBike ? 'true' : 'false'}</td>
                  <td>{vehicleType.description}</td>
                  <td>{vehicleType.code}</td>
                  <td>{vehicleType.numberOfSeats}</td>
                  <td>{vehicleType.minimumCC}</td>
                  <td>{vehicleType.maximumCC}</td>
                  <td>
                    <TextFormat type="date" value={vehicleType.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicleType.createdBy}</td>
                  <td>{vehicleType.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={vehicleType.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicleType.modifiedBy}</td>
                  <td>{vehicleType.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.vehicleType.home.notFound">No Vehicle Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleType }: IRootState) => ({
  vehicleTypeList: vehicleType.entities,
  loading: vehicleType.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleType);
