import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-type.reducer';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleTypeUpdate = (props: IVehicleTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-type');
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
        ...vehicleTypeEntity,
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
          <h2 id="catchControlPanelApp.vehicleType.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.vehicleType.home.createOrEditLabel">Create or edit a VehicleType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="vehicle-type-areaCode">
                  <Translate contentKey="catchControlPanelApp.vehicleType.areaCode">Area Code</Translate>
                </Label>
                <AvField id="vehicle-type-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup check>
                <Label id="isMotorBikeLabel">
                  <AvInput id="vehicle-type-isMotorBike" type="checkbox" className="form-check-input" name="isMotorBike" />
                  <Translate contentKey="catchControlPanelApp.vehicleType.isMotorBike">Is Motor Bike</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-type-description">
                  <Translate contentKey="catchControlPanelApp.vehicleType.description">Description</Translate>
                </Label>
                <AvField id="vehicle-type-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="vehicle-type-code">
                  <Translate contentKey="catchControlPanelApp.vehicleType.code">Code</Translate>
                </Label>
                <AvField id="vehicle-type-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="numberOfSeatsLabel" for="vehicle-type-numberOfSeats">
                  <Translate contentKey="catchControlPanelApp.vehicleType.numberOfSeats">Number Of Seats</Translate>
                </Label>
                <AvField id="vehicle-type-numberOfSeats" type="string" className="form-control" name="numberOfSeats" />
              </AvGroup>
              <AvGroup>
                <Label id="minimumCCLabel" for="vehicle-type-minimumCC">
                  <Translate contentKey="catchControlPanelApp.vehicleType.minimumCC">Minimum CC</Translate>
                </Label>
                <AvField id="vehicle-type-minimumCC" type="string" className="form-control" name="minimumCC" />
              </AvGroup>
              <AvGroup>
                <Label id="maximumCCLabel" for="vehicle-type-maximumCC">
                  <Translate contentKey="catchControlPanelApp.vehicleType.maximumCC">Maximum CC</Translate>
                </Label>
                <AvField id="vehicle-type-maximumCC" type="string" className="form-control" name="maximumCC" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="vehicle-type-dateCreated">
                  <Translate contentKey="catchControlPanelApp.vehicleType.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="vehicle-type-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="vehicle-type-createdBy">
                  <Translate contentKey="catchControlPanelApp.vehicleType.createdBy">Created By</Translate>
                </Label>
                <AvField id="vehicle-type-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="vehicle-type-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicleType.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="vehicle-type-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="vehicle-type-dateModified">
                  <Translate contentKey="catchControlPanelApp.vehicleType.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="vehicle-type-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="vehicle-type-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.vehicleType.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="vehicle-type-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="vehicle-type-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicleType.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="vehicle-type-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-type" replace color="info">
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
  vehicleTypeEntity: storeState.vehicleType.entity,
  loading: storeState.vehicleType.loading,
  updating: storeState.vehicleType.updating,
  updateSuccess: storeState.vehicleType.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTypeUpdate);
