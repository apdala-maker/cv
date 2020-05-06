import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './file-storage.reducer';
import { IFileStorage } from 'app/shared/model/file-storage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileStorageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FileStorage = (props: IFileStorageProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fileStorageList, match, loading } = props;
  return (
    <div>
      <h2 id="file-storage-heading">
        <Translate contentKey="catchControlPanelApp.fileStorage.home.title">File Storages</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.fileStorage.home.createLabel">Create new File Storage</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {fileStorageList && fileStorageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.fileName">File Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.fileType">File Type</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.referenceCode">Reference Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.narration">Narration</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.areaFileTypeCode">Area File Type Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.fileStorage.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fileStorageList.map((fileStorage, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fileStorage.id}`} color="link" size="sm">
                      {fileStorage.id}
                    </Button>
                  </td>
                  <td>{fileStorage.fileName}</td>
                  <td>{fileStorage.fileType}</td>
                  <td>{fileStorage.referenceCode}</td>
                  <td>{fileStorage.narration}</td>
                  <td>{fileStorage.areaFileTypeCode}</td>
                  <td>
                    <TextFormat type="date" value={fileStorage.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{fileStorage.createdBy}</td>
                  <td>{fileStorage.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={fileStorage.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{fileStorage.modifiedBy}</td>
                  <td>{fileStorage.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fileStorage.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileStorage.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileStorage.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="catchControlPanelApp.fileStorage.home.notFound">No File Storages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fileStorage }: IRootState) => ({
  fileStorageList: fileStorage.entities,
  loading: fileStorage.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileStorage);
