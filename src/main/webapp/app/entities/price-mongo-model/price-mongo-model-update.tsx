import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './price-mongo-model.reducer';
import { IPriceMongoModel } from 'app/shared/model/price-mongo-model.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPriceMongoModelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PriceMongoModelUpdate = (props: IPriceMongoModelUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { priceMongoModelEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/price-mongo-model');
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
        ...priceMongoModelEntity,
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
          <h2 id="catchControlPanelApp.priceMongoModel.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.priceMongoModel.home.createOrEditLabel">Create or edit a PriceMongoModel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : priceMongoModelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="price-mongo-model-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="price-mongo-model-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amountToBePaidLabel" for="price-mongo-model-amountToBePaid">
                  <Translate contentKey="catchControlPanelApp.priceMongoModel.amountToBePaid">Amount To Be Paid</Translate>
                </Label>
                <AvField id="price-mongo-model-amountToBePaid" type="text" name="amountToBePaid" />
              </AvGroup>
              <AvGroup check>
                <Label id="isPaidLabel">
                  <AvInput id="price-mongo-model-isPaid" type="checkbox" className="form-check-input" name="isPaid" />
                  <Translate contentKey="catchControlPanelApp.priceMongoModel.isPaid">Is Paid</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/price-mongo-model" replace color="info">
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
  priceMongoModelEntity: storeState.priceMongoModel.entity,
  loading: storeState.priceMongoModel.loading,
  updating: storeState.priceMongoModel.updating,
  updateSuccess: storeState.priceMongoModel.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PriceMongoModelUpdate);
