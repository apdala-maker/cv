import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './device.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDeviceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeviceUpdate = (props: IDeviceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { deviceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/device');
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
        ...deviceEntity,
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
          <h2 id="catchControlPanelApp.device.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.device.home.createOrEditLabel">Create or edit a Device</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : deviceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="device-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="device-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="device-userCode">
                  <Translate contentKey="catchControlPanelApp.device.userCode">User Code</Translate>
                </Label>
                <AvField id="device-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="deviceIdLabel" for="device-deviceId">
                  <Translate contentKey="catchControlPanelApp.device.deviceId">Device Id</Translate>
                </Label>
                <AvField id="device-deviceId" type="text" name="deviceId" />
              </AvGroup>
              <AvGroup>
                <Label id="versionLabel" for="device-version">
                  <Translate contentKey="catchControlPanelApp.device.version">Version</Translate>
                </Label>
                <AvField id="device-version" type="text" name="version" />
              </AvGroup>
              <AvGroup>
                <Label id="modelLabel" for="device-model">
                  <Translate contentKey="catchControlPanelApp.device.model">Model</Translate>
                </Label>
                <AvField id="device-model" type="text" name="model" />
              </AvGroup>
              <AvGroup>
                <Label id="screenSizeLabel" for="device-screenSize">
                  <Translate contentKey="catchControlPanelApp.device.screenSize">Screen Size</Translate>
                </Label>
                <AvField id="device-screenSize" type="text" name="screenSize" />
              </AvGroup>
              <AvGroup>
                <Label id="manufactureLabel" for="device-manufacture">
                  <Translate contentKey="catchControlPanelApp.device.manufacture">Manufacture</Translate>
                </Label>
                <AvField id="device-manufacture" type="text" name="manufacture" />
              </AvGroup>
              <AvGroup>
                <Label id="macAddressesLabel" for="device-macAddresses">
                  <Translate contentKey="catchControlPanelApp.device.macAddresses">Mac Addresses</Translate>
                </Label>
                <AvField id="device-macAddresses" type="text" name="macAddresses" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="device-dateCreated">
                  <Translate contentKey="catchControlPanelApp.device.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="device-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="device-createdBy">
                  <Translate contentKey="catchControlPanelApp.device.createdBy">Created By</Translate>
                </Label>
                <AvField id="device-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="device-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.device.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="device-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="device-dateModified">
                  <Translate contentKey="catchControlPanelApp.device.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="device-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="device-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.device.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="device-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="device-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.device.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="device-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/device" replace color="info">
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
  deviceEntity: storeState.device.entity,
  loading: storeState.device.loading,
  updating: storeState.device.updating,
  updateSuccess: storeState.device.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceUpdate);
