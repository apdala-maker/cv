import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-storage.reducer';
import { IFileStorage } from 'app/shared/model/file-storage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileStorageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileStorageDetail = (props: IFileStorageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileStorageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.fileStorage.detail.title">FileStorage</Translate> [<b>{fileStorageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fileName">
              <Translate contentKey="catchControlPanelApp.fileStorage.fileName">File Name</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.fileName}</dd>
          <dt>
            <span id="fileType">
              <Translate contentKey="catchControlPanelApp.fileStorage.fileType">File Type</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.fileType}</dd>
          <dt>
            <span id="referenceCode">
              <Translate contentKey="catchControlPanelApp.fileStorage.referenceCode">Reference Code</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.referenceCode}</dd>
          <dt>
            <span id="narration">
              <Translate contentKey="catchControlPanelApp.fileStorage.narration">Narration</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.narration}</dd>
          <dt>
            <span id="areaFileTypeCode">
              <Translate contentKey="catchControlPanelApp.fileStorage.areaFileTypeCode">Area File Type Code</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.areaFileTypeCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.fileStorage.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fileStorageEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.fileStorage.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.fileStorage.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.fileStorage.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fileStorageEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.fileStorage.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.fileStorage.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{fileStorageEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/file-storage" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-storage/${fileStorageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fileStorage }: IRootState) => ({
  fileStorageEntity: fileStorage.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileStorageDetail);
