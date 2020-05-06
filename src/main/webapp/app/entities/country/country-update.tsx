import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICountryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryUpdate = (props: ICountryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { countryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/country');
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
        ...countryEntity,
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
          <h2 id="catchControlPanelApp.country.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.country.home.createOrEditLabel">Create or edit a Country</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : countryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="country-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="country-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="countryNameLabel" for="country-countryName">
                  <Translate contentKey="catchControlPanelApp.country.countryName">Country Name</Translate>
                </Label>
                <AvField id="country-countryName" type="text" name="countryName" />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="country-countryCode">
                  <Translate contentKey="catchControlPanelApp.country.countryCode">Country Code</Translate>
                </Label>
                <AvField id="country-countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="currencyNameLabel" for="country-currencyName">
                  <Translate contentKey="catchControlPanelApp.country.currencyName">Currency Name</Translate>
                </Label>
                <AvField id="country-currencyName" type="text" name="currencyName" />
              </AvGroup>
              <AvGroup>
                <Label id="currencyCodeLabel" for="country-currencyCode">
                  <Translate contentKey="catchControlPanelApp.country.currencyCode">Currency Code</Translate>
                </Label>
                <AvField id="country-currencyCode" type="text" name="currencyCode" />
              </AvGroup>
              <AvGroup>
                <Label id="currencySymbolLabel" for="country-currencySymbol">
                  <Translate contentKey="catchControlPanelApp.country.currencySymbol">Currency Symbol</Translate>
                </Label>
                <AvField id="country-currencySymbol" type="text" name="currencySymbol" />
              </AvGroup>
              <AvGroup>
                <Label id="languageLabel" for="country-language">
                  <Translate contentKey="catchControlPanelApp.country.language">Language</Translate>
                </Label>
                <AvField id="country-language" type="text" name="language" />
              </AvGroup>
              <AvGroup>
                <Label id="timeZoneLabel" for="country-timeZone">
                  <Translate contentKey="catchControlPanelApp.country.timeZone">Time Zone</Translate>
                </Label>
                <AvField id="country-timeZone" type="text" name="timeZone" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="country-dateCreated">
                  <Translate contentKey="catchControlPanelApp.country.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="country-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="country-createdBy">
                  <Translate contentKey="catchControlPanelApp.country.createdBy">Created By</Translate>
                </Label>
                <AvField id="country-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="country-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.country.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="country-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="country-dateModified">
                  <Translate contentKey="catchControlPanelApp.country.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="country-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="country-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.country.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="country-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="country-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.country.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="country-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/country" replace color="info">
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
  countryEntity: storeState.country.entity,
  loading: storeState.country.loading,
  updating: storeState.country.updating,
  updateSuccess: storeState.country.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryUpdate);
