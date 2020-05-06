import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReviewUpdate = (props: IReviewUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { reviewEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/review');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...reviewEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="catchControlPanelApp.review.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.review.home.createOrEditLabel">Create or edit a Review</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : reviewEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="review-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="review-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tripCodeLabel" for="review-tripCode">
                  <Translate contentKey="catchControlPanelApp.review.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="review-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="userCodeLabel" for="review-userCode">
                  <Translate contentKey="catchControlPanelApp.review.userCode">User Code</Translate>
                </Label>
                <AvField id="review-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="ratingLabel" for="review-rating">
                  <Translate contentKey="catchControlPanelApp.review.rating">Rating</Translate>
                </Label>
                <AvField id="review-rating" type="string" className="form-control" name="rating" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="review-areaCode">
                  <Translate contentKey="catchControlPanelApp.review.areaCode">Area Code</Translate>
                </Label>
                <AvField id="review-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="review-remarks">
                  <Translate contentKey="catchControlPanelApp.review.remarks">Remarks</Translate>
                </Label>
                <AvField id="review-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="review-dateCreated">
                  <Translate contentKey="catchControlPanelApp.review.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="review-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="review-createdBy">
                  <Translate contentKey="catchControlPanelApp.review.createdBy">Created By</Translate>
                </Label>
                <AvField id="review-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="review-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.review.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="review-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="review-dateModified">
                  <Translate contentKey="catchControlPanelApp.review.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="review-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="review-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.review.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="review-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="review-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.review.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="review-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/review" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reviewEntity: storeState.review.entity,
  loading: storeState.review.loading,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewUpdate);
