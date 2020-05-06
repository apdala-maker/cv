import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-mapping.reducer';
import { IVehicleMapping } from 'app/shared/model/vehicle-mapping.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMappingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleMapping = (props: IVehicleMappingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vehicleMappingList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-mapping-heading">
        <Translate contentKey="catchControlPanelApp.vehicleMapping.home.title">Vehicle Mappings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.vehicleMapping.home.createLabel">Create new Vehicle Mapping</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vehicleMappingList && vehicleMappingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.makeCode">Make Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.modelCode">Model Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.year">Year</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.registrationNumber">Registration Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.vehicleTypeCode">Vehicle Type Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.isApproved">Is Approved</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.approvedBy">Approved By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleMappingList.map((vehicleMapping, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleMapping.id}`} color="link" size="sm">
                      {vehicleMapping.id}
                    </Button>
                  </td>
                  <td>{vehicleMapping.makeCode}</td>
                  <td>{vehicleMapping.userCode}</td>
                  <td>{vehicleMapping.modelCode}</td>
                  <td>{vehicleMapping.year}</td>
                  <td>{vehicleMapping.registrationNumber}</td>
                  <td>{vehicleMapping.vehicleTypeCode}</td>
                  <td>{vehicleMapping.areaCode}</td>
                  <td>{vehicleMapping.isApproved ? 'true' : 'false'}</td>
                  <td>{vehicleMapping.approvedBy}</td>
                  <td>
                    <TextFormat type="date" value={vehicleMapping.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicleMapping.createdBy}</td>
                  <td>{vehicleMapping.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={vehicleMapping.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicleMapping.modifiedBy}</td>
                  <td>{vehicleMapping.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleMapping.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleMapping.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleMapping.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.vehicleMapping.home.notFound">No Vehicle Mappings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleMapping }: IRootState) => ({
  vehicleMappingList: vehicleMapping.entities,
  loading: vehicleMapping.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMapping);
