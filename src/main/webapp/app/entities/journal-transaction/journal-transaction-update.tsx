import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './journal-transaction.reducer';
import { IJournalTransaction } from 'app/shared/model/journal-transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJournalTransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JournalTransactionUpdate = (props: IJournalTransactionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { journalTransactionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/journal-transaction');
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
        ...journalTransactionEntity,
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
          <h2 id="catchControlPanelApp.journalTransaction.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.journalTransaction.home.createOrEditLabel">
              Create or edit a JournalTransaction
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : journalTransactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="journal-transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="journal-transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="journal-transaction-areaCode">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.areaCode">Area Code</Translate>
                </Label>
                <AvField id="journal-transaction-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="recordNumberLabel" for="journal-transaction-recordNumber">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.recordNumber">Record Number</Translate>
                </Label>
                <AvField id="journal-transaction-recordNumber" type="string" className="form-control" name="recordNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="journal-transaction-driverCode">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="journal-transaction-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="debitLabel" for="journal-transaction-debit">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.debit">Debit</Translate>
                </Label>
                <AvField id="journal-transaction-debit" type="text" name="debit" />
              </AvGroup>
              <AvGroup>
                <Label id="creditLabel" for="journal-transaction-credit">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.credit">Credit</Translate>
                </Label>
                <AvField id="journal-transaction-credit" type="text" name="credit" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionReferenceLabel" for="journal-transaction-transactionReference">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.transactionReference">Transaction Reference</Translate>
                </Label>
                <AvField id="journal-transaction-transactionReference" type="text" name="transactionReference" />
              </AvGroup>
              <AvGroup>
                <Label id="narrationLabel" for="journal-transaction-narration">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.narration">Narration</Translate>
                </Label>
                <AvField id="journal-transaction-narration" type="text" name="narration" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionDateLabel" for="journal-transaction-transactionDate">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.transactionDate">Transaction Date</Translate>
                </Label>
                <AvField id="journal-transaction-transactionDate" type="date" className="form-control" name="transactionDate" />
              </AvGroup>
              <AvGroup>
                <Label id="batchNumberLabel" for="journal-transaction-batchNumber">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.batchNumber">Batch Number</Translate>
                </Label>
                <AvField id="journal-transaction-batchNumber" type="text" name="batchNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionCodeLabel" for="journal-transaction-transactionCode">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.transactionCode">Transaction Code</Translate>
                </Label>
                <AvField id="journal-transaction-transactionCode" type="text" name="transactionCode" />
              </AvGroup>
              <AvGroup>
                <Label id="folioLabel" for="journal-transaction-folio">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.folio">Folio</Translate>
                </Label>
                <AvField id="journal-transaction-folio" type="text" name="folio" />
              </AvGroup>
              <AvGroup>
                <Label id="hashCodeLabel" for="journal-transaction-hashCode">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.hashCode">Hash Code</Translate>
                </Label>
                <AvField id="journal-transaction-hashCode" type="text" name="hashCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="journal-transaction-dateCreated">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="journal-transaction-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="journal-transaction-createdBy">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.createdBy">Created By</Translate>
                </Label>
                <AvField id="journal-transaction-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="journal-transaction-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="journal-transaction-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="journal-transaction-dateModified">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="journal-transaction-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="journal-transaction-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="journal-transaction-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="journal-transaction-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.journalTransaction.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="journal-transaction-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/journal-transaction" replace color="info">
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
  journalTransactionEntity: storeState.journalTransaction.entity,
  loading: storeState.journalTransaction.loading,
  updating: storeState.journalTransaction.updating,
  updateSuccess: storeState.journalTransaction.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JournalTransactionUpdate);
