import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './restricted-area.reducer';
import { IRestrictedArea } from 'app/shared/model/restricted-area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRestrictedAreaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RestrictedArea = (props: IRestrictedAreaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { restrictedAreaList, match, loading } = props;
  return (
    <div>
      <h2 id="restricted-area-heading">
        <Translate contentKey="catchControlPanelApp.restrictedArea.home.title">Restricted Areas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.restrictedArea.home.createLabel">Create new Restricted Area</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {restrictedAreaList && restrictedAreaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.northEastLatitude">North East Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.southWestLatitude">South West Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.northEastLongitude">North East Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.southWestLongitude">South West Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.vehicleTypeCode">Vehicle Type Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.restrictedArea.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {restrictedAreaList.map((restrictedArea, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${restrictedArea.id}`} color="link" size="sm">
                      {restrictedArea.id}
                    </Button>
                  </td>
                  <td>{restrictedArea.areaCode}</td>
                  <td>{restrictedArea.name}</td>
                  <td>{restrictedArea.northEastLatitude}</td>
                  <td>{restrictedArea.southWestLatitude}</td>
                  <td>{restrictedArea.northEastLongitude}</td>
                  <td>{restrictedArea.southWestLongitude}</td>
                  <td>{restrictedArea.vehicleTypeCode}</td>
                  <td>
                    <TextFormat type="date" value={restrictedArea.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{restrictedArea.createdBy}</td>
                  <td>{restrictedArea.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={restrictedArea.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{restrictedArea.modifiedBy}</td>
                  <td>{restrictedArea.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${restrictedArea.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${restrictedArea.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${restrictedArea.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.restrictedArea.home.notFound">No Restricted Areas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ restrictedArea }: IRootState) => ({
  restrictedAreaList: restrictedArea.entities,
  loading: restrictedArea.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedArea);
