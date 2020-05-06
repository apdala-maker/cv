import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip-queue.reducer';
import { ITripQueue } from 'app/shared/model/trip-queue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripQueueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripQueueDetail = (props: ITripQueueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tripQueueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.tripQueue.detail.title">TripQueue</Translate> [<b>{tripQueueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.tripQueue.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{tripQueueEntity.tripCode}</dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.tripQueue.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{tripQueueEntity.driverCode}</dd>
          <dt>
            <span id="passengerCode">
              <Translate contentKey="catchControlPanelApp.tripQueue.passengerCode">Passenger Code</Translate>
            </span>
          </dt>
          <dd>{tripQueueEntity.passengerCode}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.tripQueue.status">Status</Translate>
            </span>
          </dt>
          <dd>{tripQueueEntity.status}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.tripQueue.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{tripQueueEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.tripQueue.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripQueueEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.tripQueue.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={tripQueueEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/trip-queue" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/trip-queue/${tripQueueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tripQueue }: IRootState) => ({
  tripQueueEntity: tripQueue.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripQueueDetail);
