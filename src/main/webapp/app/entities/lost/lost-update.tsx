import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './lost.reducer';
import { ILost } from 'app/shared/model/lost.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILostUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LostUpdate = (props: ILostUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { lostEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/lost');
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
        ...lostEntity,
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
          <h2 id="catchControlPanelApp.lost.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.lost.home.createOrEditLabel">Create or edit a Lost</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : lostEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="lost-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="lost-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tripCodeLabel" for="lost-tripCode">
                  <Translate contentKey="catchControlPanelApp.lost.tripCode">Trip Code</Translate>
                </Label>
                <AvField id="lost-tripCode" type="text" name="tripCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateLostLabel" for="lost-dateLost">
                  <Translate contentKey="catchControlPanelApp.lost.dateLost">Date Lost</Translate>
                </Label>
                <AvField id="lost-dateLost" type="date" className="form-control" name="dateLost" />
              </AvGroup>
              <AvGroup>
                <Label id="userCodeLabel" for="lost-userCode">
                  <Translate contentKey="catchControlPanelApp.lost.userCode">User Code</Translate>
                </Label>
                <AvField id="lost-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="lost-description">
                  <Translate contentKey="catchControlPanelApp.lost.description">Description</Translate>
                </Label>
                <AvField id="lost-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="itemNameLabel" for="lost-itemName">
                  <Translate contentKey="catchControlPanelApp.lost.itemName">Item Name</Translate>
                </Label>
                <AvField id="lost-itemName" type="text" name="itemName" />
              </AvGroup>
              <AvGroup check>
                <Label id="isFoundLabel">
                  <AvInput id="lost-isFound" type="checkbox" className="form-check-input" name="isFound" />
                  <Translate contentKey="catchControlPanelApp.lost.isFound">Is Found</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="referenceCodeLabel" for="lost-referenceCode">
                  <Translate contentKey="catchControlPanelApp.lost.referenceCode">Reference Code</Translate>
                </Label>
                <AvField id="lost-referenceCode" type="text" name="referenceCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="lost-areaCode">
                  <Translate contentKey="catchControlPanelApp.lost.areaCode">Area Code</Translate>
                </Label>
                <AvField id="lost-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="lost-dateCreated">
                  <Translate contentKey="catchControlPanelApp.lost.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="lost-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="lost-dateModified">
                  <Translate contentKey="catchControlPanelApp.lost.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="lost-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/lost" replace color="info">
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
  lostEntity: storeState.lost.entity,
  loading: storeState.lost.loading,
  updating: storeState.lost.updating,
  updateSuccess: storeState.lost.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LostUpdate);
