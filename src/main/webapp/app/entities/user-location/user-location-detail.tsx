import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-location.reducer';
import { IUserLocation } from 'app/shared/model/user-location.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserLocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserLocationDetail = (props: IUserLocationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userLocationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.userLocation.detail.title">UserLocation</Translate> [<b>{userLocationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="latitude">
              <Translate contentKey="catchControlPanelApp.userLocation.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{userLocationEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="catchControlPanelApp.userLocation.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{userLocationEntity.longitude}</dd>
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.userLocation.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{userLocationEntity.tripCode}</dd>
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.userLocation.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{userLocationEntity.userCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.userLocation.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{userLocationEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.userLocation.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={userLocationEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.userLocation.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={userLocationEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/user-location" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-location/${userLocationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userLocation }: IRootState) => ({
  userLocationEntity: userLocation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationDetail);
