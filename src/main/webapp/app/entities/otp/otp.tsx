import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './otp.reducer';
import { IOTP } from 'app/shared/model/otp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOTPProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OTP = (props: IOTPProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { oTPList, match, loading } = props;
  return (
    <div>
      <h2 id="otp-heading">
        <Translate contentKey="catchControlPanelApp.oTP.home.title">OTPS</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.oTP.home.createLabel">Create new OTP</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {oTPList && oTPList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.oTP.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.oTP.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.oTP.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.oTP.oTPCode">O TP Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.oTP.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.oTP.dateModified">Date Modified</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {oTPList.map((oTP, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${oTP.id}`} color="link" size="sm">
                      {oTP.id}
                    </Button>
                  </td>
                  <td>{oTP.phoneNumber}</td>
                  <td>{oTP.userCode}</td>
                  <td>{oTP.areaCode}</td>
                  <td>{oTP.oTPCode}</td>
                  <td>
                    <TextFormat type="date" value={oTP.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={oTP.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${oTP.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${oTP.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${oTP.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.oTP.home.notFound">No OTPS found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ oTP }: IRootState) => ({
  oTPList: oTP.entities,
  loading: oTP.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
