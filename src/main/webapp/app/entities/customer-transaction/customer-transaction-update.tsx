import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer-transaction.reducer';
import { ICustomerTransaction } from 'app/shared/model/customer-transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerTransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerTransactionUpdate = (props: ICustomerTransactionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerTransactionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer-transaction');
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
        ...customerTransactionEntity,
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
          <h2 id="catchControlPanelApp.customerTransaction.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.customerTransaction.home.createOrEditLabel">
              Create or edit a CustomerTransaction
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerTransactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="customer-transaction-areaCode">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.areaCode">Area Code</Translate>
                </Label>
                <AvField id="customer-transaction-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="recordNumberLabel" for="customer-transaction-recordNumber">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.recordNumber">Record Number</Translate>
                </Label>
                <AvField id="customer-transaction-recordNumber" type="string" className="form-control" name="recordNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="customerCodeLabel" for="customer-transaction-customerCode">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.customerCode">Customer Code</Translate>
                </Label>
                <AvField id="customer-transaction-customerCode" type="text" name="customerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="customer-transaction-driverCode">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="customer-transaction-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="debitLabel" for="customer-transaction-debit">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.debit">Debit</Translate>
                </Label>
                <AvField id="customer-transaction-debit" type="text" name="debit" />
              </AvGroup>
              <AvGroup>
                <Label id="creditLabel" for="customer-transaction-credit">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.credit">Credit</Translate>
                </Label>
                <AvField id="customer-transaction-credit" type="text" name="credit" />
              </AvGroup>
              <AvGroup>
                <Label id="narrationLabel" for="customer-transaction-narration">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.narration">Narration</Translate>
                </Label>
                <AvField id="customer-transaction-narration" type="text" name="narration" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionReferenceLabel" for="customer-transaction-transactionReference">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.transactionReference">Transaction Reference</Translate>
                </Label>
                <AvField id="customer-transaction-transactionReference" type="text" name="transactionReference" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionCodeLabel" for="customer-transaction-transactionCode">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.transactionCode">Transaction Code</Translate>
                </Label>
                <AvField id="customer-transaction-transactionCode" type="text" name="transactionCode" />
              </AvGroup>
              <AvGroup>
                <Label id="paymentChannelLabel" for="customer-transaction-paymentChannel">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.paymentChannel">Payment Channel</Translate>
                </Label>
                <AvInput
                  id="customer-transaction-paymentChannel"
                  type="select"
                  className="form-control"
                  name="paymentChannel"
                  value={(!isNew && customerTransactionEntity.paymentChannel) || 'CASH'}
                >
                  <option value="CASH">{translate('catchControlPanelApp.PaymentChannel.CASH')}</option>
                  <option value="MOBILE_MONEY">{translate('catchControlPanelApp.PaymentChannel.MOBILE_MONEY')}</option>
                  <option value="CARD">{translate('catchControlPanelApp.PaymentChannel.CARD')}</option>
                  <option value="WALLET">{translate('catchControlPanelApp.PaymentChannel.WALLET')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="isReversedLabel" for="customer-transaction-isReversed">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.isReversed">Is Reversed</Translate>
                </Label>
                <AvField id="customer-transaction-isReversed" type="text" name="isReversed" />
              </AvGroup>
              <AvGroup>
                <Label id="hashCodeLabel" for="customer-transaction-hashCode">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.hashCode">Hash Code</Translate>
                </Label>
                <AvField id="customer-transaction-hashCode" type="text" name="hashCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="customer-transaction-dateCreated">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="customer-transaction-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="customer-transaction-createdBy">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.createdBy">Created By</Translate>
                </Label>
                <AvField id="customer-transaction-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="customer-transaction-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="customer-transaction-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="customer-transaction-dateModified">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="customer-transaction-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="customer-transaction-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="customer-transaction-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="customer-transaction-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.customerTransaction.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="customer-transaction-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer-transaction" replace color="info">
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
  customerTransactionEntity: storeState.customerTransaction.entity,
  loading: storeState.customerTransaction.loading,
  updating: storeState.customerTransaction.updating,
  updateSuccess: storeState.customerTransaction.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTransactionUpdate);
