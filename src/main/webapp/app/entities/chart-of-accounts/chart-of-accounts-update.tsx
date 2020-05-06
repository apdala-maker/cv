import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './chart-of-accounts.reducer';
import { IChartOfAccounts } from 'app/shared/model/chart-of-accounts.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChartOfAccountsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChartOfAccountsUpdate = (props: IChartOfAccountsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { chartOfAccountsEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/chart-of-accounts');
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
        ...chartOfAccountsEntity,
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
          <h2 id="catchControlPanelApp.chartOfAccounts.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.chartOfAccounts.home.createOrEditLabel">Create or edit a ChartOfAccounts</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : chartOfAccountsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="chart-of-accounts-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="chart-of-accounts-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaCodeLabel" for="chart-of-accounts-areaCode">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.areaCode">Area Code</Translate>
                </Label>
                <AvField id="chart-of-accounts-areaCode" type="text" name="areaCode" />
              </AvGroup>
              <AvGroup>
                <Label id="accountCodeLabel" for="chart-of-accounts-accountCode">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.accountCode">Account Code</Translate>
                </Label>
                <AvField id="chart-of-accounts-accountCode" type="text" name="accountCode" />
              </AvGroup>
              <AvGroup>
                <Label id="accountNameLabel" for="chart-of-accounts-accountName">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.accountName">Account Name</Translate>
                </Label>
                <AvField id="chart-of-accounts-accountName" type="text" name="accountName" />
              </AvGroup>
              <AvGroup>
                <Label id="isCJAccountLabel" for="chart-of-accounts-isCJAccount">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.isCJAccount">Is CJ Account</Translate>
                </Label>
                <AvField id="chart-of-accounts-isCJAccount" type="text" name="isCJAccount" />
              </AvGroup>
              <AvGroup>
                <Label id="cOAGroupCodeLabel" for="chart-of-accounts-cOAGroupCode">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.cOAGroupCode">C OA Group Code</Translate>
                </Label>
                <AvField id="chart-of-accounts-cOAGroupCode" type="text" name="cOAGroupCode" />
              </AvGroup>
              <AvGroup>
                <Label id="systemPostedLabel" for="chart-of-accounts-systemPosted">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.systemPosted">System Posted</Translate>
                </Label>
                <AvField id="chart-of-accounts-systemPosted" type="text" name="systemPosted" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="chart-of-accounts-dateCreated">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="chart-of-accounts-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="chart-of-accounts-createdBy">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.createdBy">Created By</Translate>
                </Label>
                <AvField id="chart-of-accounts-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="chart-of-accounts-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="chart-of-accounts-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="chart-of-accounts-dateModified">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="chart-of-accounts-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="chart-of-accounts-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="chart-of-accounts-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="chart-of-accounts-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.chartOfAccounts.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="chart-of-accounts-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/chart-of-accounts" replace color="info">
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
  chartOfAccountsEntity: storeState.chartOfAccounts.entity,
  loading: storeState.chartOfAccounts.loading,
  updating: storeState.chartOfAccounts.updating,
  updateSuccess: storeState.chartOfAccounts.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountsUpdate);
