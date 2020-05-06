import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './mongo-file-types.reducer';
import { IMongoFileTypes } from 'app/shared/model/mongo-file-types.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMongoFileTypesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MongoFileTypesUpdate = (props: IMongoFileTypesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { mongoFileTypesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/mongo-file-types');
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
        ...mongoFileTypesEntity,
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
          <h2 id="catchControlPanelApp.mongoFileTypes.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.mongoFileTypes.home.createOrEditLabel">Create or edit a MongoFileTypes</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : mongoFileTypesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="mongo-file-types-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="mongo-file-types-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fileNameLabel" for="mongo-file-types-fileName">
                  <Translate contentKey="catchControlPanelApp.mongoFileTypes.fileName">File Name</Translate>
                </Label>
                <AvField id="mongo-file-types-fileName" type="text" name="fileName" />
              </AvGroup>
              <AvGroup>
                <Label id="fileTypeLabel" for="mongo-file-types-fileType">
                  <Translate contentKey="catchControlPanelApp.mongoFileTypes.fileType">File Type</Translate>
                </Label>
                <AvField id="mongo-file-types-fileType" type="text" name="fileType" />
              </AvGroup>
              <AvGroup>
                <Label id="narrationLabel" for="mongo-file-types-narration">
                  <Translate contentKey="catchControlPanelApp.mongoFileTypes.narration">Narration</Translate>
                </Label>
                <AvField id="mongo-file-types-narration" type="text" name="narration" />
              </AvGroup>
              <AvGroup>
                <Label id="areaFileTypeCodeLabel" for="mongo-file-types-areaFileTypeCode">
                  <Translate contentKey="catchControlPanelApp.mongoFileTypes.areaFileTypeCode">Area File Type Code</Translate>
                </Label>
                <AvField id="mongo-file-types-areaFileTypeCode" type="text" name="areaFileTypeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="expiryDateLabel" for="mongo-file-types-expiryDate">
                  <Translate contentKey="catchControlPanelApp.mongoFileTypes.expiryDate">Expiry Date</Translate>
                </Label>
                <AvField id="mongo-file-types-expiryDate" type="date" className="form-control" name="expiryDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/mongo-file-types" replace color="info">
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
  mongoFileTypesEntity: storeState.mongoFileTypes.entity,
  loading: storeState.mongoFileTypes.loading,
  updating: storeState.mongoFileTypes.updating,
  updateSuccess: storeState.mongoFileTypes.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MongoFileTypesUpdate);
