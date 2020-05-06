import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './passenger-identity.reducer';
import { IPassengerIdentity } from 'app/shared/model/passenger-identity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerIdentityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PassengerIdentity = (props: IPassengerIdentityProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { passengerIdentityList, match, loading } = props;
  return (
    <div>
      <h2 id="passenger-identity-heading">
        <Translate contentKey="catchControlPanelApp.passengerIdentity.home.title">Passenger Identities</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.passengerIdentity.home.createLabel">Create new Passenger Identity</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {passengerIdentityList && passengerIdentityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.countryCode">Country Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.referralCode">Referral Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.companyCode">Company Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.currentRating">Current Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.userType">User Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.userProfileFileTypes">User Profile File Types</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {passengerIdentityList.map((passengerIdentity, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${passengerIdentity.id}`} color="link" size="sm">
                      {passengerIdentity.id}
                    </Button>
                  </td>
                  <td>{passengerIdentity.userCode}</td>
                  <td>{passengerIdentity.name}</td>
                  <td>{passengerIdentity.countryCode}</td>
                  <td>{passengerIdentity.areaCode}</td>
                  <td>{passengerIdentity.referralCode}</td>
                  <td>{passengerIdentity.gender}</td>
                  <td>{passengerIdentity.companyCode}</td>
                  <td>{passengerIdentity.currentRating}</td>
                  <td>{passengerIdentity.userType}</td>
                  <td>
                    <TextFormat type="date" value={passengerIdentity.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={passengerIdentity.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {passengerIdentity.userProfileFileTypes ? (
                      <Link to={`user-profile-file-types/${passengerIdentity.userProfileFileTypes.id}`}>
                        {passengerIdentity.userProfileFileTypes.profileImage}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${passengerIdentity.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passengerIdentity.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${passengerIdentity.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.passengerIdentity.home.notFound">No Passenger Identities found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ passengerIdentity }: IRootState) => ({
  passengerIdentityList: passengerIdentity.entities,
  loading: passengerIdentity.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassengerIdentity);
