import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-profile-file-types.reducer';
import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProfileFileTypesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserProfileFileTypes = (props: IUserProfileFileTypesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userProfileFileTypesList, match, loading } = props;
  return (
    <div>
      <h2 id="user-profile-file-types-heading">
        <Translate contentKey="catchControlPanelApp.userProfileFileTypes.home.title">User Profile File Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.userProfileFileTypes.home.createLabel">Create new User Profile File Types</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userProfileFileTypesList && userProfileFileTypesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.userProfileFileTypes.iSActive">I S Active</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.userProfileFileTypes.profileImage">Profile Image</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.userProfileFileTypes.dateCreated">Date Created</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userProfileFileTypesList.map((userProfileFileTypes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userProfileFileTypes.id}`} color="link" size="sm">
                      {userProfileFileTypes.id}
                    </Button>
                  </td>
                  <td>{userProfileFileTypes.iSActive ? 'true' : 'false'}</td>
                  <td>{userProfileFileTypes.profileImage}</td>
                  <td>
                    <TextFormat type="date" value={userProfileFileTypes.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userProfileFileTypes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userProfileFileTypes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userProfileFileTypes.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.userProfileFileTypes.home.notFound">No User Profile File Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userProfileFileTypes }: IRootState) => ({
  userProfileFileTypesList: userProfileFileTypes.entities,
  loading: userProfileFileTypes.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileFileTypes);
