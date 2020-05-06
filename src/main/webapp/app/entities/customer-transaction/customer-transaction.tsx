import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer-transaction.reducer';
import { ICustomerTransaction } from 'app/shared/model/customer-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerTransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CustomerTransaction = (props: ICustomerTransactionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { customerTransactionList, match, loading } = props;
  return (
    <div>
      <h2 id="customer-transaction-heading">
        <Translate contentKey="catchControlPanelApp.customerTransaction.home.title">Customer Transactions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.customerTransaction.home.createLabel">Create new Customer Transaction</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {customerTransactionList && customerTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.recordNumber">Record Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.customerCode">Customer Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.debit">Debit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.credit">Credit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.narration">Narration</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.transactionReference">Transaction Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.transactionCode">Transaction Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.paymentChannel">Payment Channel</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.isReversed">Is Reversed</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.hashCode">Hash Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.customerTransaction.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerTransactionList.map((customerTransaction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customerTransaction.id}`} color="link" size="sm">
                      {customerTransaction.id}
                    </Button>
                  </td>
                  <td>{customerTransaction.areaCode}</td>
                  <td>{customerTransaction.recordNumber}</td>
                  <td>{customerTransaction.customerCode}</td>
                  <td>{customerTransaction.driverCode}</td>
                  <td>{customerTransaction.debit}</td>
                  <td>{customerTransaction.credit}</td>
                  <td>{customerTransaction.narration}</td>
                  <td>{customerTransaction.transactionReference}</td>
                  <td>{customerTransaction.transactionCode}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.PaymentChannel.${customerTransaction.paymentChannel}`} />
                  </td>
                  <td>{customerTransaction.isReversed}</td>
                  <td>{customerTransaction.hashCode}</td>
                  <td>
                    <TextFormat type="date" value={customerTransaction.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{customerTransaction.createdBy}</td>
                  <td>{customerTransaction.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={customerTransaction.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{customerTransaction.modifiedBy}</td>
                  <td>{customerTransaction.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customerTransaction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerTransaction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerTransaction.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.customerTransaction.home.notFound">No Customer Transactions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customerTransaction }: IRootState) => ({
  customerTransactionList: customerTransaction.entities,
  loading: customerTransaction.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTransaction);
