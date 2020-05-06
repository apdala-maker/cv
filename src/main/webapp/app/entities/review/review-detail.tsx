import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReviewDetail = (props: IReviewDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reviewEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.review.detail.title">Review</Translate> [<b>{reviewEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.review.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.tripCode}</dd>
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.review.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.userCode}</dd>
          <dt>
            <span id="rating">
              <Translate contentKey="catchControlPanelApp.review.rating">Rating</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.rating}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.review.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.areaCode}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="catchControlPanelApp.review.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.remarks}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.review.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={reviewEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.review.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.review.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.review.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={reviewEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.review.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.review.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{reviewEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/review" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/review/${reviewEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ review }: IRootState) => ({
  reviewEntity: review.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
