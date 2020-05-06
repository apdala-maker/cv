import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './online-times.reducer';
import { IOnlineTimes } from 'app/shared/model/online-times.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOnlineTimesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OnlineTimesUpdate = (props: IOnlineTimesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { onlineTimesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/online-times');
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
        ...onlineTimesEntity,
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
          <h2 id="catchControlPanelApp.onlineTimes.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.onlineTimes.home.createOrEditLabel">Create or edit a OnlineTimes</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : onlineTimesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="online-times-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="online-times-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startLabel" for="online-times-start">
                  <Translate contentKey="catchControlPanelApp.onlineTimes.start">Start</Translate>
                </Label>
                <AvField id="online-times-start" type="date" className="form-control" name="start" />
              </AvGroup>
              <AvGroup>
                <Label id="finishLabel" for="online-times-finish">
                  <Translate contentKey="catchControlPanelApp.onlineTimes.finish">Finish</Translate>
                </Label>
                <AvField id="online-times-finish" type="date" className="form-control" name="finish" />
              </AvGroup>
              <AvGroup>
                <Label id="driverCodeLabel" for="online-times-driverCode">
                  <Translate contentKey="catchControlPanelApp.onlineTimes.driverCode">Driver Code</Translate>
                </Label>
                <AvField id="online-times-driverCode" type="text" name="driverCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="online-times-areaCode">
                  <Translate contentKey="catchControlPanelApp.onlineTimes.areaCode">Area Code</Translate>
                </Label>
                <AvField id="online-times-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="online-times-dateCreated">
                  <Translate contentKey="catchControlPanelApp.onlineTimes.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="online-times-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="online-times-dateModified">
                  <Translate contentKey="catchControlPanelApp.onlineTimes.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="online-times-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/online-times" replace color="info">
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
  onlineTimesEntity: storeState.onlineTimes.entity,
  loading: storeState.onlineTimes.loading,
  updating: storeState.onlineTimes.updating,
  updateSuccess: storeState.onlineTimes.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OnlineTimesUpdate);
