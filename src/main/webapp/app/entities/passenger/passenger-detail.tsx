import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './passenger.reducer';
import { IPassenger } from 'app/shared/model/passenger.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerDetail = (props: IPassengerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { passengerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.passenger.detail.title">Passenger</Translate> [<b>{passengerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.passenger.status">Status</Translate>
            </span>
          </dt>
          <dd>{passengerEntity.status}</dd>
          <dt>
            <span id="passengerCode">
              <Translate contentKey="catchControlPanelApp.passenger.passengerCode">Passenger Code</Translate>
            </span>
          </dt>
          <dd>{passengerEntity.passengerCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.passenger.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{passengerEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.passenger.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.passenger.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.passenger.latestLocation">Latest Location</Translate>
          </dt>
          <dd>{passengerEntity.latestLocation ? passengerEntity.latestLocation.latitude : ''}</dd>
        </dl>
        <Button tag={Link} to="/passenger" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/passenger/${passengerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ passenger }: IRootState) => ({
  passengerEntity: passenger.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassengerDetail);
