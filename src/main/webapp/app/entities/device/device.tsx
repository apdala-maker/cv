import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './device.reducer';
import { IDevice } from 'app/shared/model/device.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Device = (props: IDeviceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { deviceList, match, loading } = props;
  return (
    <div>
      <h2 id="device-heading">
        <Translate contentKey="catchControlPanelApp.device.home.title">Devices</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.device.home.createLabel">Create new Device</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {deviceList && deviceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.deviceId">Device Id</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.version">Version</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.model">Model</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.screenSize">Screen Size</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.manufacture">Manufacture</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.macAddresses">Mac Addresses</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.device.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {deviceList.map((device, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${device.id}`} color="link" size="sm">
                      {device.id}
                    </Button>
                  </td>
                  <td>{device.userCode}</td>
                  <td>{device.deviceId}</td>
                  <td>{device.version}</td>
                  <td>{device.model}</td>
                  <td>{device.screenSize}</td>
                  <td>{device.manufacture}</td>
                  <td>{device.macAddresses}</td>
                  <td>
                    <TextFormat type="date" value={device.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{device.createdBy}</td>
                  <td>{device.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={device.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{device.modifiedBy}</td>
                  <td>{device.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${device.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${device.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${device.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="catchControlPanelApp.device.home.notFound">No Devices found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ device }: IRootState) => ({
  deviceList: device.entities,
  loading: device.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Device);
