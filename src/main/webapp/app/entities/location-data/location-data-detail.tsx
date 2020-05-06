import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location-data.reducer';
import { ILocationData } from 'app/shared/model/location-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDataDetail = (props: ILocationDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { locationDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.locationData.detail.title">LocationData</Translate> [<b>{locationDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="latitude">
              <Translate contentKey="catchControlPanelApp.locationData.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{locationDataEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="catchControlPanelApp.locationData.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{locationDataEntity.longitude}</dd>
          <dt>
            <span id="bearing">
              <Translate contentKey="catchControlPanelApp.locationData.bearing">Bearing</Translate>
            </span>
          </dt>
          <dd>{locationDataEntity.bearing}</dd>
        </dl>
        <Button tag={Link} to="/location-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location-data/${locationDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ locationData }: IRootState) => ({
  locationDataEntity: locationData.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDataDetail);
