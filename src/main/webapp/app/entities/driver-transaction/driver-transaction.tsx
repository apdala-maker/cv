import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver-transaction.reducer';
import { IDriverTransaction } from 'app/shared/model/driver-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverTransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DriverTransaction = (props: IDriverTransactionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { driverTransactionList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-transaction-heading">
        <Translate contentKey="catchControlPanelApp.driverTransaction.home.title">Driver Transactions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.driverTransaction.home.createLabel">Create new Driver Transaction</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {driverTransactionList && driverTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.recordNumber">Record Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.customerCode">Customer Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.debit">Debit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.credit">Credit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.narration">Narration</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.transactionReference">Transaction Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.transactionCode">Transaction Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.paymentChannel">Payment Channel</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.isReversed">Is Reversed</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.hashCode">Hash Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.driverTransaction.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverTransactionList.map((driverTransaction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driverTransaction.id}`} color="link" size="sm">
                      {driverTransaction.id}
                    </Button>
                  </td>
                  <td>{driverTransaction.areaCode}</td>
                  <td>{driverTransaction.recordNumber}</td>
                  <td>{driverTransaction.customerCode}</td>
                  <td>{driverTransaction.driverCode}</td>
                  <td>{driverTransaction.debit}</td>
                  <td>{driverTransaction.credit}</td>
                  <td>{driverTransaction.narration}</td>
                  <td>{driverTransaction.transactionReference}</td>
                  <td>{driverTransaction.transactionCode}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.PaymentChannel.${driverTransaction.paymentChannel}`} />
                  </td>
                  <td>{driverTransaction.isReversed}</td>
                  <td>{driverTransaction.hashCode}</td>
                  <td>
                    <TextFormat type="date" value={driverTransaction.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{driverTransaction.createdBy}</td>
                  <td>{driverTransaction.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={driverTransaction.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{driverTransaction.modifiedBy}</td>
                  <td>{driverTransaction.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driverTransaction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverTransaction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverTransaction.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.driverTransaction.home.notFound">No Driver Transactions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driverTransaction }: IRootState) => ({
  driverTransactionList: driverTransaction.entities,
  loading: driverTransaction.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverTransaction);
