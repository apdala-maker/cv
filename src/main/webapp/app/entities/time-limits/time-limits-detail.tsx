import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './time-limits.reducer';
import { ITimeLimits } from 'app/shared/model/time-limits.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimeLimitsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TimeLimitsDetail = (props: ITimeLimitsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { timeLimitsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.timeLimits.detail.title">TimeLimits</Translate> [<b>{timeLimitsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.timeLimits.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.areaCode}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.timeLimits.description">Description</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.description}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.timeLimits.code">Code</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.code}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="catchControlPanelApp.timeLimits.category">Category</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.category}</dd>
          <dt>
            <span id="startHour">
              <Translate contentKey="catchControlPanelApp.timeLimits.startHour">Start Hour</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.startHour}</dd>
          <dt>
            <span id="startMinute">
              <Translate contentKey="catchControlPanelApp.timeLimits.startMinute">Start Minute</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.startMinute}</dd>
          <dt>
            <span id="endHour">
              <Translate contentKey="catchControlPanelApp.timeLimits.endHour">End Hour</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.endHour}</dd>
          <dt>
            <span id="endMinute">
              <Translate contentKey="catchControlPanelApp.timeLimits.endMinute">End Minute</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.endMinute}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.timeLimits.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={timeLimitsEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.timeLimits.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.timeLimits.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.timeLimits.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={timeLimitsEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.timeLimits.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.timeLimits.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{timeLimitsEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/time-limits" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/time-limits/${timeLimitsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ timeLimits }: IRootState) => ({
  timeLimitsEntity: timeLimits.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TimeLimitsDetail);
