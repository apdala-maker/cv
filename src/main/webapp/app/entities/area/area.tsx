import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Area = (props: IAreaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { areaList, match, loading } = props;
  return (
    <div>
      <h2 id="area-heading">
        <Translate contentKey="catchControlPanelApp.area.home.title">Areas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.area.home.createLabel">Create new Area</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {areaList && areaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.countryCode">Country Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.northEastLatitude">North East Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.southWestLatitude">South West Latitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.northEastLongitude">North East Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.southWestLongitude">South West Longitude</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.isActive">Is Active</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.isApproved">Is Approved</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.approvedBy">Approved By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.activatedBy">Activated By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.area.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {areaList.map((area, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${area.id}`} color="link" size="sm">
                      {area.id}
                    </Button>
                  </td>
                  <td>{area.countryCode}</td>
                  <td>{area.areaCode}</td>
                  <td>{area.address}</td>
                  <td>{area.name}</td>
                  <td>{area.northEastLatitude}</td>
                  <td>{area.southWestLatitude}</td>
                  <td>{area.northEastLongitude}</td>
                  <td>{area.southWestLongitude}</td>
                  <td>{area.isActive ? 'true' : 'false'}</td>
                  <td>{area.isApproved ? 'true' : 'false'}</td>
                  <td>{area.approvedBy}</td>
                  <td>{area.activatedBy}</td>
                  <td>
                    <TextFormat type="date" value={area.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{area.createdBy}</td>
                  <td>{area.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={area.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{area.modifiedBy}</td>
                  <td>{area.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${area.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${area.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${area.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.area.home.notFound">No Areas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ area }: IRootState) => ({
  areaList: area.entities,
  loading: area.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Area);
