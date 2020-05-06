import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleUpdate = (props: IVehicleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle');
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
        ...vehicleEntity,
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
          <h2 id="catchControlPanelApp.vehicle.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.vehicle.home.createOrEditLabel">Create or edit a Vehicle</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="modelNameLabel" for="vehicle-modelName">
                  <Translate contentKey="catchControlPanelApp.vehicle.modelName">Model Name</Translate>
                </Label>
                <AvField id="vehicle-modelName" type="text" name="modelName" />
              </AvGroup>
              <AvGroup>
                <Label id="modelCodeLabel" for="vehicle-modelCode">
                  <Translate contentKey="catchControlPanelApp.vehicle.modelCode">Model Code</Translate>
                </Label>
                <AvField id="vehicle-modelCode" type="text" name="modelCode" />
              </AvGroup>
              <AvGroup>
                <Label id="makeCodeLabel" for="vehicle-makeCode">
                  <Translate contentKey="catchControlPanelApp.vehicle.makeCode">Make Code</Translate>
                </Label>
                <AvField id="vehicle-makeCode" type="text" name="makeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="vehicle-dateCreated">
                  <Translate contentKey="catchControlPanelApp.vehicle.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="vehicle-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="vehicle-createdBy">
                  <Translate contentKey="catchControlPanelApp.vehicle.createdBy">Created By</Translate>
                </Label>
                <AvField id="vehicle-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="vehicle-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicle.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="vehicle-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="vehicle-dateModified">
                  <Translate contentKey="catchControlPanelApp.vehicle.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="vehicle-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="vehicle-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.vehicle.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="vehicle-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="vehicle-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicle.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="vehicle-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle" replace color="info">
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
  vehicleEntity: storeState.vehicle.entity,
  loading: storeState.vehicle.loading,
  updating: storeState.vehicle.updating,
  updateSuccess: storeState.vehicle.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleUpdate);
