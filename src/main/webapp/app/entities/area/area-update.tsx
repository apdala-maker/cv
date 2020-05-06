import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAreaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaUpdate = (props: IAreaUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { areaEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/area');
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
        ...areaEntity,
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
          <h2 id="catchControlPanelApp.area.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.area.home.createOrEditLabel">Create or edit a Area</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : areaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="area-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="area-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="countryCodeLabel" for="area-countryCode">
                  <Translate contentKey="catchControlPanelApp.area.countryCode">Country Code</Translate>
                </Label>
                <AvField id="area-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="area-areaCode">
                  <Translate contentKey="catchControlPanelApp.area.areaCode">Area Code</Translate>
                </Label>
                <AvField id="area-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="area-address">
                  <Translate contentKey="catchControlPanelApp.area.address">Address</Translate>
                </Label>
                <AvField id="area-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="area-name">
                  <Translate contentKey="catchControlPanelApp.area.name">Name</Translate>
                </Label>
                <AvField id="area-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="northEastLatitudeLabel" for="area-northEastLatitude">
                  <Translate contentKey="catchControlPanelApp.area.northEastLatitude">North East Latitude</Translate>
                </Label>
                <AvField id="area-northEastLatitude" type="text" name="northEastLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="southWestLatitudeLabel" for="area-southWestLatitude">
                  <Translate contentKey="catchControlPanelApp.area.southWestLatitude">South West Latitude</Translate>
                </Label>
                <AvField id="area-southWestLatitude" type="text" name="southWestLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="northEastLongitudeLabel" for="area-northEastLongitude">
                  <Translate contentKey="catchControlPanelApp.area.northEastLongitude">North East Longitude</Translate>
                </Label>
                <AvField id="area-northEastLongitude" type="text" name="northEastLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="southWestLongitudeLabel" for="area-southWestLongitude">
                  <Translate contentKey="catchControlPanelApp.area.southWestLongitude">South West Longitude</Translate>
                </Label>
                <AvField id="area-southWestLongitude" type="text" name="southWestLongitude" />
              </AvGroup>
              <AvGroup check>
                <Label id="isActiveLabel">
                  <AvInput id="area-isActive" type="checkbox" className="form-check-input" name="isActive" />
                  <Translate contentKey="catchControlPanelApp.area.isActive">Is Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isApprovedLabel">
                  <AvInput id="area-isApproved" type="checkbox" className="form-check-input" name="isApproved" />
                  <Translate contentKey="catchControlPanelApp.area.isApproved">Is Approved</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="approvedByLabel" for="area-approvedBy">
                  <Translate contentKey="catchControlPanelApp.area.approvedBy">Approved By</Translate>
                </Label>
                <AvField id="area-approvedBy" type="text" name="approvedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="activatedByLabel" for="area-activatedBy">
                  <Translate contentKey="catchControlPanelApp.area.activatedBy">Activated By</Translate>
                </Label>
                <AvField id="area-activatedBy" type="text" name="activatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="area-dateCreated">
                  <Translate contentKey="catchControlPanelApp.area.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="area-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="area-createdBy">
                  <Translate contentKey="catchControlPanelApp.area.createdBy">Created By</Translate>
                </Label>
                <AvField id="area-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="area-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.area.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="area-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="area-dateModified">
                  <Translate contentKey="catchControlPanelApp.area.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="area-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="area-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.area.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="area-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="area-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.area.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="area-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/area" replace color="info">
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
  areaEntity: storeState.area.entity,
  loading: storeState.area.loading,
  updating: storeState.area.updating,
  updateSuccess: storeState.area.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaUpdate);
