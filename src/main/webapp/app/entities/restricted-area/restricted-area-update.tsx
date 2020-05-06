import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './restricted-area.reducer';
import { IRestrictedArea } from 'app/shared/model/restricted-area.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRestrictedAreaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RestrictedAreaUpdate = (props: IRestrictedAreaUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { restrictedAreaEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/restricted-area');
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
        ...restrictedAreaEntity,
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
          <h2 id="catchControlPanelApp.restrictedArea.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.restrictedArea.home.createOrEditLabel">Create or edit a RestrictedArea</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : restrictedAreaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="restricted-area-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="restricted-area-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="restricted-area-areaCode">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.areaCode">Area Code</Translate>
                </Label>
                <AvField id="restricted-area-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="restricted-area-name">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.name">Name</Translate>
                </Label>
                <AvField id="restricted-area-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="northEastLatitudeLabel" for="restricted-area-northEastLatitude">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.northEastLatitude">North East Latitude</Translate>
                </Label>
                <AvField id="restricted-area-northEastLatitude" type="text" name="northEastLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="southWestLatitudeLabel" for="restricted-area-southWestLatitude">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.southWestLatitude">South West Latitude</Translate>
                </Label>
                <AvField id="restricted-area-southWestLatitude" type="text" name="southWestLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="northEastLongitudeLabel" for="restricted-area-northEastLongitude">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.northEastLongitude">North East Longitude</Translate>
                </Label>
                <AvField id="restricted-area-northEastLongitude" type="text" name="northEastLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="southWestLongitudeLabel" for="restricted-area-southWestLongitude">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.southWestLongitude">South West Longitude</Translate>
                </Label>
                <AvField id="restricted-area-southWestLongitude" type="text" name="southWestLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleTypeCodeLabel" for="restricted-area-vehicleTypeCode">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.vehicleTypeCode">Vehicle Type Code</Translate>
                </Label>
                <AvField id="restricted-area-vehicleTypeCode" type="text" name="vehicleTypeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="restricted-area-dateCreated">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="restricted-area-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="restricted-area-createdBy">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.createdBy">Created By</Translate>
                </Label>
                <AvField id="restricted-area-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="restricted-area-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="restricted-area-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="restricted-area-dateModified">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="restricted-area-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="restricted-area-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="restricted-area-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="restricted-area-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.restrictedArea.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="restricted-area-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/restricted-area" replace color="info">
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
  restrictedAreaEntity: storeState.restrictedArea.entity,
  loading: storeState.restrictedArea.loading,
  updating: storeState.restrictedArea.updating,
  updateSuccess: storeState.restrictedArea.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedAreaUpdate);
