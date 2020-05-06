import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './driver-transaction.reducer';
import { IDriverTransaction } from 'app/shared/model/driver-transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverTransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverTransactionUpdate = (props: IDriverTransactionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { driverTransactionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/driver-transaction');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...driverTransactionEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="catchControlPanelApp.driverTransaction.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.driverTransaction.home.createOrEditLabel">
              Create or edit a DriverTransaction
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driverTransactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="driver-transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="driver-transaction-areaCode">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.areaCode">Area Code</Translate>
                </Label>
                <AvField id="driver-transaction-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="recordNumberLabel" for="driver-transaction-recordNumber">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.recordNumber">Record Number</Translate>
                </Label>
                <AvField id="driver-transaction-recordNumber" type="string" className="form-control" name="recordNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="customerCodeLabel" for="driver-transaction-customerCode">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.customerCode">Customer Code</Translate>
                </Label>
                <AvField id="driver-transaction-customerCode" type="text" name="customerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="driver-transaction-driverCode">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="driver-transaction-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="debitLabel" for="driver-transaction-debit">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.debit">Debit</Translate>
                </Label>
                <AvField id="driver-transaction-debit" type="text" name="debit" />
              </AvGroup>
              <AvGroup>
                <Label id="creditLabel" for="driver-transaction-credit">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.credit">Credit</Translate>
                </Label>
                <AvField id="driver-transaction-credit" type="text" name="credit" />
              </AvGroup>
              <AvGroup>
                <Label id="narrationLabel" for="driver-transaction-narration">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.narration">Narration</Translate>
                </Label>
                <AvField id="driver-transaction-narration" type="text" name="narration" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionReferenceLabel" for="driver-transaction-transactionReference">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.transactionReference">Transaction Reference</Translate>
                </Label>
                <AvField id="driver-transaction-transactionReference" type="text" name="transactionReference" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionCodeLabel" for="driver-transaction-transactionCode">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.transactionCode">Transaction Code</Translate>
                </Label>
                <AvField id="driver-transaction-transactionCode" type="text" name="transactionCode" />
              </AvGroup>
              <AvGroup>
                <Label id="paymentChannelLabel" for="driver-transaction-paymentChannel">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.paymentChannel">Payment Channel</Translate>
                </Label>
                <AvInput
                  id="driver-transaction-paymentChannel"
                  type="select"
                  className="form-control"
                  name="paymentChannel"
                  value={(!isNew && driverTransactionEntity.paymentChannel) || 'CASH'}
                >
                  <option value="CASH">{translate('catchControlPanelApp.PaymentChannel.CASH')}</option>
                  <option value="MOBILE_MONEY">{translate('catchControlPanelApp.PaymentChannel.MOBILE_MONEY')}</option>
                  <option value="CARD">{translate('catchControlPanelApp.PaymentChannel.CARD')}</option>
                  <option value="WALLET">{translate('catchControlPanelApp.PaymentChannel.WALLET')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="isReversedLabel" for="driver-transaction-isReversed">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.isReversed">Is Reversed</Translate>
                </Label>
                <AvField id="driver-transaction-isReversed" type="text" name="isReversed" />
              </AvGroup>
              <AvGroup>
                <Label id="hashCodeLabel" for="driver-transaction-hashCode">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.hashCode">Hash Code</Translate>
                </Label>
                <AvField id="driver-transaction-hashCode" type="text" name="hashCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="driver-transaction-dateCreated">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="driver-transaction-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="driver-transaction-createdBy">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.createdBy">Created By</Translate>
                </Label>
                <AvField id="driver-transaction-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="driver-transaction-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="driver-transaction-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="driver-transaction-dateModified">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="driver-transaction-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="driver-transaction-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="driver-transaction-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="driver-transaction-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.driverTransaction.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="driver-transaction-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/driver-transaction" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  driverTransactionEntity: storeState.driverTransaction.entity,
  loading: storeState.driverTransaction.loading,
  updating: storeState.driverTransaction.updating,
  updateSuccess: storeState.driverTransaction.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverTransactionUpdate);
