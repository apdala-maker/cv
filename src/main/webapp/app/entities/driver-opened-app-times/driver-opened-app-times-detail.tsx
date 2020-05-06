import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver-opened-app-times.reducer';
import { IDriverOpenedAppTimes } from 'app/shared/model/driver-opened-app-times.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverOpenedAppTimesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverOpenedAppTimesDetail = (props: IDriverOpenedAppTimesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverOpenedAppTimesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.detail.title">DriverOpenedAppTimes</Translate> [
          <b>{driverOpenedAppTimesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="driverCode">
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.driverCode">Driver Code</Translate>
            </span>
          </dt>
          <dd>{driverOpenedAppTimesEntity.driverCode}</dd>
          <dt>
            <span id="dateOpened">
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.dateOpened">Date Opened</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverOpenedAppTimesEntity.dateOpened} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tripCount">
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.tripCount">Trip Count</Translate>
            </span>
          </dt>
          <dd>{driverOpenedAppTimesEntity.tripCount}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{driverOpenedAppTimesEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverOpenedAppTimesEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.driverOpenedAppTimes.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={driverOpenedAppTimesEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/driver-opened-app-times" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver-opened-app-times/${driverOpenedAppTimesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driverOpenedAppTimes }: IRootState) => ({
  driverOpenedAppTimesEntity: driverOpenedAppTimes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverOpenedAppTimesDetail);
