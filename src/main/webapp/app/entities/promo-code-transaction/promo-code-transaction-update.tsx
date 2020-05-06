import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './promo-code-transaction.reducer';
import { IPromoCodeTransaction } from 'app/shared/model/promo-code-transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPromoCodeTransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PromoCodeTransactionUpdate = (props: IPromoCodeTransactionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { promoCodeTransactionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/promo-code-transaction');
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
        ...promoCodeTransactionEntity,
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
          <h2 id="catchControlPanelApp.promoCodeTransaction.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.promoCodeTransaction.home.createOrEditLabel">
              Create or edit a PromoCodeTransaction
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : promoCodeTransactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="promo-code-transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="promo-code-transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="promo-code-transaction-code">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.code">Code</Translate>
                </Label>
                <AvField id="promo-code-transaction-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="recordNumberLabel" for="promo-code-transaction-recordNumber">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.recordNumber">Record Number</Translate>
                </Label>
                <AvField id="promo-code-transaction-recordNumber" type="string" className="form-control" name="recordNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="customerCodeLabel" for="promo-code-transaction-customerCode">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.customerCode">Customer Code</Translate>
                </Label>
                <AvField id="promo-code-transaction-customerCode" type="text" name="customerCode" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="promo-code-transaction-driverCode">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="promo-code-transaction-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="debitLabel" for="promo-code-transaction-debit">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.debit">Debit</Translate>
                </Label>
                <AvField id="promo-code-transaction-debit" type="text" name="debit" />
              </AvGroup>
              <AvGroup>
                <Label id="creditLabel" for="promo-code-transaction-credit">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.credit">Credit</Translate>
                </Label>
                <AvField id="promo-code-transaction-credit" type="text" name="credit" />
              </AvGroup>
              <AvGroup>
                <Label id="narrationLabel" for="promo-code-transaction-narration">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.narration">Narration</Translate>
                </Label>
                <AvField id="promo-code-transaction-narration" type="text" name="narration" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionReferenceLabel" for="promo-code-transaction-transactionReference">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.transactionReference">Transaction Reference</Translate>
                </Label>
                <AvField id="promo-code-transaction-transactionReference" type="text" name="transactionReference" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionCodeLabel" for="promo-code-transaction-transactionCode">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.transactionCode">Transaction Code</Translate>
                </Label>
                <AvField id="promo-code-transaction-transactionCode" type="text" name="transactionCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="promo-code-transaction-dateCreated">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="promo-code-transaction-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="promo-code-transaction-createdBy">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.createdBy">Created By</Translate>
                </Label>
                <AvField id="promo-code-transaction-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="promo-code-transaction-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="promo-code-transaction-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="promo-code-transaction-dateModified">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="promo-code-transaction-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="promo-code-transaction-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="promo-code-transaction-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="promo-code-transaction-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.promoCodeTransaction.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="promo-code-transaction-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/promo-code-transaction" replace color="info">
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
  promoCodeTransactionEntity: storeState.promoCodeTransaction.entity,
  loading: storeState.promoCodeTransaction.loading,
  updating: storeState.promoCodeTransaction.updating,
  updateSuccess: storeState.promoCodeTransaction.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodeTransactionUpdate);
