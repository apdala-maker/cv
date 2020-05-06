import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-profile-file-types.reducer';
import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserProfileFileTypesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserProfileFileTypesUpdate = (props: IUserProfileFileTypesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userProfileFileTypesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-profile-file-types');
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
        ...userProfileFileTypesEntity,
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
          <h2 id="catchControlPanelApp.userProfileFileTypes.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.userProfileFileTypes.home.createOrEditLabel">
              Create or edit a UserProfileFileTypes
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userProfileFileTypesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-profile-file-types-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-profile-file-types-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="iSActiveLabel">
                  <AvInput id="user-profile-file-types-iSActive" type="checkbox" className="form-check-input" name="iSActive" />
                  <Translate contentKey="catchControlPanelApp.userProfileFileTypes.iSActive">I S Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="profileImageLabel" for="user-profile-file-types-profileImage">
                  <Translate contentKey="catchControlPanelApp.userProfileFileTypes.profileImage">Profile Image</Translate>
                </Label>
                <AvField id="user-profile-file-types-profileImage" type="text" name="profileImage" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="user-profile-file-types-dateCreated">
                  <Translate contentKey="catchControlPanelApp.userProfileFileTypes.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="user-profile-file-types-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-profile-file-types" replace color="info">
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
  userProfileFileTypesEntity: storeState.userProfileFileTypes.entity,
  loading: storeState.userProfileFileTypes.loading,
  updating: storeState.userProfileFileTypes.updating,
  updateSuccess: storeState.userProfileFileTypes.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileFileTypesUpdate);
