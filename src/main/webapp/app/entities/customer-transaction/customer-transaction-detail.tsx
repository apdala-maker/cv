import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-transaction.reducer';
import { ICustomerTransaction } from 'app/shared/model/customer-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerTransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerTransactionDetail = (props: ICustomerTransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerTransactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.customerTransaction.detail.title">CustomerTransaction</Translate> [
          <b>{customerTransactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.customerTransaction.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.areaCode}</dd>
          <dt>
            <span id="recordNumber">
              <Translate contentKey="catchControlPanelApp.customerTransaction.recordNumber">Record Number</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.recordNumber}</dd>
          <dt>
            <span id="customerCode">
              <Translate contentKey="catchControlPanelApp.customerTransaction.customerCode">Customer Code</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.customerCode}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.customerTransaction.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.driverCode}</dd>
          <dt>
            <span id="debit">
              <Translate contentKey="catchControlPanelApp.customerTransaction.debit">Debit</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.debit}</dd>
          <dt>
            <span id="credit">
              <Translate contentKey="catchControlPanelApp.customerTransaction.credit">Credit</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.credit}</dd>
          <dt>
            <span id="narration">
              <Translate contentKey="catchControlPanelApp.customerTransaction.narration">Narration</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.narration}</dd>
          <dt>
            <span id="transactionReference">
              <Translate contentKey="catchControlPanelApp.customerTransaction.transactionReference">Transaction Reference</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.transactionReference}</dd>
          <dt>
            <span id="transactionCode">
              <Translate contentKey="catchControlPanelApp.customerTransaction.transactionCode">Transaction Code</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.transactionCode}</dd>
          <dt>
            <span id="paymentChannel">
              <Translate contentKey="catchControlPanelApp.customerTransaction.paymentChannel">Payment Channel</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.paymentChannel}</dd>
          <dt>
            <span id="isReversed">
              <Translate contentKey="catchControlPanelApp.customerTransaction.isReversed">Is Reversed</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.isReversed}</dd>
          <dt>
            <span id="hashCode">
              <Translate contentKey="catchControlPanelApp.customerTransaction.hashCode">Hash Code</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.hashCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.customerTransaction.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={customerTransactionEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.customerTransaction.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.customerTransaction.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.customerTransaction.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={customerTransactionEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.customerTransaction.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.customerTransaction.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{customerTransactionEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/customer-transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-transaction/${customerTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customerTransaction }: IRootState) => ({
  customerTransactionEntity: customerTransaction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTransactionDetail);
