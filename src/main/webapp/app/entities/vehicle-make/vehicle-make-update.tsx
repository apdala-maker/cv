import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-make.reducer';
import { IVehicleMake } from 'app/shared/model/vehicle-make.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMakeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMakeUpdate = (props: IVehicleMakeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleMakeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-make');
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
        ...vehicleMakeEntity,
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
          <h2 id="catchControlPanelApp.vehicleMake.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.vehicleMake.home.createOrEditLabel">Create or edit a VehicleMake</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleMakeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-make-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-make-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-make-description">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.description">Description</Translate>
                </Label>
                <AvField id="vehicle-make-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="makeCodeLabel" for="vehicle-make-makeCode">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.makeCode">Make Code</Translate>
                </Label>
                <AvField id="vehicle-make-makeCode" type="text" name="makeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="vehicle-make-dateCreated">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="vehicle-make-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="vehicle-make-createdBy">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.createdBy">Created By</Translate>
                </Label>
                <AvField id="vehicle-make-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="vehicle-make-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="vehicle-make-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="vehicle-make-dateModified">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="vehicle-make-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="vehicle-make-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="vehicle-make-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="vehicle-make-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicleMake.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="vehicle-make-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-make" replace color="info">
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
  vehicleMakeEntity: storeState.vehicleMake.entity,
  loading: storeState.vehicleMake.loading,
  updating: storeState.vehicleMake.updating,
  updateSuccess: storeState.vehicleMake.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMakeUpdate);
