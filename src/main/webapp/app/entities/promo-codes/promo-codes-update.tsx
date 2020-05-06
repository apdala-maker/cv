import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './promo-codes.reducer';
import { IPromoCodes } from 'app/shared/model/promo-codes.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPromoCodesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PromoCodesUpdate = (props: IPromoCodesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { promoCodesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/promo-codes');
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
        ...promoCodesEntity,
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
          <h2 id="catchControlPanelApp.promoCodes.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.promoCodes.home.createOrEditLabel">Create or edit a PromoCodes</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : promoCodesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="promo-codes-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="promo-codes-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="promo-codes-code">
                  <Translate contentKey="catchControlPanelApp.promoCodes.code">Code</Translate>
                </Label>
                <AvField id="promo-codes-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="startHourLabel" for="promo-codes-startHour">
                  <Translate contentKey="catchControlPanelApp.promoCodes.startHour">Start Hour</Translate>
                </Label>
                <AvField id="promo-codes-startHour" type="string" className="form-control" name="startHour" />
              </AvGroup>
              <AvGroup>
                <Label id="endHourLabel" for="promo-codes-endHour">
                  <Translate contentKey="catchControlPanelApp.promoCodes.endHour">End Hour</Translate>
                </Label>
                <AvField id="promo-codes-endHour" type="string" className="form-control" name="endHour" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="promo-codes-dateCreated">
                  <Translate contentKey="catchControlPanelApp.promoCodes.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="promo-codes-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="promo-codes-createdBy">
                  <Translate contentKey="catchControlPanelApp.promoCodes.createdBy">Created By</Translate>
                </Label>
                <AvField id="promo-codes-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="promo-codes-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.promoCodes.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="promo-codes-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="promo-codes-dateModified">
                  <Translate contentKey="catchControlPanelApp.promoCodes.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="promo-codes-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="promo-codes-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.promoCodes.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="promo-codes-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="promo-codes-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.promoCodes.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="promo-codes-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/promo-codes" replace color="info">
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
  promoCodesEntity: storeState.promoCodes.entity,
  loading: storeState.promoCodes.loading,
  updating: storeState.promoCodes.updating,
  updateSuccess: storeState.promoCodes.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodesUpdate);
