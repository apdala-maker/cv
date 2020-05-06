import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stops.reducer';
import { IStops } from 'app/shared/model/stops.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStopsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StopsDetail = (props: IStopsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { stopsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.stops.detail.title">Stops</Translate> [<b>{stopsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="latitude">
              <Translate contentKey="catchControlPanelApp.stops.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{stopsEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="catchControlPanelApp.stops.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{stopsEntity.longitude}</dd>
          <dt>
            <span id="order">
              <Translate contentKey="catchControlPanelApp.stops.order">Order</Translate>
            </span>
          </dt>
          <dd>{stopsEntity.order}</dd>
        </dl>
        <Button tag={Link} to="/stops" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/stops/${stopsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ stops }: IRootState) => ({
  stopsEntity: stops.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StopsDetail);
