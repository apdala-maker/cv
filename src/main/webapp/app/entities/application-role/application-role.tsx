import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './application-role.reducer';
import { IApplicationRole } from 'app/shared/model/application-role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationRoleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ApplicationRole = (props: IApplicationRoleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { applicationRoleList, match, loading } = props;
  return (
    <div>
      <h2 id="application-role-heading">
        <Translate contentKey="catchControlPanelApp.applicationRole.home.title">Application Roles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.applicationRole.home.createLabel">Create new Application Role</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {applicationRoleList && applicationRoleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.access">Access</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.applicationRole.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {applicationRoleList.map((applicationRole, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${applicationRole.id}`} color="link" size="sm">
                      {applicationRole.id}
                    </Button>
                  </td>
                  <td>{applicationRole.access}</td>
                  <td>
                    <TextFormat type="date" value={applicationRole.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{applicationRole.createdBy}</td>
                  <td>{applicationRole.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={applicationRole.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{applicationRole.modifiedBy}</td>
                  <td>{applicationRole.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${applicationRole.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${applicationRole.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${applicationRole.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.applicationRole.home.notFound">No Application Roles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ applicationRole }: IRootState) => ({
  applicationRoleList: applicationRole.entities,
  loading: applicationRole.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRole);
