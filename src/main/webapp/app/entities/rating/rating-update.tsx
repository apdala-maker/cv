import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './rating.reducer';
import { IRating } from 'app/shared/model/rating.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRatingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RatingUpdate = (props: IRatingUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ratingEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/rating');
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
        ...ratingEntity,
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
          <h2 id="catchControlPanelApp.rating.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.rating.home.createOrEditLabel">Create or edit a Rating</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ratingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="rating-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="rating-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="rating-userCode">
                  <Translate contentKey="catchControlPanelApp.rating.userCode">User Code</Translate>
                </Label>
                <AvField id="rating-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="rating-value">
                  <Translate contentKey="catchControlPanelApp.rating.value">Value</Translate>
                </Label>
                <AvField id="rating-value" type="string" className="form-control" name="value" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="rating-remarks">
                  <Translate contentKey="catchControlPanelApp.rating.remarks">Remarks</Translate>
                </Label>
                <AvField id="rating-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="rating-dateCreated">
                  <Translate contentKey="catchControlPanelApp.rating.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="rating-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="rating-dateModified">
                  <Translate contentKey="catchControlPanelApp.rating.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="rating-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/rating" replace color="info">
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
  ratingEntity: storeState.rating.entity,
  loading: storeState.rating.loading,
  updating: storeState.rating.updating,
  updateSuccess: storeState.rating.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RatingUpdate);
