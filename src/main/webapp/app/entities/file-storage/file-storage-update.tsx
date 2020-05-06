import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './file-storage.reducer';
import { IFileStorage } from 'app/shared/model/file-storage.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileStorageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileStorageUpdate = (props: IFileStorageUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileStorageEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/file-storage');
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
        ...fileStorageEntity,
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
          <h2 id="catchControlPanelApp.fileStorage.home.createOrEditLabel">
            <Translate contentKey="catchControlPanelApp.fileStorage.home.createOrEditLabel">Create or edit a FileStorage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileStorageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-storage-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-storage-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fileNameLabel" for="file-storage-fileName">
                  <Translate contentKey="catchControlPanelApp.fileStorage.fileName">File Name</Translate>
                </Label>
                <AvField id="file-storage-fileName" type="text" name="fileName" />
              </AvGroup>
              <AvGroup>
                <Label id="fileTypeLabel" for="file-storage-fileType">
                  <Translate contentKey="catchControlPanelApp.fileStorage.fileType">File Type</Translate>
                </Label>
                <AvField id="file-storage-fileType" type="text" name="fileType" />
              </AvGroup>
              <AvGroup>
                <Label id="referenceCodeLabel" for="file-storage-referenceCode">
                  <Translate contentKey="catchControlPanelApp.fileStorage.referenceCode">Reference Code</Translate>
                </Label>
                <AvField id="file-storage-referenceCode" type="text" name="referenceCode" />
              </AvGroup>
              <AvGroup>
                <Label id="narrationLabel" for="file-storage-narration">
                  <Translate contentKey="catchControlPanelApp.fileStorage.narration">Narration</Translate>
                </Label>
                <AvField id="file-storage-narration" type="text" name="narration" />
              </AvGroup>
              <AvGroup>
                <Label id="areaFileTypeCodeLabel" for="file-storage-areaFileTypeCode">
                  <Translate contentKey="catchControlPanelApp.fileStorage.areaFileTypeCode">Area File Type Code</Translate>
                </Label>
                <AvField id="file-storage-areaFileTypeCode" type="text" name="areaFileTypeCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dateCreatedLabel" for="file-storage-dateCreated">
                  <Translate contentKey="catchControlPanelApp.fileStorage.dateCreated">Date Created</Translate>
                </Label>
                <AvField id="file-storage-dateCreated" type="date" className="form-control" name="dateCreated" />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="file-storage-createdBy">
                  <Translate contentKey="catchControlPanelApp.fileStorage.createdBy">Created By</Translate>
                </Label>
                <AvField id="file-storage-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="creatorUserEmailLabel" for="file-storage-creatorUserEmail">
                  <Translate contentKey="catchControlPanelApp.fileStorage.creatorUserEmail">Creator User Email</Translate>
                </Label>
                <AvField id="file-storage-creatorUserEmail" type="text" name="creatorUserEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="file-storage-dateModified">
                  <Translate contentKey="catchControlPanelApp.fileStorage.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="file-storage-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="file-storage-modifiedBy">
                  <Translate contentKey="catchControlPanelApp.fileStorage.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="file-storage-modifiedBy" type="text" name="modifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="modifierUserEmailLabel" for="file-storage-modifierUserEmail">
                  <Translate contentKey="catchControlPanelApp.fileStorage.modifierUserEmail">Modifier User Email</Translate>
                </Label>
                <AvField id="file-storage-modifierUserEmail" type="text" name="modifierUserEmail" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/file-storage" replace color="info">
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
  fileStorageEntity: storeState.fileStorage.entity,
  loading: storeState.fileStorage.loading,
  updating: storeState.fileStorage.updating,
  updateSuccess: storeState.fileStorage.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileStorageUpdate);
