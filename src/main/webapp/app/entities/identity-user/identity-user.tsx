import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './identity-user.reducer';
import { IIdentityUser } from 'app/shared/model/identity-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIdentityUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const IdentityUser = (props: IIdentityUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { identityUserList, match, loading } = props;
  return (
    <div>
      <h2 id="identity-user-heading">
        <Translate contentKey="catchControlPanelApp.identityUser.home.title">Identity Users</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.identityUser.home.createLabel">Create new Identity User</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {identityUserList && identityUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.countryCode">Country Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.companyCode">Company Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.affliateCode">Affliate Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.currentRating">Current Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.userType">User Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.isActive">Is Active</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.registrationStep">Registration Step</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.isApproved">Is Approved</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.approvedBy">Approved By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.activatedBy">Activated By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.identityUser.userProfileFileTypes">User Profile File Types</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {identityUserList.map((identityUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${identityUser.id}`} color="link" size="sm">
                      {identityUser.id}
                    </Button>
                  </td>
                  <td>{identityUser.userCode}</td>
                  <td>{identityUser.name}</td>
                  <td>{identityUser.countryCode}</td>
                  <td>{identityUser.areaCode}</td>
                  <td>{identityUser.gender}</td>
                  <td>{identityUser.companyCode}</td>
                  <td>{identityUser.affliateCode}</td>
                  <td>{identityUser.currentRating}</td>
                  <td>{identityUser.userType}</td>
                  <td>{identityUser.isActive ? 'true' : 'false'}</td>
                  <td>{identityUser.registrationStep}</td>
                  <td>{identityUser.isApproved ? 'true' : 'false'}</td>
                  <td>{identityUser.approvedBy}</td>
                  <td>{identityUser.activatedBy}</td>
                  <td>
                    <TextFormat type="date" value={identityUser.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={identityUser.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {identityUser.userProfileFileTypes ? (
                      <Link to={`user-profile-file-types/${identityUser.userProfileFileTypes.id}`}>
                        {identityUser.userProfileFileTypes.profileImage}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${identityUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${identityUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${identityUser.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.identityUser.home.notFound">No Identity Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ identityUser }: IRootState) => ({
  identityUserList: identityUser.entities,
  loading: identityUser.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IdentityUser);
