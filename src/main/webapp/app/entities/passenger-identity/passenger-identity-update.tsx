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
import { getEntity, updateEntity, createEntity, reset } from './passenger-identity.reducer';
import { IPassengerIdentity } from 'app/shared/model/passenger-identity.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPassengerIdentityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerIdentityUpdate = (props: IPassengerIdentityUpdateProps) => {
  const [userProfileFileTypesId, setUserProfileFileTypesId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { passengerIdentityEntity, userProfileFileTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/passenger-identity');
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
        ...passengerIdentityEntity,
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
          <h2 id="catchControlPanelApp.passengerIdentity.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.passengerIdentity.home.createOrEditLabel">
              Create or edit a PassengerIdentity
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : passengerIdentityEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="passenger-identity-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="passenger-identity-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userCodeLabel" for="passenger-identity-userCode">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.userCode">User Code</Translate>
                </Label>
                <AvField id="passenger-identity-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="passenger-identity-name">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.name">Name</Translate>
                </Label>
                <AvField id="passenger-identity-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="passenger-identity-countryCode">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.countryCode">Country Code</Translate>
                </Label>
                <AvField id="passenger-identity-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="passenger-identity-areaCode">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.areaCode">Area Code</Translate>
                </Label>
                <AvField id="passenger-identity-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="referralCodeLabel" for="passenger-identity-referralCode">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.referralCode">Referral Code</Translate>
                </Label>
                <AvField id="passenger-identity-referralCode" type="text" name="referralCode" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="passenger-identity-gender">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.gender">Gender</Translate>
                </Label>
                <AvField id="passenger-identity-gender" type="text" name="gender" />
              </AvGroup>
              <AvGroup>
                <Label id="companyCodeLabel" for="passenger-identity-companyCode">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.companyCode">Company Code</Translate>
                </Label>
                <AvField id="passenger-identity-companyCode" type="text" name="companyCode" />
              </AvGroup>
              <AvGroup>
                <Label id="currentRatingLabel" for="passenger-identity-currentRating">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.currentRating">Current Rating</Translate>
                </Label>
                <AvField id="passenger-identity-currentRating" type="string" className="form-control" name="currentRating" />
              </AvGroup>
              <AvGroup>
                <Label id="userTypeLabel" for="passenger-identity-userType">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.userType">User Type</Translate>
                </Label>
                <AvField id="passenger-identity-userType" type="text" name="userType" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="passenger-identity-dateCreated">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="passenger-identity-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="passenger-identity-dateModified">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="passenger-identity-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="passenger-identity-userProfileFileTypes">
                  <Translate contentKey="catchControlPanelApp.passengerIdentity.userProfileFileTypes">User Profile File Types</Translate>
                </Label>
                <AvInput id="passenger-identity-userProfileFileTypes" type="select" className="form-control" name="userProfileFileTypes.id">
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
              <Button tag={Link} id="cancel-save" to="/passenger-identity" replace color="info">
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
  passengerIdentityEntity: storeState.passengerIdentity.entity,
  loading: storeState.passengerIdentity.loading,
  updating: storeState.passengerIdentity.updating,
  updateSuccess: storeState.passengerIdentity.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(PassengerIdentityUpdate);
