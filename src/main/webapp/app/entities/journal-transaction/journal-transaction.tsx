import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './journal-transaction.reducer';
import { IJournalTransaction } from 'app/shared/model/journal-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJournalTransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const JournalTransaction = (props: IJournalTransactionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { journalTransactionList, match, loading } = props;
  return (
    <div>
      <h2 id="journal-transaction-heading">
        <Translate contentKey="catchControlPanelApp.journalTransaction.home.title">Journal Transactions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.journalTransaction.home.createLabel">Create new Journal Transaction</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {journalTransactionList && journalTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.recordNumber">Record Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.debit">Debit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.credit">Credit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.transactionReference">Transaction Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.narration">Narration</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.transactionDate">Transaction Date</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.batchNumber">Batch Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.transactionCode">Transaction Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.folio">Folio</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.hashCode">Hash Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.journalTransaction.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {journalTransactionList.map((journalTransaction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${journalTransaction.id}`} color="link" size="sm">
                      {journalTransaction.id}
                    </Button>
                  </td>
                  <td>{journalTransaction.areaCode}</td>
                  <td>{journalTransaction.recordNumber}</td>
                  <td>{journalTransaction.driverCode}</td>
                  <td>{journalTransaction.debit}</td>
                  <td>{journalTransaction.credit}</td>
                  <td>{journalTransaction.transactionReference}</td>
                  <td>{journalTransaction.narration}</td>
                  <td>
                    <TextFormat type="date" value={journalTransaction.transactionDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{journalTransaction.batchNumber}</td>
                  <td>{journalTransaction.transactionCode}</td>
                  <td>{journalTransaction.folio}</td>
                  <td>{journalTransaction.hashCode}</td>
                  <td>
                    <TextFormat type="date" value={journalTransaction.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{journalTransaction.createdBy}</td>
                  <td>{journalTransaction.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={journalTransaction.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{journalTransaction.modifiedBy}</td>
                  <td>{journalTransaction.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${journalTransaction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${journalTransaction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${journalTransaction.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.journalTransaction.home.notFound">No Journal Transactions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ journalTransaction }: IRootState) => ({
  journalTransactionList: journalTransaction.entities,
  loading: journalTransaction.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JournalTransaction);
