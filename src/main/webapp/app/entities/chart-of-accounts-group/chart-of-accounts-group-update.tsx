import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './chart-of-accounts-group.reducer';
import { IChartOfAccountsGroup } from 'app/shared/model/chart-of-accounts-group.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChartOfAccountsGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChartOfAccountsGroupUpdate = (props: IChartOfAccountsGroupUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { chartOfAccountsGroupEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/chart-of-accounts-group');
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
        ...chartOfAccountsGroupEntity,
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
          <h2 id="catchControlPanelApp.chartOfAccountsGroup.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.home.createOrEditLabel">
              Create or edit a ChartOfAccountsGroup
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : chartOfAccountsGroupEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="chart-of-accounts-group-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="chart-of-accounts-group-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="chart-of-accounts-group-code">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.code">Code</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="accountTypeLabel" for="chart-of-accounts-group-accountType">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.accountType">Account Type</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-accountType" type="text" name="accountType" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="chart-of-accounts-group-description">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.description">Description</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="chart-of-accounts-group-dateCreated">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="chart-of-accounts-group-createdBy">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.createdBy">Created By</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="chart-of-accounts-group-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="chart-of-accounts-group-dateModified">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="chart-of-accounts-group-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="chart-of-accounts-group-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="chart-of-accounts-group-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/chart-of-accounts-group" replace color="info">
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
  chartOfAccountsGroupEntity: storeState.chartOfAccountsGroup.entity,
  loading: storeState.chartOfAccountsGroup.loading,
  updating: storeState.chartOfAccountsGroup.updating,
  updateSuccess: storeState.chartOfAccountsGroup.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountsGroupUpdate);
