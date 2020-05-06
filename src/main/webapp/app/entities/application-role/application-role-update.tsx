import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './application-role.reducer';
import { IApplicationRole } from 'app/shared/model/application-role.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationRoleUpdate = (props: IApplicationRoleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationRoleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application-role');
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
        ...applicationRoleEntity,
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
          <h2 id="catchControlPanelApp.applicationRole.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.applicationRole.home.createOrEditLabel">Create or edit a ApplicationRole</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationRoleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-role-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-role-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accessLabel" for="application-role-access">
                  <Translate contentKey="catchControlPanelApp.applicationRole.access">Access</Translate>
                </Label>
                <AvField id="application-role-access" type="text" name="access" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="application-role-dateCreated">
                  <Translate contentKey="catchControlPanelApp.applicationRole.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="application-role-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="application-role-createdBy">
                  <Translate contentKey="catchControlPanelApp.applicationRole.createdBy">Created By</Translate>
                </Label>
                <AvField id="application-role-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="application-role-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.applicationRole.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="application-role-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="application-role-dateModified">
                  <Translate contentKey="catchControlPanelApp.applicationRole.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="application-role-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="application-role-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.applicationRole.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="application-role-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="application-role-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.applicationRole.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="application-role-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/application-role" replace color="info">
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
  applicationRoleEntity: storeState.applicationRole.entity,
  loading: storeState.applicationRole.loading,
  updating: storeState.applicationRole.updating,
  updateSuccess: storeState.applicationRole.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoleUpdate);
