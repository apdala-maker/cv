import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './area-file-types.reducer';
import { IAreaFileTypes } from 'app/shared/model/area-file-types.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAreaFileTypesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaFileTypesUpdate = (props: IAreaFileTypesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { areaFileTypesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/area-file-types');
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
        ...areaFileTypesEntity,
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
          <h2 id="catchControlPanelApp.areaFileTypes.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.areaFileTypes.home.createOrEditLabel">Create or edit a AreaFileTypes</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : areaFileTypesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="area-file-types-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="area-file-types-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="area-file-types-code">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.code">Code</Translate>
                </Label>
                <AvField id="area-file-types-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="area-file-types-areaCode">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.areaCode">Area Code</Translate>
                </Label>
                <AvField id="area-file-types-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup check>
                <Label id="isManadatoryLabel">
                  <AvInput id="area-file-types-isManadatory" type="checkbox" className="form-check-input" name="isManadatory" />
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.isManadatory">Is Manadatory</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="area-file-types-description">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.description">Description</Translate>
                </Label>
                <AvField id="area-file-types-description" type="text" name="description" />
              </AvGroup>
              <AvGroup check>
                <Label id="hasExpiryLabel">
                  <AvInput id="area-file-types-hasExpiry" type="checkbox" className="form-check-input" name="hasExpiry" />
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.hasExpiry">Has Expiry</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="area-file-types-dateCreated">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="area-file-types-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="area-file-types-createdBy">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.createdBy">Created By</Translate>
                </Label>
                <AvField id="area-file-types-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="area-file-types-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="area-file-types-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="area-file-types-dateModified">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="area-file-types-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="area-file-types-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="area-file-types-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="area-file-types-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="area-file-types-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/area-file-types" replace color="info">
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
  areaFileTypesEntity: storeState.areaFileTypes.entity,
  loading: storeState.areaFileTypes.loading,
  updating: storeState.areaFileTypes.updating,
  updateSuccess: storeState.areaFileTypes.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaFileTypesUpdate);
