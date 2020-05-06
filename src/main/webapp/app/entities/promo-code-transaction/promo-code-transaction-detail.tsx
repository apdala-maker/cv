import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './promo-code-transaction.reducer';
import { IPromoCodeTransaction } from 'app/shared/model/promo-code-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPromoCodeTransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PromoCodeTransactionDetail = (props: IPromoCodeTransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { promoCodeTransactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.promoCodeTransaction.detail.title">PromoCodeTransaction</Translate> [
          <b>{promoCodeTransactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.code">Code</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.code}</dd>
          <dt>
            <span id="recordNumber">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.recordNumber">Record Number</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.recordNumber}</dd>
          <dt>
            <span id="customerCode">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.customerCode">Customer Code</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.customerCode}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.driverCode}</dd>
          <dt>
            <span id="debit">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.debit">Debit</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.debit}</dd>
          <dt>
            <span id="credit">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.credit">Credit</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.credit}</dd>
          <dt>
            <span id="narration">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.narration">Narration</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.narration}</dd>
          <dt>
            <span id="transactionReference">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.transactionReference">Transaction Reference</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.transactionReference}</dd>
          <dt>
            <span id="transactionCode">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.transactionCode">Transaction Code</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.transactionCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={promoCodeTransactionEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={promoCodeTransactionEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.promoCodeTransaction.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{promoCodeTransactionEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/promo-code-transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/promo-code-transaction/${promoCodeTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ promoCodeTransaction }: IRootState) => ({
  promoCodeTransactionEntity: promoCodeTransaction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodeTransactionDetail);
