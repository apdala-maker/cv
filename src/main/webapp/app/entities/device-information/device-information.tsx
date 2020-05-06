import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './device-information.reducer';
import { IDeviceInformation } from 'app/shared/model/device-information.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceInformationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DeviceInformation = (props: IDeviceInformationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { deviceInformationList, match, loading } = props;
  return (
    <div>
      <h2 id="device-information-heading">
        <Translate contentKey="catchControlPanelApp.deviceInformation.home.title">Device Informations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.deviceInformation.home.createLabel">Create new Device Information</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {deviceInformationList && deviceInformationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.userType">User Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.model">Model</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.width">Width</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.length">Length</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.oS">O S</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.manufacturer">Manufacturer</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.deviceId">Device Id</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.osVersion">Os Version</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.brand">Brand</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.screenSize">Screen Size</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.serial">Serial</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.deviceInformation.dateModified">Date Modified</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {deviceInformationList.map((deviceInformation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${deviceInformation.id}`} color="link" size="sm">
                      {deviceInformation.id}
                    </Button>
                  </td>
                  <td>{deviceInformation.userCode}</td>
                  <td>{deviceInformation.userType}</td>
                  <td>{deviceInformation.model}</td>
                  <td>{deviceInformation.name}</td>
                  <td>{deviceInformation.width}</td>
                  <td>{deviceInformation.length}</td>
                  <td>{deviceInformation.oS}</td>
                  <td>{deviceInformation.manufacturer}</td>
                  <td>{deviceInformation.deviceId}</td>
                  <td>{deviceInformation.osVersion}</td>
                  <td>{deviceInformation.brand}</td>
                  <td>{deviceInformation.screenSize}</td>
                  <td>{deviceInformation.serial}</td>
                  <td>{deviceInformation.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={deviceInformation.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={deviceInformation.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${deviceInformation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${deviceInformation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${deviceInformation.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.deviceInformation.home.notFound">No Device Informations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ deviceInformation }: IRootState) => ({
  deviceInformationList: deviceInformation.entities,
  loading: deviceInformation.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInformation);
