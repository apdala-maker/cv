import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sms-model.reducer';
import { ISmsModel } from 'app/shared/model/sms-model.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISmsModelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SmsModelUpdate = (props: ISmsModelUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { smsModelEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sms-model');
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
        ...smsModelEntity,
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
          <h2 id="catchControlPanelApp.smsModel.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.smsModel.home.createOrEditLabel">Create or edit a SmsModel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : smsModelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sms-model-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="sms-model-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="phoneNumberLabel" for="sms-model-phoneNumber">
                  <Translate contentKey="catchControlPanelApp.smsModel.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="sms-model-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="messageLabel" for="sms-model-message">
                  <Translate contentKey="catchControlPanelApp.smsModel.message">Message</Translate>
                </Label>
                <AvField id="sms-model-message" type="text" name="message" />
              </AvGroup>
              <AvGroup check>
                <Label id="isSendLabel">
                  <AvInput id="sms-model-isSend" type="checkbox" className="form-check-input" name="isSend" />
                  <Translate contentKey="catchControlPanelApp.smsModel.isSend">Is Send</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="sms-model-dateCreated">
                  <Translate contentKey="catchControlPanelApp.smsModel.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="sms-model-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="sms-model-createdBy">
                  <Translate contentKey="catchControlPanelApp.smsModel.createdBy">Created By</Translate>
                </Label>
                <AvField id="sms-model-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="sms-model-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.smsModel.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="sms-model-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="sms-model-dateModified">
                  <Translate contentKey="catchControlPanelApp.smsModel.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="sms-model-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="sms-model-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.smsModel.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="sms-model-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="sms-model-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.smsModel.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="sms-model-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/sms-model" replace color="info">
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
  smsModelEntity: storeState.smsModel.entity,
  loading: storeState.smsModel.loading,
  updating: storeState.smsModel.updating,
  updateSuccess: storeState.smsModel.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SmsModelUpdate);
