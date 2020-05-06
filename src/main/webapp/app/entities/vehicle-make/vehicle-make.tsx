import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-make.reducer';
import { IVehicleMake } from 'app/shared/model/vehicle-make.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMakeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleMake = (props: IVehicleMakeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vehicleMakeList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-make-heading">
        <Translate contentKey="catchControlPanelApp.vehicleMake.home.title">Vehicle Makes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.vehicleMake.home.createLabel">Create new Vehicle Make</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vehicleMakeList && vehicleMakeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.makeCode">Make Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.vehicleMake.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleMakeList.map((vehicleMake, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleMake.id}`} color="link" size="sm">
                      {vehicleMake.id}
                    </Button>
                  </td>
                  <td>{vehicleMake.description}</td>
                  <td>{vehicleMake.makeCode}</td>
                  <td>
                    <TextFormat type="date" value={vehicleMake.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicleMake.createdBy}</td>
                  <td>{vehicleMake.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={vehicleMake.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{vehicleMake.modifiedBy}</td>
                  <td>{vehicleMake.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleMake.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleMake.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleMake.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.vehicleMake.home.notFound">No Vehicle Makes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleMake }: IRootState) => ({
  vehicleMakeList: vehicleMake.entities,
  loading: vehicleMake.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMake);
