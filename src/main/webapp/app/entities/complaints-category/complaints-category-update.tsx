import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './complaints-category.reducer';
import { IComplaintsCategory } from 'app/shared/model/complaints-category.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IComplaintsCategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ComplaintsCategoryUpdate = (props: IComplaintsCategoryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { complaintsCategoryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/complaints-category');
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
        ...complaintsCategoryEntity,
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
          <h2 id="catchControlPanelApp.complaintsCategory.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.complaintsCategory.home.createOrEditLabel">
              Create or edit a ComplaintsCategory
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : complaintsCategoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="complaints-category-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="complaints-category-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categoryCodeLabel" for="complaints-category-categoryCode">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.categoryCode">Category Code</Translate>
                </Label>
                <AvField id="complaints-category-categoryCode" type="text" name="categoryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="complaints-category-description">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.description">Description</Translate>
                </Label>
                <AvField id="complaints-category-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="audienceLabel" for="complaints-category-audience">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.audience">Audience</Translate>
                </Label>
                <AvInput
                  id="complaints-category-audience"
                  type="select"
                  className="form-control"
                  name="audience"
                  value={(!isNew && complaintsCategoryEntity.audience) || 'DRIVERS'}
                >
                  <option value="DRIVERS">{translate('catchControlPanelApp.Audience.DRIVERS')}</option>
                  <option value="PASSENGER">{translate('catchControlPanelApp.Audience.PASSENGER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="urgencyScaleLabel" for="complaints-category-urgencyScale">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.urgencyScale">Urgency Scale</Translate>
                </Label>
                <AvField id="complaints-category-urgencyScale" type="string" className="form-control" name="urgencyScale" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="complaints-category-areaCode">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.areaCode">Area Code</Translate>
                </Label>
                <AvField id="complaints-category-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="complaints-category-dateCreated">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="complaints-category-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="complaints-category-dateModified">
                  <Translate contentKey="catchControlPanelApp.complaintsCategory.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="complaints-category-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/complaints-category" replace color="info">
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
  complaintsCategoryEntity: storeState.complaintsCategory.entity,
  loading: storeState.complaintsCategory.loading,
  updating: storeState.complaintsCategory.updating,
  updateSuccess: storeState.complaintsCategory.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsCategoryUpdate);
