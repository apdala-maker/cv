import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './time-limits.reducer';
import { ITimeLimits } from 'app/shared/model/time-limits.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITimeLimitsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TimeLimitsUpdate = (props: ITimeLimitsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { timeLimitsEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/time-limits');
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
        ...timeLimitsEntity,
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
          <h2 id="catchControlPanelApp.timeLimits.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.timeLimits.home.createOrEditLabel">Create or edit a TimeLimits</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : timeLimitsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="time-limits-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="time-limits-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="time-limits-areaCode">
                  <Translate contentKey="catchControlPanelApp.timeLimits.areaCode">Area Code</Translate>
                </Label>
                <AvField id="time-limits-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="time-limits-description">
                  <Translate contentKey="catchControlPanelApp.timeLimits.description">Description</Translate>
                </Label>
                <AvField id="time-limits-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="time-limits-code">
                  <Translate contentKey="catchControlPanelApp.timeLimits.code">Code</Translate>
                </Label>
                <AvField id="time-limits-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="time-limits-category">
                  <Translate contentKey="catchControlPanelApp.timeLimits.category">Category</Translate>
                </Label>
                <AvField id="time-limits-category" type="text" name="category" />
              </AvGroup>
              <AvGroup>
                <Label id="startHourLabel" for="time-limits-startHour">
                  <Translate contentKey="catchControlPanelApp.timeLimits.startHour">Start Hour</Translate>
                </Label>
                <AvField id="time-limits-startHour" type="string" className="form-control" name="startHour" />
              </AvGroup>
              <AvGroup>
                <Label id="startMinuteLabel" for="time-limits-startMinute">
                  <Translate contentKey="catchControlPanelApp.timeLimits.startMinute">Start Minute</Translate>
                </Label>
                <AvField id="time-limits-startMinute" type="string" className="form-control" name="startMinute" />
              </AvGroup>
              <AvGroup>
                <Label id="endHourLabel" for="time-limits-endHour">
                  <Translate contentKey="catchControlPanelApp.timeLimits.endHour">End Hour</Translate>
                </Label>
                <AvField id="time-limits-endHour" type="string" className="form-control" name="endHour" />
              </AvGroup>
              <AvGroup>
                <Label id="endMinuteLabel" for="time-limits-endMinute">
                  <Translate contentKey="catchControlPanelApp.timeLimits.endMinute">End Minute</Translate>
                </Label>
                <AvField id="time-limits-endMinute" type="string" className="form-control" name="endMinute" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="time-limits-dateCreated">
                  <Translate contentKey="catchControlPanelApp.timeLimits.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="time-limits-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="time-limits-createdBy">
                  <Translate contentKey="catchControlPanelApp.timeLimits.createdBy">Created By</Translate>
                </Label>
                <AvField id="time-limits-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="time-limits-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.timeLimits.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="time-limits-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="time-limits-dateModified">
                  <Translate contentKey="catchControlPanelApp.timeLimits.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="time-limits-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="time-limits-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.timeLimits.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="time-limits-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="time-limits-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.timeLimits.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="time-limits-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/time-limits" replace color="info">
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
  timeLimitsEntity: storeState.timeLimits.entity,
  loading: storeState.timeLimits.loading,
  updating: storeState.timeLimits.updating,
  updateSuccess: storeState.timeLimits.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TimeLimitsUpdate);
