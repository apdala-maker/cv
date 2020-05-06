import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './device-information.reducer';
import { IDeviceInformation } from 'app/shared/model/device-information.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceInformationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeviceInformationDetail = (props: IDeviceInformationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { deviceInformationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.deviceInformation.detail.title">DeviceInformation</Translate> [
          <b>{deviceInformationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.deviceInformation.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.userCode}</dd>
          <dt>
            <span id="userType">
              <Translate contentKey="catchControlPanelApp.deviceInformation.userType">User Type</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.userType}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="catchControlPanelApp.deviceInformation.model">Model</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.model}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.deviceInformation.name">Name</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.name}</dd>
          <dt>
            <span id="width">
              <Translate contentKey="catchControlPanelApp.deviceInformation.width">Width</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.width}</dd>
          <dt>
            <span id="length">
              <Translate contentKey="catchControlPanelApp.deviceInformation.length">Length</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.length}</dd>
          <dt>
            <span id="oS">
              <Translate contentKey="catchControlPanelApp.deviceInformation.oS">O S</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.oS}</dd>
          <dt>
            <span id="manufacturer">
              <Translate contentKey="catchControlPanelApp.deviceInformation.manufacturer">Manufacturer</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.manufacturer}</dd>
          <dt>
            <span id="deviceId">
              <Translate contentKey="catchControlPanelApp.deviceInformation.deviceId">Device Id</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.deviceId}</dd>
          <dt>
            <span id="osVersion">
              <Translate contentKey="catchControlPanelApp.deviceInformation.osVersion">Os Version</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.osVersion}</dd>
          <dt>
            <span id="brand">
              <Translate contentKey="catchControlPanelApp.deviceInformation.brand">Brand</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.brand}</dd>
          <dt>
            <span id="screenSize">
              <Translate contentKey="catchControlPanelApp.deviceInformation.screenSize">Screen Size</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.screenSize}</dd>
          <dt>
            <span id="serial">
              <Translate contentKey="catchControlPanelApp.deviceInformation.serial">Serial</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.serial}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.deviceInformation.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{deviceInformationEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.deviceInformation.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={deviceInformationEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.deviceInformation.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={deviceInformationEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/device-information" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/device-information/${deviceInformationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ deviceInformation }: IRootState) => ({
  deviceInformationEntity: deviceInformation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInformationDetail);
