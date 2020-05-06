import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './otp.reducer';
import { IOTP } from 'app/shared/model/otp.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOTPUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OTPUpdate = (props: IOTPUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { oTPEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/otp');
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
        ...oTPEntity,
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
          <h2 id="catchControlPanelApp.oTP.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.oTP.home.createOrEditLabel">Create or edit a OTP</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : oTPEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="otp-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="otp-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="phoneNumberLabel" for="otp-phoneNumber">
                  <Translate contentKey="catchControlPanelApp.oTP.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="otp-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="userCodeLabel" for="otp-userCode">
                  <Translate contentKey="catchControlPanelApp.oTP.userCode">User Code</Translate>
                </Label>
                <AvField id="otp-userCode" type="text" name="userCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="otp-areaCode">
                  <Translate contentKey="catchControlPanelApp.oTP.areaCode">Area Code</Translate>
                </Label>
                <AvField id="otp-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="oTPCodeLabel" for="otp-oTPCode">
                  <Translate contentKey="catchControlPanelApp.oTP.oTPCode">O TP Code</Translate>
                </Label>
                <AvField id="otp-oTPCode" type="text" name="oTPCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="otp-dateCreated">
                  <Translate contentKey="catchControlPanelApp.oTP.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="otp-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="otp-dateModified">
                  <Translate contentKey="catchControlPanelApp.oTP.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="otp-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/otp" replace color="info">
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
  oTPEntity: storeState.oTP.entity,
  loading: storeState.oTP.loading,
  updating: storeState.oTP.updating,
  updateSuccess: storeState.oTP.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OTPUpdate);
