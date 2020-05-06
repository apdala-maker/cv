import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './transaction-charge.reducer';
import { ITransactionCharge } from 'app/shared/model/transaction-charge.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionChargeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionChargeUpdate = (props: ITransactionChargeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionChargeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transaction-charge');
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
        ...transactionChargeEntity,
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
          <h2 id="catchControlPanelApp.transactionCharge.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.transactionCharge.home.createOrEditLabel">
              Create or edit a TransactionCharge
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionChargeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transaction-charge-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transaction-charge-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="transaction-charge-areaCode">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.areaCode">Area Code</Translate>
                </Label>
                <AvField id="transaction-charge-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="transaction-charge-code">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.code">Code</Translate>
                </Label>
                <AvField id="transaction-charge-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="transaction-charge-category">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.category">Category</Translate>
                </Label>
                <AvInput
                  id="transaction-charge-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && transactionChargeEntity.category) || 'TRIP'}
                >
                  <option value="TRIP">{translate('catchControlPanelApp.Category.TRIP')}</option>
                  <option value="CHARGE">{translate('catchControlPanelApp.Category.CHARGE')}</option>
                  <option value="WAITING_CHARGE">{translate('catchControlPanelApp.Category.WAITING_CHARGE')}</option>
                  <option value="CANCELLATION_CHARGE">{translate('catchControlPanelApp.Category.CANCELLATION_CHARGE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="transaction-charge-description">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.description">Description</Translate>
                </Label>
                <AvField id="transaction-charge-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="timeLimitCodeLabel" for="transaction-charge-timeLimitCode">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.timeLimitCode">Time Limit Code</Translate>
                </Label>
                <AvField id="transaction-charge-timeLimitCode" type="text" name="timeLimitCode" />
              </AvGroup>
              <AvGroup>
                <Label id="constantChargeLabel" for="transaction-charge-constantCharge">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.constantCharge">Constant Charge</Translate>
                </Label>
                <AvField id="transaction-charge-constantCharge" type="text" name="constantCharge" />
              </AvGroup>
              <AvGroup>
                <Label id="chargePerKilometerLabel" for="transaction-charge-chargePerKilometer">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.chargePerKilometer">Charge Per Kilometer</Translate>
                </Label>
                <AvField id="transaction-charge-chargePerKilometer" type="text" name="chargePerKilometer" />
              </AvGroup>
              <AvGroup>
                <Label id="chargePerMinuteLabel" for="transaction-charge-chargePerMinute">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.chargePerMinute">Charge Per Minute</Translate>
                </Label>
                <AvField id="transaction-charge-chargePerMinute" type="text" name="chargePerMinute" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="transaction-charge-status">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.status">Status</Translate>
                </Label>
                <AvField id="transaction-charge-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleCodeLabel" for="transaction-charge-vehicleCode">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.vehicleCode">Vehicle Code</Translate>
                </Label>
                <AvField id="transaction-charge-vehicleCode" type="text" name="vehicleCode" />
              </AvGroup>
              <AvGroup>
                <Label id="totalMinimumChargeLabel" for="transaction-charge-totalMinimumCharge">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.totalMinimumCharge">Total Minimum Charge</Translate>
                </Label>
                <AvField id="transaction-charge-totalMinimumCharge" type="text" name="totalMinimumCharge" />
              </AvGroup>
              <AvGroup>
                <Label id="totalMaximumChargeLabel" for="transaction-charge-totalMaximumCharge">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.totalMaximumCharge">Total Maximum Charge</Translate>
                </Label>
                <AvField id="transaction-charge-totalMaximumCharge" type="text" name="totalMaximumCharge" />
              </AvGroup>
              <AvGroup>
                <Label id="minimumSpeedLabel" for="transaction-charge-minimumSpeed">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.minimumSpeed">Minimum Speed</Translate>
                </Label>
                <AvField id="transaction-charge-minimumSpeed" type="text" name="minimumSpeed" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="transaction-charge-dateCreated">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="transaction-charge-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="transaction-charge-createdBy">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.createdBy">Created By</Translate>
                </Label>
                <AvField id="transaction-charge-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="transaction-charge-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="transaction-charge-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="transaction-charge-dateModified">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="transaction-charge-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="transaction-charge-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="transaction-charge-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="transaction-charge-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.transactionCharge.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="transaction-charge-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transaction-charge" replace color="info">
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
  transactionChargeEntity: storeState.transactionCharge.entity,
  loading: storeState.transactionCharge.loading,
  updating: storeState.transactionCharge.updating,
  updateSuccess: storeState.transactionCharge.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionChargeUpdate);
