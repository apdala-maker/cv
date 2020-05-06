import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './code-generator.reducer';
import { ICodeGenerator } from 'app/shared/model/code-generator.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICodeGeneratorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CodeGeneratorUpdate = (props: ICodeGeneratorUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { codeGeneratorEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/code-generator');
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
        ...codeGeneratorEntity,
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
          <h2 id="catchControlPanelApp.codeGenerator.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.codeGenerator.home.createOrEditLabel">Create or edit a CodeGenerator</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : codeGeneratorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="code-generator-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="code-generator-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="seedLabel" for="code-generator-seed">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.seed">Seed</Translate>
                </Label>
                <AvField id="code-generator-seed" type="text" name="seed" />
              </AvGroup>
              <AvGroup>
                <Label id="currentNumberLabel" for="code-generator-currentNumber">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.currentNumber">Current Number</Translate>
                </Label>
                <AvField id="code-generator-currentNumber" type="string" className="form-control" name="currentNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="numberCategoryLabel" for="code-generator-numberCategory">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.numberCategory">Number Category</Translate>
                </Label>
                <AvField id="code-generator-numberCategory" type="text" name="numberCategory" />
              </AvGroup>
              <AvGroup>
                <Label id="prefixLabel" for="code-generator-prefix">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.prefix">Prefix</Translate>
                </Label>
                <AvField id="code-generator-prefix" type="text" name="prefix" />
              </AvGroup>
              <AvGroup>
                <Label id="characterCountLabel" for="code-generator-characterCount">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.characterCount">Character Count</Translate>
                </Label>
                <AvField id="code-generator-characterCount" type="string" className="form-control" name="characterCount" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="code-generator-dateCreated">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="code-generator-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="code-generator-createdBy">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.createdBy">Created By</Translate>
                </Label>
                <AvField id="code-generator-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="code-generator-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="code-generator-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="code-generator-dateModified">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="code-generator-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="code-generator-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="code-generator-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="code-generator-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.codeGenerator.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="code-generator-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/code-generator" replace color="info">
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
  codeGeneratorEntity: storeState.codeGenerator.entity,
  loading: storeState.codeGenerator.loading,
  updating: storeState.codeGenerator.updating,
  updateSuccess: storeState.codeGenerator.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CodeGeneratorUpdate);
