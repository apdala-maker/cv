import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './device-information.reducer';
import { IDeviceInformation } from 'app/shared/model/device-information.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDeviceInformationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeviceInformationUpdate = (props: IDeviceInformationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { deviceInformationEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/device-information');
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
        ...deviceInformationEntity,
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
          <h2 id="catchControlPanelApp.deviceInformation.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.deviceInformation.home.createOrEditLabel">
              Create or edit a DeviceInformation
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : deviceInformationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="device-information-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="device-information-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="device-information-userCode">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.userCode">User Code</Translate>
                </Label>
                <AvField id="device-information-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="userTypeLabel" for="device-information-userType">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.userType">User Type</Translate>
                </Label>
                <AvField id="device-information-userType" type="text" name="userType" />
              </AvGroup>
              <AvGroup>
                <Label id="modelLabel" for="device-information-model">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.model">Model</Translate>
                </Label>
                <AvField id="device-information-model" type="text" name="model" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="device-information-name">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.name">Name</Translate>
                </Label>
                <AvField id="device-information-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="widthLabel" for="device-information-width">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.width">Width</Translate>
                </Label>
                <AvField id="device-information-width" type="string" className="form-control" name="width" />
              </AvGroup>
              <AvGroup>
                <Label id="lengthLabel" for="device-information-length">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.length">Length</Translate>
                </Label>
                <AvField id="device-information-length" type="string" className="form-control" name="length" />
              </AvGroup>
              <AvGroup>
                <Label id="oSLabel" for="device-information-oS">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.oS">O S</Translate>
                </Label>
                <AvField id="device-information-oS" type="text" name="oS" />
              </AvGroup>
              <AvGroup>
                <Label id="manufacturerLabel" for="device-information-manufacturer">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.manufacturer">Manufacturer</Translate>
                </Label>
                <AvField id="device-information-manufacturer" type="text" name="manufacturer" />
              </AvGroup>
              <AvGroup>
                <Label id="deviceIdLabel" for="device-information-deviceId">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.deviceId">Device Id</Translate>
                </Label>
                <AvField id="device-information-deviceId" type="text" name="deviceId" />
              </AvGroup>
              <AvGroup>
                <Label id="osVersionLabel" for="device-information-osVersion">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.osVersion">Os Version</Translate>
                </Label>
                <AvField id="device-information-osVersion" type="text" name="osVersion" />
              </AvGroup>
              <AvGroup>
                <Label id="brandLabel" for="device-information-brand">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.brand">Brand</Translate>
                </Label>
                <AvField id="device-information-brand" type="text" name="brand" />
              </AvGroup>
              <AvGroup>
                <Label id="screenSizeLabel" for="device-information-screenSize">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.screenSize">Screen Size</Translate>
                </Label>
                <AvField id="device-information-screenSize" type="text" name="screenSize" />
              </AvGroup>
              <AvGroup>
                <Label id="serialLabel" for="device-information-serial">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.serial">Serial</Translate>
                </Label>
                <AvField id="device-information-serial" type="text" name="serial" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="device-information-areaCode">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.areaCode">Area Code</Translate>
                </Label>
                <AvField id="device-information-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="device-information-dateCreated">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="device-information-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="device-information-dateModified">
                  <Translate contentKey="catchControlPanelApp.deviceInformation.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="device-information-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/device-information" replace color="info">
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
  deviceInformationEntity: storeState.deviceInformation.entity,
  loading: storeState.deviceInformation.loading,
  updating: storeState.deviceInformation.updating,
  updateSuccess: storeState.deviceInformation.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInformationUpdate);
