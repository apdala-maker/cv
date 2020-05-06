import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyUpdate = (props: ICompanyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { companyEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/company');
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
        ...companyEntity,
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
          <h2 id="catchControlPanelApp.company.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.company.home.createOrEditLabel">Create or edit a Company</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : companyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="company-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="displayNameLabel" for="company-displayName">
                  <Translate contentKey="catchControlPanelApp.company.displayName">Display Name</Translate>
                </Label>
                <AvField id="company-displayName" type="text" name="displayName" />
              </AvGroup>
              <AvGroup>
                <Label id="legalOrTradingNameLabel" for="company-legalOrTradingName">
                  <Translate contentKey="catchControlPanelApp.company.legalOrTradingName">Legal Or Trading Name</Translate>
                </Label>
                <AvField id="company-legalOrTradingName" type="text" name="legalOrTradingName" />
              </AvGroup>
              <AvGroup>
                <Label id="registrationNumberLabel" for="company-registrationNumber">
                  <Translate contentKey="catchControlPanelApp.company.registrationNumber">Registration Number</Translate>
                </Label>
                <AvField id="company-registrationNumber" type="text" name="registrationNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="registrationDateLabel" for="company-registrationDate">
                  <Translate contentKey="catchControlPanelApp.company.registrationDate">Registration Date</Translate>
                </Label>
                <AvField id="company-registrationDate" type="date" className="form-control" name="registrationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="companyCodeLabel" for="company-companyCode">
                  <Translate contentKey="catchControlPanelApp.company.companyCode">Company Code</Translate>
                </Label>
                <AvField id="company-companyCode" type="text" name="companyCode" />
              </AvGroup>
              <AvGroup>
                <Label id="areaCodeLabel" for="company-areaCode">
                  <Translate contentKey="catchControlPanelApp.company.areaCode">Area Code</Translate>
                </Label>
                <AvField id="company-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="countyOrStateLabel" for="company-countyOrState">
                  <Translate contentKey="catchControlPanelApp.company.countyOrState">County Or State</Translate>
                </Label>
                <AvField id="company-countyOrState" type="text" name="countyOrState" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="company-postalCode">
                  <Translate contentKey="catchControlPanelApp.company.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="company-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="postalAddressLabel" for="company-postalAddress">
                  <Translate contentKey="catchControlPanelApp.company.postalAddress">Postal Address</Translate>
                </Label>
                <AvField id="company-postalAddress" type="text" name="postalAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="cityOrTownLabel" for="company-cityOrTown">
                  <Translate contentKey="catchControlPanelApp.company.cityOrTown">City Or Town</Translate>
                </Label>
                <AvField id="company-cityOrTown" type="text" name="cityOrTown" />
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="company-street">
                  <Translate contentKey="catchControlPanelApp.company.street">Street</Translate>
                </Label>
                <AvField id="company-street" type="text" name="street" />
              </AvGroup>
              <AvGroup>
                <Label id="buildingNameOrNumberLabel" for="company-buildingNameOrNumber">
                  <Translate contentKey="catchControlPanelApp.company.buildingNameOrNumber">Building Name Or Number</Translate>
                </Label>
                <AvField id="company-buildingNameOrNumber" type="text" name="buildingNameOrNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="primaryPhoneNumberLabel" for="company-primaryPhoneNumber">
                  <Translate contentKey="catchControlPanelApp.company.primaryPhoneNumber">Primary Phone Number</Translate>
                </Label>
                <AvField id="company-primaryPhoneNumber" type="text" name="primaryPhoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="secondaryPhoneNumberLabel" for="company-secondaryPhoneNumber">
                  <Translate contentKey="catchControlPanelApp.company.secondaryPhoneNumber">Secondary Phone Number</Translate>
                </Label>
                <AvField id="company-secondaryPhoneNumber" type="text" name="secondaryPhoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="emailAddressLabel" for="company-emailAddress">
                  <Translate contentKey="catchControlPanelApp.company.emailAddress">Email Address</Translate>
                </Label>
                <AvField id="company-emailAddress" type="text" name="emailAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="websiteLabel" for="company-website">
                  <Translate contentKey="catchControlPanelApp.company.website">Website</Translate>
                </Label>
                <AvField id="company-website" type="text" name="website" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="company-dateCreated">
                  <Translate contentKey="catchControlPanelApp.company.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="company-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="company-createdBy">
                  <Translate contentKey="catchControlPanelApp.company.createdBy">Created By</Translate>
                </Label>
                <AvField id="company-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="company-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.company.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="company-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="company-dateModified">
                  <Translate contentKey="catchControlPanelApp.company.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="company-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="company-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.company.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="company-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="company-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.company.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="company-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/company" replace color="info">
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
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUpdate);
