import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './chart-of-accounts.reducer';
import { IChartOfAccounts } from 'app/shared/model/chart-of-accounts.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChartOfAccountsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ChartOfAccounts = (props: IChartOfAccountsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { chartOfAccountsList, match, loading } = props;
  return (
    <div>
      <h2 id="chart-of-accounts-heading">
        <Translate contentKey="catchControlPanelApp.chartOfAccounts.home.title">Chart Of Accounts</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.chartOfAccounts.home.createLabel">Create new Chart Of Accounts</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {chartOfAccountsList && chartOfAccountsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.accountCode">Account Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.accountName">Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.isCJAccount">Is CJ Account</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.cOAGroupCode">C OA Group Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.systemPosted">System Posted</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {chartOfAccountsList.map((chartOfAccounts, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${chartOfAccounts.id}`} color="link" size="sm">
                      {chartOfAccounts.id}
                    </Button>
                  </td>
                  <td>{chartOfAccounts.areaCode}</td>
                  <td>{chartOfAccounts.accountCode}</td>
                  <td>{chartOfAccounts.accountName}</td>
                  <td>{chartOfAccounts.isCJAccount}</td>
                  <td>{chartOfAccounts.cOAGroupCode}</td>
                  <td>{chartOfAccounts.systemPosted}</td>
                  <td>
                    <TextFormat type="date" value={chartOfAccounts.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{chartOfAccounts.createdBy}</td>
                  <td>{chartOfAccounts.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={chartOfAccounts.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{chartOfAccounts.modifiedBy}</td>
                  <td>{chartOfAccounts.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${chartOfAccounts.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${chartOfAccounts.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${chartOfAccounts.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.home.notFound">No Chart Of Accounts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ chartOfAccounts }: IRootState) => ({
  chartOfAccountsList: chartOfAccounts.entities,
  loading: chartOfAccounts.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccounts);
