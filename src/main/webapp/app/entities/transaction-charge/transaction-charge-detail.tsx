import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transaction-charge.reducer';
import { ITransactionCharge } from 'app/shared/model/transaction-charge.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionChargeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionChargeDetail = (props: ITransactionChargeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionChargeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.transactionCharge.detail.title">TransactionCharge</Translate> [
          <b>{transactionChargeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.transactionCharge.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.areaCode}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.transactionCharge.code">Code</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.code}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="catchControlPanelApp.transactionCharge.category">Category</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.category}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.transactionCharge.description">Description</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.description}</dd>
          <dt>
            <span id="timeLimitCode">
              <Translate contentKey="catchControlPanelApp.transactionCharge.timeLimitCode">Time Limit Code</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.timeLimitCode}</dd>
          <dt>
            <span id="constantCharge">
              <Translate contentKey="catchControlPanelApp.transactionCharge.constantCharge">Constant Charge</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.constantCharge}</dd>
          <dt>
            <span id="chargePerKilometer">
              <Translate contentKey="catchControlPanelApp.transactionCharge.chargePerKilometer">Charge Per Kilometer</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.chargePerKilometer}</dd>
          <dt>
            <span id="chargePerMinute">
              <Translate contentKey="catchControlPanelApp.transactionCharge.chargePerMinute">Charge Per Minute</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.chargePerMinute}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.transactionCharge.status">Status</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.status}</dd>
          <dt>
            <span id="vehicleCode">
              <Translate contentKey="catchControlPanelApp.transactionCharge.vehicleCode">Vehicle Code</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.vehicleCode}</dd>
          <dt>
            <span id="totalMinimumCharge">
              <Translate contentKey="catchControlPanelApp.transactionCharge.totalMinimumCharge">Total Minimum Charge</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.totalMinimumCharge}</dd>
          <dt>
            <span id="totalMaximumCharge">
              <Translate contentKey="catchControlPanelApp.transactionCharge.totalMaximumCharge">Total Maximum Charge</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.totalMaximumCharge}</dd>
          <dt>
            <span id="minimumSpeed">
              <Translate contentKey="catchControlPanelApp.transactionCharge.minimumSpeed">Minimum Speed</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.minimumSpeed}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.transactionCharge.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transactionChargeEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.transactionCharge.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.transactionCharge.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.transactionCharge.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transactionChargeEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.transactionCharge.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.transactionCharge.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{transactionChargeEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/transaction-charge" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transaction-charge/${transactionChargeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transactionCharge }: IRootState) => ({
  transactionChargeEntity: transactionCharge.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionChargeDetail);
