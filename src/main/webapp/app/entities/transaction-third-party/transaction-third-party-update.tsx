import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './transaction-third-party.reducer';
import { ITransactionThirdParty } from 'app/shared/model/transaction-third-party.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionThirdPartyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionThirdPartyUpdate = (props: ITransactionThirdPartyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionThirdPartyEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transaction-third-party');
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
        ...transactionThirdPartyEntity,
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
          <h2 id="catchControlPanelApp.transactionThirdParty.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.transactionThirdParty.home.createOrEditLabel">
              Create or edit a TransactionThirdParty
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionThirdPartyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transaction-third-party-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transaction-third-party-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="transaction-third-party-areaCode">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.areaCode">Area Code</Translate>
                </Label>
                <AvField id="transaction-third-party-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="partyCategoryLabel" for="transaction-third-party-partyCategory">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.partyCategory">Party Category</Translate>
                </Label>
                <AvInput
                  id="transaction-third-party-partyCategory"
                  type="select"
                  className="form-control"
                  name="partyCategory"
                  value={(!isNew && transactionThirdPartyEntity.partyCategory) || 'COLLECTOR'}
                >
                  <option value="COLLECTOR">{translate('catchControlPanelApp.PartyCategory.COLLECTOR')}</option>
                  <option value="REMITTER">{translate('catchControlPanelApp.PartyCategory.REMITTER')}</option>
                  <option value="REVOLVING_FUND">{translate('catchControlPanelApp.PartyCategory.REVOLVING_FUND')}</option>
                  <option value="SERVICE_PROVIDER">{translate('catchControlPanelApp.PartyCategory.SERVICE_PROVIDER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="transaction-third-party-code">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.code">Code</Translate>
                </Label>
                <AvField id="transaction-third-party-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="transaction-third-party-name">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.name">Name</Translate>
                </Label>
                <AvField id="transaction-third-party-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="transaction-third-party-country">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.country">Country</Translate>
                </Label>
                <AvField id="transaction-third-party-country" type="text" name="country" />
              </AvGroup>
              <AvGroup>
                <Label id="countyOrStateLabel" for="transaction-third-party-countyOrState">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.countyOrState">County Or State</Translate>
                </Label>
                <AvField id="transaction-third-party-countyOrState" type="text" name="countyOrState" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="transaction-third-party-postalCode">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="transaction-third-party-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="postalAddressLabel" for="transaction-third-party-postalAddress">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.postalAddress">Postal Address</Translate>
                </Label>
                <AvField id="transaction-third-party-postalAddress" type="text" name="postalAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="townLabel" for="transaction-third-party-town">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.town">Town</Translate>
                </Label>
                <AvField id="transaction-third-party-town" type="text" name="town" />
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="transaction-third-party-street">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.street">Street</Translate>
                </Label>
                <AvField id="transaction-third-party-street" type="text" name="street" />
              </AvGroup>
              <AvGroup>
                <Label id="buildingNameOrNumberLabel" for="transaction-third-party-buildingNameOrNumber">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.buildingNameOrNumber">
                    Building Name Or Number
                  </Translate>
                </Label>
                <AvField id="transaction-third-party-buildingNameOrNumber" type="text" name="buildingNameOrNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="primaryPhoneNumberLabel" for="transaction-third-party-primaryPhoneNumber">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.primaryPhoneNumber">Primary Phone Number</Translate>
                </Label>
                <AvField id="transaction-third-party-primaryPhoneNumber" type="text" name="primaryPhoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="secondayPhoneNumberLabel" for="transaction-third-party-secondayPhoneNumber">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.secondayPhoneNumber">Seconday Phone Number</Translate>
                </Label>
                <AvField id="transaction-third-party-secondayPhoneNumber" type="text" name="secondayPhoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="emailAddressLabel" for="transaction-third-party-emailAddress">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.emailAddress">Email Address</Translate>
                </Label>
                <AvField id="transaction-third-party-emailAddress" type="text" name="emailAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="transaction-third-party-dateCreated">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="transaction-third-party-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="transaction-third-party-createdBy">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.createdBy">Created By</Translate>
                </Label>
                <AvField id="transaction-third-party-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="transaction-third-party-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="transaction-third-party-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="transaction-third-party-dateModified">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="transaction-third-party-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="transaction-third-party-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="transaction-third-party-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="transaction-third-party-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="transaction-third-party-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transaction-third-party" replace color="info">
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
  transactionThirdPartyEntity: storeState.transactionThirdParty.entity,
  loading: storeState.transactionThirdParty.loading,
  updating: storeState.transactionThirdParty.updating,
  updateSuccess: storeState.transactionThirdParty.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionThirdPartyUpdate);
