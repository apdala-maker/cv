import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './application-user.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ApplicationUser = (props: IApplicationUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { applicationUserList, match, loading } = props;
  return (
    <div>
      <h2 id="application-user-heading">
        <Translate contentKey="catchControlPanelApp.applicationUser.home.title">Application Users</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.applicationUser.home.createLabel">Create new Application User</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {applicationUserList && applicationUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.countryCode">Country Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.companyCode">Company Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.currentRating">Current Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.userType">User Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.isActive">Is Active</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.isApproved">Is Approved</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.approvedBy">Approved By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.activatedBy">Activated By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.imageUrl">Image Url</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationUser.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {applicationUserList.map((applicationUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${applicationUser.id}`} color="link" size="sm">
                      {applicationUser.id}
                    </Button>
                  </td>
                  <td>{applicationUser.userCode}</td>
                  <td>{applicationUser.name}</td>
                  <td>{applicationUser.countryCode}</td>
                  <td>{applicationUser.areaCode}</td>
                  <td>{applicationUser.gender}</td>
                  <td>{applicationUser.companyCode}</td>
                  <td>{applicationUser.currentRating}</td>
                  <td>{applicationUser.userType}</td>
                  <td>{applicationUser.isActive ? 'true' : 'false'}</td>
                  <td>{applicationUser.isApproved ? 'true' : 'false'}</td>
                  <td>{applicationUser.approvedBy}</td>
                  <td>{applicationUser.activatedBy}</td>
                  <td>{applicationUser.imageUrl}</td>
                  <td>
                    <TextFormat type="date" value={applicationUser.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{applicationUser.createdBy}</td>
                  <td>{applicationUser.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={applicationUser.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{applicationUser.modifiedBy}</td>
                  <td>{applicationUser.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${applicationUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${applicationUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${applicationUser.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.applicationUser.home.notFound">No Application Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ applicationUser }: IRootState) => ({
  applicationUserList: applicationUser.entities,
  loading: applicationUser.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUser);
