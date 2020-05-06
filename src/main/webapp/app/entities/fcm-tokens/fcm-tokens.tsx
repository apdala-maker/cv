import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './fcm-tokens.reducer';
import { IFcmTokens } from 'app/shared/model/fcm-tokens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFcmTokensProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FcmTokens = (props: IFcmTokensProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fcmTokensList, match, loading } = props;
  return (
    <div>
      <h2 id="fcm-tokens-heading">
        <Translate contentKey="catchControlPanelApp.fcmTokens.home.title">Fcm Tokens</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.fcmTokens.home.createLabel">Create new Fcm Tokens</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {fcmTokensList && fcmTokensList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.token">Token</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.isActive">Is Active</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fcmTokens.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fcmTokensList.map((fcmTokens, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fcmTokens.id}`} color="link" size="sm">
                      {fcmTokens.id}
                    </Button>
                  </td>
                  <td>{fcmTokens.userCode}</td>
                  <td>{fcmTokens.token}</td>
                  <td>{fcmTokens.isActive ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={fcmTokens.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{fcmTokens.createdBy}</td>
                  <td>{fcmTokens.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={fcmTokens.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{fcmTokens.modifiedBy}</td>
                  <td>{fcmTokens.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fcmTokens.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fcmTokens.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fcmTokens.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.fcmTokens.home.notFound">No Fcm Tokens found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fcmTokens }: IRootState) => ({
  fcmTokensList: fcmTokens.entities,
  loading: fcmTokens.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FcmTokens);
