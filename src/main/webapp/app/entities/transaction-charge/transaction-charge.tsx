import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transaction-charge.reducer';
import { ITransactionCharge } from 'app/shared/model/transaction-charge.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionChargeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TransactionCharge = (props: ITransactionChargeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { transactionChargeList, match, loading } = props;
  return (
    <div>
      <h2 id="transaction-charge-heading">
        <Translate contentKey="catchControlPanelApp.transactionCharge.home.title">Transaction Charges</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.transactionCharge.home.createLabel">Create new Transaction Charge</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {transactionChargeList && transactionChargeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.timeLimitCode">Time Limit Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.constantCharge">Constant Charge</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.chargePerKilometer">Charge Per Kilometer</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.chargePerMinute">Charge Per Minute</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.vehicleCode">Vehicle Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.totalMinimumCharge">Total Minimum Charge</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.totalMaximumCharge">Total Maximum Charge</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.minimumSpeed">Minimum Speed</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionCharge.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactionChargeList.map((transactionCharge, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${transactionCharge.id}`} color="link" size="sm">
                      {transactionCharge.id}
                    </Button>
                  </td>
                  <td>{transactionCharge.areaCode}</td>
                  <td>{transactionCharge.code}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.Category.${transactionCharge.category}`} />
                  </td>
                  <td>{transactionCharge.description}</td>
                  <td>{transactionCharge.timeLimitCode}</td>
                  <td>{transactionCharge.constantCharge}</td>
                  <td>{transactionCharge.chargePerKilometer}</td>
                  <td>{transactionCharge.chargePerMinute}</td>
                  <td>{transactionCharge.status}</td>
                  <td>{transactionCharge.vehicleCode}</td>
                  <td>{transactionCharge.totalMinimumCharge}</td>
                  <td>{transactionCharge.totalMaximumCharge}</td>
                  <td>{transactionCharge.minimumSpeed}</td>
                  <td>
                    <TextFormat type="date" value={transactionCharge.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{transactionCharge.createdBy}</td>
                  <td>{transactionCharge.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={transactionCharge.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{transactionCharge.modifiedBy}</td>
                  <td>{transactionCharge.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${transactionCharge.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transactionCharge.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transactionCharge.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.transactionCharge.home.notFound">No Transaction Charges found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ transactionCharge }: IRootState) => ({
  transactionChargeList: transactionCharge.entities,
  loading: transactionCharge.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCharge);
