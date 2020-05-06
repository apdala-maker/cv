import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './price.reducer';
import { IPrice } from 'app/shared/model/price.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPriceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PriceUpdate = (props: IPriceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { priceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/price');
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
        ...priceEntity,
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
          <h2 id="catchControlPanelApp.price.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.price.home.createOrEditLabel">Create or edit a Price</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : priceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="price-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="price-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="priceCodeLabel" for="price-priceCode">
                  <Translate contentKey="catchControlPanelApp.price.priceCode">Price Code</Translate>
                </Label>
                <AvField id="price-priceCode" type="text" name="priceCode" />
              </AvGroup>
              <AvGroup>
                <Label id="startTimeLabel" for="price-startTime">
                  <Translate contentKey="catchControlPanelApp.price.startTime">Start Time</Translate>
                </Label>
                <AvField id="price-startTime" type="date" className="form-control" name="startTime" />
              </AvGroup>
              <AvGroup>
                <Label id="endTimeLabel" for="price-endTime">
                  <Translate contentKey="catchControlPanelApp.price.endTime">End Time</Translate>
                </Label>
                <AvField id="price-endTime" type="date" className="form-control" name="endTime" />
              </AvGroup>
              <AvGroup>
                <Label id="pricePerMinuteLabel" for="price-pricePerMinute">
                  <Translate contentKey="catchControlPanelApp.price.pricePerMinute">Price Per Minute</Translate>
                </Label>
                <AvField id="price-pricePerMinute" type="string" className="form-control" name="pricePerMinute" />
              </AvGroup>
              <AvGroup>
                <Label id="pricePerDistantUnitLabel" for="price-pricePerDistantUnit">
                  <Translate contentKey="catchControlPanelApp.price.pricePerDistantUnit">Price Per Distant Unit</Translate>
                </Label>
                <AvField id="price-pricePerDistantUnit" type="string" className="form-control" name="pricePerDistantUnit" />
              </AvGroup>
              <AvGroup>
                <Label id="minimumSpeedForPricePerMinuteLabel" for="price-minimumSpeedForPricePerMinute">
                  <Translate contentKey="catchControlPanelApp.price.minimumSpeedForPricePerMinute">
                    Minimum Speed For Price Per Minute
                  </Translate>
                </Label>
                <AvField
                  id="price-minimumSpeedForPricePerMinute"
                  type="string"
                  className="form-control"
                  name="minimumSpeedForPricePerMinute"
                />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="price-areaCode">
                  <Translate contentKey="catchControlPanelApp.price.areaCode">Area Code</Translate>
                </Label>
                <AvField id="price-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleTypeCodeLabel" for="price-vehicleTypeCode">
                  <Translate contentKey="catchControlPanelApp.price.vehicleTypeCode">Vehicle Type Code</Translate>
                </Label>
                <AvField id="price-vehicleTypeCode" type="text" name="vehicleTypeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cancellationFeeLabel" for="price-cancellationFee">
                  <Translate contentKey="catchControlPanelApp.price.cancellationFee">Cancellation Fee</Translate>
                </Label>
                <AvField id="price-cancellationFee" type="string" className="form-control" name="cancellationFee" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="price-dateCreated">
                  <Translate contentKey="catchControlPanelApp.price.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="price-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="price-createdBy">
                  <Translate contentKey="catchControlPanelApp.price.createdBy">Created By</Translate>
                </Label>
                <AvField id="price-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="price-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.price.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="price-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="price-dateModified">
                  <Translate contentKey="catchControlPanelApp.price.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="price-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="price-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.price.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="price-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="price-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.price.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="price-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/price" replace color="info">
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
  priceEntity: storeState.price.entity,
  loading: storeState.price.loading,
  updating: storeState.price.updating,
  updateSuccess: storeState.price.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PriceUpdate);
