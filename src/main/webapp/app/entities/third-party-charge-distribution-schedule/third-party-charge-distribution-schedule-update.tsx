import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './third-party-charge-distribution-schedule.reducer';
import { IThirdPartyChargeDistributionSchedule } from 'app/shared/model/third-party-charge-distribution-schedule.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThirdPartyChargeDistributionScheduleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThirdPartyChargeDistributionScheduleUpdate = (props: IThirdPartyChargeDistributionScheduleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { thirdPartyChargeDistributionScheduleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/third-party-charge-distribution-schedule');
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
        ...thirdPartyChargeDistributionScheduleEntity,
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
          <h2 id="catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.createOrEditLabel">
              Create or edit a ThirdPartyChargeDistributionSchedule
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : thirdPartyChargeDistributionScheduleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="third-party-charge-distribution-schedule-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput
                    id="third-party-charge-distribution-schedule-id"
                    type="text"
                    className="form-control"
                    name="id"
                    required
                    readOnly
                  />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="third-party-charge-distribution-schedule-code">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.code">Code</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="partyCodeLabel" for="third-party-charge-distribution-schedule-partyCode">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.partyCode">Party Code</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-partyCode" type="text" name="partyCode" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionCodeLabel" for="third-party-charge-distribution-schedule-transactionCode">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.transactionCode">
                    Transaction Code
                  </Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-transactionCode" type="text" name="transactionCode" />
              </AvGroup>
              <AvGroup>
                <Label id="chargeModeLabel" for="third-party-charge-distribution-schedule-chargeMode">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.chargeMode">Charge Mode</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-chargeMode" type="text" name="chargeMode" />
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="third-party-charge-distribution-schedule-value">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.value">Value</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="third-party-charge-distribution-schedule-status">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.status">Status</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="third-party-charge-distribution-schedule-areaCode">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.areaCode">Area Code</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="third-party-charge-distribution-schedule-dateCreated">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.dateCreated">Date Created</Translate>
                </Label>
                <AvField
                  id="third-party-charge-distribution-schedule-dateCreated"
                  type="date"
                  className="form-control"
                  name="dateCreated"
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="third-party-charge-distribution-schedule-createdBy">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.createdBy">Created By</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="third-party-charge-distribution-schedule-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.creatorUserEmail">
                    Creator User Email
                  </Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="third-party-charge-distribution-schedule-dateModified">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.dateModified">Date Modified</Translate>
                </Label>
                <AvField
                  id="third-party-charge-distribution-schedule-dateModified"
                  type="date"
                  className="form-control"
                  name="dateModified"
                />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="third-party-charge-distribution-schedule-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="third-party-charge-distribution-schedule-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.modifierUserEmail">
                    Modifier User Email
                  </Translate>
                </Label>
                <AvField id="third-party-charge-distribution-schedule-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/third-party-charge-distribution-schedule" replace color="info">
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
  thirdPartyChargeDistributionScheduleEntity: storeState.thirdPartyChargeDistributionSchedule.entity,
  loading: storeState.thirdPartyChargeDistributionSchedule.loading,
  updating: storeState.thirdPartyChargeDistributionSchedule.updating,
  updateSuccess: storeState.thirdPartyChargeDistributionSchedule.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyChargeDistributionScheduleUpdate);
