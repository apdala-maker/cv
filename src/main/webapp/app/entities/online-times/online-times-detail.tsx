import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './online-times.reducer';
import { IOnlineTimes } from 'app/shared/model/online-times.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOnlineTimesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OnlineTimesDetail = (props: IOnlineTimesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { onlineTimesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.onlineTimes.detail.title">OnlineTimes</Translate> [<b>{onlineTimesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="start">
              <Translate contentKey="catchControlPanelApp.onlineTimes.start">Start</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={onlineTimesEntity.start} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="finish">
              <Translate contentKey="catchControlPanelApp.onlineTimes.finish">Finish</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={onlineTimesEntity.finish} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.onlineTimes.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{onlineTimesEntity.driverCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.onlineTimes.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{onlineTimesEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.onlineTimes.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={onlineTimesEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.onlineTimes.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={onlineTimesEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/online-times" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/online-times/${onlineTimesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ onlineTimes }: IRootState) => ({
  onlineTimesEntity: onlineTimes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OnlineTimesDetail);
