import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './journal-transaction.reducer';
import { IJournalTransaction } from 'app/shared/model/journal-transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJournalTransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JournalTransactionDetail = (props: IJournalTransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { journalTransactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.journalTransaction.detail.title">JournalTransaction</Translate> [
          <b>{journalTransactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.journalTransaction.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.areaCode}</dd>
          <dt>
            <span id="recordNumber">
              <Translate contentKey="catchControlPanelApp.journalTransaction.recordNumber">Record Number</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.recordNumber}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.journalTransaction.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.driverCode}</dd>
          <dt>
            <span id="debit">
              <Translate contentKey="catchControlPanelApp.journalTransaction.debit">Debit</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.debit}</dd>
          <dt>
            <span id="credit">
              <Translate contentKey="catchControlPanelApp.journalTransaction.credit">Credit</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.credit}</dd>
          <dt>
            <span id="transactionReference">
              <Translate contentKey="catchControlPanelApp.journalTransaction.transactionReference">Transaction Reference</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.transactionReference}</dd>
          <dt>
            <span id="narration">
              <Translate contentKey="catchControlPanelApp.journalTransaction.narration">Narration</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.narration}</dd>
          <dt>
            <span id="transactionDate">
              <Translate contentKey="catchControlPanelApp.journalTransaction.transactionDate">Transaction Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={journalTransactionEntity.transactionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="batchNumber">
              <Translate contentKey="catchControlPanelApp.journalTransaction.batchNumber">Batch Number</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.batchNumber}</dd>
          <dt>
            <span id="transactionCode">
              <Translate contentKey="catchControlPanelApp.journalTransaction.transactionCode">Transaction Code</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.transactionCode}</dd>
          <dt>
            <span id="folio">
              <Translate contentKey="catchControlPanelApp.journalTransaction.folio">Folio</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.folio}</dd>
          <dt>
            <span id="hashCode">
              <Translate contentKey="catchControlPanelApp.journalTransaction.hashCode">Hash Code</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.hashCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.journalTransaction.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={journalTransactionEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.journalTransaction.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.journalTransaction.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.journalTransaction.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={journalTransactionEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.journalTransaction.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.journalTransaction.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{journalTransactionEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/journal-transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/journal-transaction/${journalTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ journalTransaction }: IRootState) => ({
  journalTransactionEntity: journalTransaction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JournalTransactionDetail);
