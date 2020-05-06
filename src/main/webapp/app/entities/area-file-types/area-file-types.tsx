import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './area-file-types.reducer';
import { IAreaFileTypes } from 'app/shared/model/area-file-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaFileTypesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AreaFileTypes = (props: IAreaFileTypesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { areaFileTypesList, match, loading } = props;
  return (
    <div>
      <h2 id="area-file-types-heading">
        <Translate contentKey="catchControlPanelApp.areaFileTypes.home.title">Area File Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.areaFileTypes.home.createLabel">Create new Area File Types</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {areaFileTypesList && areaFileTypesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.isManadatory">Is Manadatory</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.hasExpiry">Has Expiry</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.areaFileTypes.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {areaFileTypesList.map((areaFileTypes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${areaFileTypes.id}`} color="link" size="sm">
                      {areaFileTypes.id}
                    </Button>
                  </td>
                  <td>{areaFileTypes.code}</td>
                  <td>{areaFileTypes.areaCode}</td>
                  <td>{areaFileTypes.isManadatory ? 'true' : 'false'}</td>
                  <td>{areaFileTypes.description}</td>
                  <td>{areaFileTypes.hasExpiry ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={areaFileTypes.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{areaFileTypes.createdBy}</td>
                  <td>{areaFileTypes.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={areaFileTypes.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{areaFileTypes.modifiedBy}</td>
                  <td>{areaFileTypes.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${areaFileTypes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${areaFileTypes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${areaFileTypes.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.areaFileTypes.home.notFound">No Area File Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ areaFileTypes }: IRootState) => ({
  areaFileTypesList: areaFileTypes.entities,
  loading: areaFileTypes.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaFileTypes);
