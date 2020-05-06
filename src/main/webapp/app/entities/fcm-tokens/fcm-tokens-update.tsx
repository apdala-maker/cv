import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './fcm-tokens.reducer';
import { IFcmTokens } from 'app/shared/model/fcm-tokens.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFcmTokensUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FcmTokensUpdate = (props: IFcmTokensUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fcmTokensEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/fcm-tokens');
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
        ...fcmTokensEntity,
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
          <h2 id="catchControlPanelApp.fcmTokens.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.fcmTokens.home.createOrEditLabel">Create or edit a FcmTokens</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fcmTokensEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="fcm-tokens-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="fcm-tokens-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="fcm-tokens-userCode">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.userCode">User Code</Translate>
                </Label>
                <AvField id="fcm-tokens-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="tokenLabel" for="fcm-tokens-token">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.token">Token</Translate>
                </Label>
                <AvField id="fcm-tokens-token" type="text" name="token" />
              </AvGroup>
              <AvGroup check>
                <Label id="isActiveLabel">
                  <AvInput id="fcm-tokens-isActive" type="checkbox" className="form-check-input" name="isActive" />
                  <Translate contentKey="catchControlPanelApp.fcmTokens.isActive">Is Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="fcm-tokens-dateCreated">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="fcm-tokens-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="fcm-tokens-createdBy">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.createdBy">Created By</Translate>
                </Label>
                <AvField id="fcm-tokens-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="fcm-tokens-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="fcm-tokens-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="fcm-tokens-dateModified">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="fcm-tokens-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="fcm-tokens-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="fcm-tokens-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="fcm-tokens-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.fcmTokens.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="fcm-tokens-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/fcm-tokens" replace color="info">
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
  fcmTokensEntity: storeState.fcmTokens.entity,
  loading: storeState.fcmTokens.loading,
  updating: storeState.fcmTokens.updating,
  updateSuccess: storeState.fcmTokens.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FcmTokensUpdate);
