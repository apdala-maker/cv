import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComplaintsCategory } from 'app/shared/model/complaints-category.model';
import { getEntities as getComplaintsCategories } from 'app/entities/complaints-category/complaints-category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './complaints.reducer';
import { IComplaints } from 'app/shared/model/complaints.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IComplaintsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ComplaintsUpdate = (props: IComplaintsUpdateProps) => {
  const [complaintsCategoryId, setComplaintsCategoryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { complaintsEntity, complaintsCategories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/complaints');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getComplaintsCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...complaintsEntity,
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
          <h2 id="catchControlPanelApp.complaints.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.complaints.home.createOrEditLabel">Create or edit a Complaints</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : complaintsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="complaints-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="complaints-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="complaints-userCode">
                  <Translate contentKey="catchControlPanelApp.complaints.userCode">User Code</Translate>
                </Label>
                <AvField id="complaints-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="complaints-category">
                  <Translate contentKey="catchControlPanelApp.complaints.category">Category</Translate>
                </Label>
                <AvField id="complaints-category" type="text" name="category" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="complaints-description">
                  <Translate contentKey="catchControlPanelApp.complaints.description">Description</Translate>
                </Label>
                <AvField id="complaints-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="audienceLabel" for="complaints-audience">
                  <Translate contentKey="catchControlPanelApp.complaints.audience">Audience</Translate>
                </Label>
                <AvInput
                  id="complaints-audience"
                  type="select"
                  className="form-control"
                  name="audience"
                  value={(!isNew && complaintsEntity.audience) || 'DRIVERS'}
                >
                  <option value="DRIVERS">{translate('catchControlPanelApp.Audience.DRIVERS')}</option>
                  <option value="PASSENGER">{translate('catchControlPanelApp.Audience.PASSENGER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="complaints-status">
                  <Translate contentKey="catchControlPanelApp.complaints.status">Status</Translate>
                </Label>
                <AvInput
                  id="complaints-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && complaintsEntity.status) || 'NEW'}
                >
                  <option value="NEW">{translate('catchControlPanelApp.ComplaintStatus.NEW')}</option>
                  <option value="ACTIVE">{translate('catchControlPanelApp.ComplaintStatus.ACTIVE')}</option>
                  <option value="CLOSED">{translate('catchControlPanelApp.ComplaintStatus.CLOSED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="feedBackLabel" for="complaints-feedBack">
                  <Translate contentKey="catchControlPanelApp.complaints.feedBack">Feed Back</Translate>
                </Label>
                <AvField id="complaints-feedBack" type="text" name="feedBack" />
              </AvGroup>
              <AvGroup>
                <Label id="referenceCodeLabel" for="complaints-referenceCode">
                  <Translate contentKey="catchControlPanelApp.complaints.referenceCode">Reference Code</Translate>
                </Label>
                <AvField id="complaints-referenceCode" type="text" name="referenceCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="complaints-areaCode">
                  <Translate contentKey="catchControlPanelApp.complaints.areaCode">Area Code</Translate>
                </Label>
                <AvField id="complaints-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="complaints-dateCreated">
                  <Translate contentKey="catchControlPanelApp.complaints.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="complaints-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="complaints-dateModified">
                  <Translate contentKey="catchControlPanelApp.complaints.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="complaints-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="complaints-complaintsCategory">
                  <Translate contentKey="catchControlPanelApp.complaints.complaintsCategory">Complaints Category</Translate>
                </Label>
                <AvInput id="complaints-complaintsCategory" type="select" className="form-control" name="complaintsCategory.id">
                  <option value="" key="0" />
                  {complaintsCategories
                    ? complaintsCategories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.categoryCode}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/complaints" replace color="info">
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
  complaintsCategories: storeState.complaintsCategory.entities,
  complaintsEntity: storeState.complaints.entity,
  loading: storeState.complaints.loading,
  updating: storeState.complaints.updating,
  updateSuccess: storeState.complaints.updateSuccess
});

const mapDispatchToProps = {
  getComplaintsCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsUpdate);
