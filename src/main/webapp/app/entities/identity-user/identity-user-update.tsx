import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';
import { getEntities as getUserProfileFileTypes } from 'app/entities/user-profile-file-types/user-profile-file-types.reducer';
import { getEntity, updateEntity, createEntity, reset } from './identity-user.reducer';
import { IIdentityUser } from 'app/shared/model/identity-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIdentityUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IdentityUserUpdate = (props: IIdentityUserUpdateProps) => {
  const [userProfileFileTypesId, setUserProfileFileTypesId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { identityUserEntity, userProfileFileTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/identity-user');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUserProfileFileTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...identityUserEntity,
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
          <h2 id="catchControlPanelApp.identityUser.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.identityUser.home.createOrEditLabel">Create or edit a IdentityUser</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : identityUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="identity-user-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="identity-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="identity-user-userCode">
                  <Translate contentKey="catchControlPanelApp.identityUser.userCode">User Code</Translate>
                </Label>
                <AvField id="identity-user-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="identity-user-name">
                  <Translate contentKey="catchControlPanelApp.identityUser.name">Name</Translate>
                </Label>
                <AvField id="identity-user-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="identity-user-countryCode">
                  <Translate contentKey="catchControlPanelApp.identityUser.countryCode">Country Code</Translate>
                </Label>
                <AvField id="identity-user-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="identity-user-areaCode">
                  <Translate contentKey="catchControlPanelApp.identityUser.areaCode">Area Code</Translate>
                </Label>
                <AvField id="identity-user-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="identity-user-gender">
                  <Translate contentKey="catchControlPanelApp.identityUser.gender">Gender</Translate>
                </Label>
                <AvField id="identity-user-gender" type="text" name="gender" />
              </AvGroup>
              <AvGroup>
                <Label id="companyCodeLabel" for="identity-user-companyCode">
                  <Translate contentKey="catchControlPanelApp.identityUser.companyCode">Company Code</Translate>
                </Label>
                <AvField id="identity-user-companyCode" type="text" name="companyCode" />
              </AvGroup>
              <AvGroup>
                <Label id="affliateCodeLabel" for="identity-user-affliateCode">
                  <Translate contentKey="catchControlPanelApp.identityUser.affliateCode">Affliate Code</Translate>
                </Label>
                <AvField id="identity-user-affliateCode" type="text" name="affliateCode" />
              </AvGroup>
              <AvGroup>
                <Label id="currentRatingLabel" for="identity-user-currentRating">
                  <Translate contentKey="catchControlPanelApp.identityUser.currentRating">Current Rating</Translate>
                </Label>
                <AvField id="identity-user-currentRating" type="string" className="form-control" name="currentRating" />
              </AvGroup>
              <AvGroup>
                <Label id="userTypeLabel" for="identity-user-userType">
                  <Translate contentKey="catchControlPanelApp.identityUser.userType">User Type</Translate>
                </Label>
                <AvField id="identity-user-userType" type="text" name="userType" />
              </AvGroup>
              <AvGroup check>
                <Label id="isActiveLabel">
                  <AvInput id="identity-user-isActive" type="checkbox" className="form-check-input" name="isActive" />
                  <Translate contentKey="catchControlPanelApp.identityUser.isActive">Is Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="registrationStepLabel" for="identity-user-registrationStep">
                  <Translate contentKey="catchControlPanelApp.identityUser.registrationStep">Registration Step</Translate>
                </Label>
                <AvField id="identity-user-registrationStep" type="text" name="registrationStep" />
              </AvGroup>
              <AvGroup check>
                <Label id="isApprovedLabel">
                  <AvInput id="identity-user-isApproved" type="checkbox" className="form-check-input" name="isApproved" />
                  <Translate contentKey="catchControlPanelApp.identityUser.isApproved">Is Approved</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="approvedByLabel" for="identity-user-approvedBy">
                  <Translate contentKey="catchControlPanelApp.identityUser.approvedBy">Approved By</Translate>
                </Label>
                <AvField id="identity-user-approvedBy" type="text" name="approvedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="activatedByLabel" for="identity-user-activatedBy">
                  <Translate contentKey="catchControlPanelApp.identityUser.activatedBy">Activated By</Translate>
                </Label>
                <AvField id="identity-user-activatedBy" type="text" name="activatedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="identity-user-dateCreated">
                  <Translate contentKey="catchControlPanelApp.identityUser.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="identity-user-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="identity-user-dateModified">
                  <Translate contentKey="catchControlPanelApp.identityUser.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="identity-user-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="identity-user-userProfileFileTypes">
                  <Translate contentKey="catchControlPanelApp.identityUser.userProfileFileTypes">User Profile File Types</Translate>
                </Label>
                <AvInput id="identity-user-userProfileFileTypes" type="select" className="form-control" name="userProfileFileTypes.id">
                  <option value="" key="0" />
                  {userProfileFileTypes
                    ? userProfileFileTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.profileImage}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/identity-user" replace color="info">
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
  userProfileFileTypes: storeState.userProfileFileTypes.entities,
  identityUserEntity: storeState.identityUser.entity,
  loading: storeState.identityUser.loading,
  updating: storeState.identityUser.updating,
  updateSuccess: storeState.identityUser.updateSuccess
});

const mapDispatchToProps = {
  getUserProfileFileTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IdentityUserUpdate);
