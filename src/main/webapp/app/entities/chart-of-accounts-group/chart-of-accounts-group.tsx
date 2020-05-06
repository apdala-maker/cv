import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './chart-of-accounts-group.reducer';
import { IChartOfAccountsGroup } from 'app/shared/model/chart-of-accounts-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChartOfAccountsGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ChartOfAccountsGroup = (props: IChartOfAccountsGroupProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { chartOfAccountsGroupList, match, loading } = props;
  return (
    <div>
      <h2 id="chart-of-accounts-group-heading">
        <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.home.title">Chart Of Accounts Groups</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.home.createLabel">Create new Chart Of Accounts Group</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {chartOfAccountsGroupList && chartOfAccountsGroupList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.accountType">Account Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {chartOfAccountsGroupList.map((chartOfAccountsGroup, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${chartOfAccountsGroup.id}`} color="link" size="sm">
                      {chartOfAccountsGroup.id}
                    </Button>
                  </td>
                  <td>{chartOfAccountsGroup.code}</td>
                  <td>{chartOfAccountsGroup.accountType}</td>
                  <td>{chartOfAccountsGroup.description}</td>
                  <td>
                    <TextFormat type="date" value={chartOfAccountsGroup.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{chartOfAccountsGroup.createdBy}</td>
                  <td>{chartOfAccountsGroup.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={chartOfAccountsGroup.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{chartOfAccountsGroup.modifiedBy}</td>
                  <td>{chartOfAccountsGroup.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${chartOfAccountsGroup.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${chartOfAccountsGroup.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${chartOfAccountsGroup.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.home.notFound">No Chart Of Accounts Groups found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ chartOfAccountsGroup }: IRootState) => ({
  chartOfAccountsGroupList: chartOfAccountsGroup.entities,
  loading: chartOfAccountsGroup.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountsGroup);
