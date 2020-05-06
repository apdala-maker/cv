import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-mapping.reducer';
import { IVehicleMapping } from 'app/shared/model/vehicle-mapping.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMappingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMappingUpdate = (props: IVehicleMappingUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleMappingEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/vehicle-mapping');
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
        ...vehicleMappingEntity,
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
          <h2 id="catchControlPanelApp.vehicleMapping.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.vehicleMapping.home.createOrEditLabel">Create or edit a VehicleMapping</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleMappingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-mapping-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-mapping-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="makeCodeLabel" for="vehicle-mapping-makeCode">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.makeCode">Make Code</Translate>
                </Label>
                <AvField id="vehicle-mapping-makeCode" type="text" name="makeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="userCodeLabel" for="vehicle-mapping-userCode">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.userCode">User Code</Translate>
                </Label>
                <AvField id="vehicle-mapping-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="modelCodeLabel" for="vehicle-mapping-modelCode">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.modelCode">Model Code</Translate>
                </Label>
                <AvField id="vehicle-mapping-modelCode" type="text" name="modelCode" />
              </AvGroup>
              <AvGroup>
                <Label id="yearLabel" for="vehicle-mapping-year">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.year">Year</Translate>
                </Label>
                <AvField id="vehicle-mapping-year" type="string" className="form-control" name="year" />
              </AvGroup>
              <AvGroup>
                <Label id="registrationNumberLabel" for="vehicle-mapping-registrationNumber">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.registrationNumber">Registration Number</Translate>
                </Label>
                <AvField id="vehicle-mapping-registrationNumber" type="text" name="registrationNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleTypeCodeLabel" for="vehicle-mapping-vehicleTypeCode">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.vehicleTypeCode">Vehicle Type Code</Translate>
                </Label>
                <AvField id="vehicle-mapping-vehicleTypeCode" type="text" name="vehicleTypeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="vehicle-mapping-areaCode">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.areaCode">Area Code</Translate>
                </Label>
                <AvField id="vehicle-mapping-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup check>
                <Label id="isApprovedLabel">
                  <AvInput id="vehicle-mapping-isApproved" type="checkbox" className="form-check-input" name="isApproved" />
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.isApproved">Is Approved</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="approvedByLabel" for="vehicle-mapping-approvedBy">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.approvedBy">Approved By</Translate>
                </Label>
                <AvField id="vehicle-mapping-approvedBy" type="text" name="approvedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="vehicle-mapping-dateCreated">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="vehicle-mapping-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="vehicle-mapping-createdBy">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.createdBy">Created By</Translate>
                </Label>
                <AvField id="vehicle-mapping-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="vehicle-mapping-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="vehicle-mapping-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="vehicle-mapping-dateModified">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="vehicle-mapping-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="vehicle-mapping-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="vehicle-mapping-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="vehicle-mapping-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.vehicleMapping.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="vehicle-mapping-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-mapping" replace color="info">
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
  vehicleMappingEntity: storeState.vehicleMapping.entity,
  loading: storeState.vehicleMapping.loading,
  updating: storeState.vehicleMapping.updating,
  updateSuccess: storeState.vehicleMapping.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMappingUpdate);
