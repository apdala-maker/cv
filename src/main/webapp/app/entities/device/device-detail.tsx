import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './device.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeviceDetail = (props: IDeviceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { deviceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.device.detail.title">Device</Translate> [<b>{deviceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.device.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.userCode}</dd>
          <dt>
            <span id="deviceId">
              <Translate contentKey="catchControlPanelApp.device.deviceId">Device Id</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.deviceId}</dd>
          <dt>
            <span id="version">
              <Translate contentKey="catchControlPanelApp.device.version">Version</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.version}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="catchControlPanelApp.device.model">Model</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.model}</dd>
          <dt>
            <span id="screenSize">
              <Translate contentKey="catchControlPanelApp.device.screenSize">Screen Size</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.screenSize}</dd>
          <dt>
            <span id="manufacture">
              <Translate contentKey="catchControlPanelApp.device.manufacture">Manufacture</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.manufacture}</dd>
          <dt>
            <span id="macAddresses">
              <Translate contentKey="catchControlPanelApp.device.macAddresses">Mac Addresses</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.macAddresses}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.device.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={deviceEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.device.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.device.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.device.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={deviceEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.device.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.device.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{deviceEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/device" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/device/${deviceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ device }: IRootState) => ({
  deviceEntity: device.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
