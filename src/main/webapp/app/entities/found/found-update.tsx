import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './found.reducer';
import { IFound } from 'app/shared/model/found.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFoundUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FoundUpdate = (props: IFoundUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { foundEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/found');
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
        ...foundEntity,
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
          <h2 id="catchControlPanelApp.found.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.found.home.createOrEditLabel">Create or edit a Found</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : foundEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="found-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="found-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tripCodeLabel" for="found-tripCode">
                  <Translate contentKey="catchControlPanelApp.found.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="found-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateFoundLabel" for="found-dateFound">
                  <Translate contentKey="catchControlPanelApp.found.dateFound">Date Found</Translate>
                </Label>
                <AvField id="found-dateFound" type="date" className="form-control" name="dateFound" />
              </AvGroup>
              <AvGroup>
                <Label id="userCodeLabel" for="found-userCode">
                  <Translate contentKey="catchControlPanelApp.found.userCode">User Code</Translate>
                </Label>
                <AvField id="found-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="found-description">
                  <Translate contentKey="catchControlPanelApp.found.description">Description</Translate>
                </Label>
                <AvField id="found-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="itemNameLabel" for="found-itemName">
                  <Translate contentKey="catchControlPanelApp.found.itemName">Item Name</Translate>
                </Label>
                <AvField id="found-itemName" type="text" name="itemName" />
              </AvGroup>
              <AvGroup check>
                <Label id="isReturnedLabel">
                  <AvInput id="found-isReturned" type="checkbox" className="form-check-input" name="isReturned" />
                  <Translate contentKey="catchControlPanelApp.found.isReturned">Is Returned</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="referenceCodeLabel" for="found-referenceCode">
                  <Translate contentKey="catchControlPanelApp.found.referenceCode">Reference Code</Translate>
                </Label>
                <AvField id="found-referenceCode" type="text" name="referenceCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="found-areaCode">
                  <Translate contentKey="catchControlPanelApp.found.areaCode">Area Code</Translate>
                </Label>
                <AvField id="found-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="found-dateCreated">
                  <Translate contentKey="catchControlPanelApp.found.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="found-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="found-dateModified">
                  <Translate contentKey="catchControlPanelApp.found.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="found-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/found" replace color="info">
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
  foundEntity: storeState.found.entity,
  loading: storeState.found.loading,
  updating: storeState.found.updating,
  updateSuccess: storeState.found.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FoundUpdate);
