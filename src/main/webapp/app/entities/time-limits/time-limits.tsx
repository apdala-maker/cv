import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './time-limits.reducer';
import { ITimeLimits } from 'app/shared/model/time-limits.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimeLimitsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TimeLimits = (props: ITimeLimitsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { timeLimitsList, match, loading } = props;
  return (
    <div>
      <h2 id="time-limits-heading">
        <Translate contentKey="catchControlPanelApp.timeLimits.home.title">Time Limits</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.timeLimits.home.createLabel">Create new Time Limits</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {timeLimitsList && timeLimitsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.startHour">Start Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.startMinute">Start Minute</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.endHour">End Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.endMinute">End Minute</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.timeLimits.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {timeLimitsList.map((timeLimits, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${timeLimits.id}`} color="link" size="sm">
                      {timeLimits.id}
                    </Button>
                  </td>
                  <td>{timeLimits.areaCode}</td>
                  <td>{timeLimits.description}</td>
                  <td>{timeLimits.code}</td>
                  <td>{timeLimits.category}</td>
                  <td>{timeLimits.startHour}</td>
                  <td>{timeLimits.startMinute}</td>
                  <td>{timeLimits.endHour}</td>
                  <td>{timeLimits.endMinute}</td>
                  <td>
                    <TextFormat type="date" value={timeLimits.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{timeLimits.createdBy}</td>
                  <td>{timeLimits.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={timeLimits.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{timeLimits.modifiedBy}</td>
                  <td>{timeLimits.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${timeLimits.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeLimits.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeLimits.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.timeLimits.home.notFound">No Time Limits found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ timeLimits }: IRootState) => ({
  timeLimitsList: timeLimits.entities,
  loading: timeLimits.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TimeLimits);
