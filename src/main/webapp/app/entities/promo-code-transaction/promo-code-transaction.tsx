import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './promo-code-transaction.reducer';
import { IPromoCodeTransaction } from 'app/shared/model/promo-code-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPromoCodeTransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PromoCodeTransaction = (props: IPromoCodeTransactionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { promoCodeTransactionList, match, loading } = props;
  return (
    <div>
      <h2 id="promo-code-transaction-heading">
        <Translate contentKey="catchControlPanelApp.promoCodeTransaction.home.title">Promo Code Transactions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.promoCodeTransaction.home.createLabel">Create new Promo Code Transaction</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {promoCodeTransactionList && promoCodeTransactionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.recordNumber">Record Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.customerCode">Customer Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.driverCode">Driver Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.debit">Debit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.credit">Credit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.narration">Narration</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.transactionReference">Transaction Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.transactionCode">Transaction Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {promoCodeTransactionList.map((promoCodeTransaction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${promoCodeTransaction.id}`} color="link" size="sm">
                      {promoCodeTransaction.id}
                    </Button>
                  </td>
                  <td>{promoCodeTransaction.code}</td>
                  <td>{promoCodeTransaction.recordNumber}</td>
                  <td>{promoCodeTransaction.customerCode}</td>
                  <td>{promoCodeTransaction.driverCode}</td>
                  <td>{promoCodeTransaction.debit}</td>
                  <td>{promoCodeTransaction.credit}</td>
                  <td>{promoCodeTransaction.narration}</td>
                  <td>{promoCodeTransaction.transactionReference}</td>
                  <td>{promoCodeTransaction.transactionCode}</td>
                  <td>
                    <TextFormat type="date" value={promoCodeTransaction.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{promoCodeTransaction.createdBy}</td>
                  <td>{promoCodeTransaction.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={promoCodeTransaction.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{promoCodeTransaction.modifiedBy}</td>
                  <td>{promoCodeTransaction.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${promoCodeTransaction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${promoCodeTransaction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${promoCodeTransaction.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.home.notFound">No Promo Code Transactions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ promoCodeTransaction }: IRootState) => ({
  promoCodeTransactionList: promoCodeTransaction.entities,
  loading: promoCodeTransaction.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodeTransaction);
