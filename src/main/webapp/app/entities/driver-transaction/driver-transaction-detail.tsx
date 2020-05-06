import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver-transaction.reducer';
import { IDriverTransaction } from 'app/shared/model/driver-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverTransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverTransactionDetail = (props: IDriverTransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverTransactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.driverTransaction.detail.title">DriverTransaction</Translate> [
          <b>{driverTransactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.driverTransaction.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.areaCode}</dd>
          <dt>
            <span id="recordNumber">
              <Translate contentKey="catchControlPanelApp.driverTransaction.recordNumber">Record Number</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.recordNumber}</dd>
          <dt>
            <span id="customerCode">
              <Translate contentKey="catchControlPanelApp.driverTransaction.customerCode">Customer Code</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.customerCode}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.driverTransaction.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.driverCode}</dd>
          <dt>
            <span id="debit">
              <Translate contentKey="catchControlPanelApp.driverTransaction.debit">Debit</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.debit}</dd>
          <dt>
            <span id="credit">
              <Translate contentKey="catchControlPanelApp.driverTransaction.credit">Credit</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.credit}</dd>
          <dt>
            <span id="narration">
              <Translate contentKey="catchControlPanelApp.driverTransaction.narration">Narration</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.narration}</dd>
          <dt>
            <span id="transactionReference">
              <Translate contentKey="catchControlPanelApp.driverTransaction.transactionReference">Transaction Reference</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.transactionReference}</dd>
          <dt>
            <span id="transactionCode">
              <Translate contentKey="catchControlPanelApp.driverTransaction.transactionCode">Transaction Code</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.transactionCode}</dd>
          <dt>
            <span id="paymentChannel">
              <Translate contentKey="catchControlPanelApp.driverTransaction.paymentChannel">Payment Channel</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.paymentChannel}</dd>
          <dt>
            <span id="isReversed">
              <Translate contentKey="catchControlPanelApp.driverTransaction.isReversed">Is Reversed</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.isReversed}</dd>
          <dt>
            <span id="hashCode">
              <Translate contentKey="catchControlPanelApp.driverTransaction.hashCode">Hash Code</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.hashCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.driverTransaction.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverTransactionEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.driverTransaction.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.driverTransaction.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.driverTransaction.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverTransactionEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.driverTransaction.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.driverTransaction.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{driverTransactionEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/driver-transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver-transaction/${driverTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driverTransaction }: IRootState) => ({
  driverTransactionEntity: driverTransaction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverTransactionDetail);
