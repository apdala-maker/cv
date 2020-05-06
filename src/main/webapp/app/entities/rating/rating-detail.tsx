import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rating.reducer';
import { IRating } from 'app/shared/model/rating.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRatingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RatingDetail = (props: IRatingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ratingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.rating.detail.title">Rating</Translate> [<b>{ratingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.rating.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{ratingEntity.userCode}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="catchControlPanelApp.rating.value">Value</Translate>
            </span>
          </dt>
          <dd>{ratingEntity.value}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="catchControlPanelApp.rating.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{ratingEntity.remarks}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.rating.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={ratingEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.rating.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={ratingEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/rating" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rating/${ratingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ rating }: IRootState) => ({
  ratingEntity: rating.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RatingDetail);
