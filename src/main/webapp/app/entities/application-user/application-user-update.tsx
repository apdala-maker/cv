import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './application-user.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationUserUpdate = (props: IApplicationUserUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationUserEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application-user');
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
        ...applicationUserEntity,
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
          <h2 id="catchControlPanelApp.applicationUser.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.applicationUser.home.createOrEditLabel">Create or edit a ApplicationUser</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-user-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="application-user-userCode">
                  <Translate contentKey="catchControlPanelApp.applicationUser.userCode">User Code</Translate>
                </Label>
                <AvField id="application-user-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="application-user-name">
                  <Translate contentKey="catchControlPanelApp.applicationUser.name">Name</Translate>
                </Label>
                <AvField id="application-user-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="application-user-countryCode">
                  <Translate contentKey="catchControlPanelApp.applicationUser.countryCode">Country Code</Translate>
                </Label>
                <AvField id="application-user-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="application-user-areaCode">
                  <Translate contentKey="catchControlPanelApp.applicationUser.areaCode">Area Code</Translate>
                </Label>
                <AvField id="application-user-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="application-user-gender">
                  <Translate contentKey="catchControlPanelApp.applicationUser.gender">Gender</Translate>
                </Label>
                <AvField id="application-user-gender" type="text" name="gender" />
              </AvGroup>
              <AvGroup>
                <Label id="companyCodeLabel" for="application-user-companyCode">
                  <Translate contentKey="catchControlPanelApp.applicationUser.companyCode">Company Code</Translate>
                </Label>
                <AvField id="application-user-companyCode" type="text" name="companyCode" />
              </AvGroup>
              <AvGroup>
                <Label id="currentRatingLabel" for="application-user-currentRating">
                  <Translate contentKey="catchControlPanelApp.applicationUser.currentRating">Current Rating</Translate>
                </Label>
                <AvField id="application-user-currentRating" type="string" className="form-control" name="currentRating" />
              </AvGroup>
              <AvGroup>
                <Label id="userTypeLabel" for="application-user-userType">
                  <Translate contentKey="catchControlPanelApp.applicationUser.userType">User Type</Translate>
                </Label>
                <AvField id="application-user-userType" type="text" name="userType" />
              </AvGroup>
              <AvGroup check>
                <Label id="isActiveLabel">
                  <AvInput id="application-user-isActive" type="checkbox" className="form-check-input" name="isActive" />
                  <Translate contentKey="catchControlPanelApp.applicationUser.isActive">Is Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isApprovedLabel">
                  <AvInput id="application-user-isApproved" type="checkbox" className="form-check-input" name="isApproved" />
                  <Translate contentKey="catchControlPanelApp.applicationUser.isApproved">Is Approved</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="approvedByLabel" for="application-user-approvedBy">
                  <Translate contentKey="catchControlPanelApp.applicationUser.approvedBy">Approved By</Translate>
                </Label>
                <AvField id="application-user-approvedBy" type="text" name="approvedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="activatedByLabel" for="application-user-activatedBy">
                  <Translate contentKey="catchControlPanelApp.applicationUser.activatedBy">Activated By</Translate>
                </Label>
                <AvField id="application-user-activatedBy" type="text" name="activatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="imageUrlLabel" for="application-user-imageUrl">
                  <Translate contentKey="catchControlPanelApp.applicationUser.imageUrl">Image Url</Translate>
                </Label>
                <AvField id="application-user-imageUrl" type="text" name="imageUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="application-user-dateCreated">
                  <Translate contentKey="catchControlPanelApp.applicationUser.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="application-user-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="application-user-createdBy">
                  <Translate contentKey="catchControlPanelApp.applicationUser.createdBy">Created By</Translate>
                </Label>
                <AvField id="application-user-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="application-user-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.applicationUser.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="application-user-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="application-user-dateModified">
                  <Translate contentKey="catchControlPanelApp.applicationUser.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="application-user-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="application-user-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.applicationUser.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="application-user-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="application-user-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.applicationUser.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="application-user-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/application-user" replace color="info">
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
  applicationUserEntity: storeState.applicationUser.entity,
  loading: storeState.applicationUser.loading,
  updating: storeState.applicationUser.updating,
  updateSuccess: storeState.applicationUser.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUserUpdate);
