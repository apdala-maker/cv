import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sms-model.reducer';
import { ISmsModel } from 'app/shared/model/sms-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISmsModelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SmsModel = (props: ISmsModelProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { smsModelList, match, loading } = props;
  return (
    <div>
      <h2 id="sms-model-heading">
        <Translate contentKey="catchControlPanelApp.smsModel.home.title">Sms Models</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.smsModel.home.createLabel">Create new Sms Model</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {smsModelList && smsModelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.message">Message</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.isSend">Is Send</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.smsModel.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {smsModelList.map((smsModel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${smsModel.id}`} color="link" size="sm">
                      {smsModel.id}
                    </Button>
                  </td>
                  <td>{smsModel.phoneNumber}</td>
                  <td>{smsModel.message}</td>
                  <td>{smsModel.isSend ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={smsModel.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{smsModel.createdBy}</td>
                  <td>{smsModel.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={smsModel.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{smsModel.modifiedBy}</td>
                  <td>{smsModel.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${smsModel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${smsModel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${smsModel.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.smsModel.home.notFound">No Sms Models found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ smsModel }: IRootState) => ({
  smsModelList: smsModel.entities,
  loading: smsModel.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SmsModel);
