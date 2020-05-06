import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './lost.reducer';
import { ILost } from 'app/shared/model/lost.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILostProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Lost = (props: ILostProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { lostList, match, loading } = props;
  return (
    <div>
      <h2 id="lost-heading">
        <Translate contentKey="catchControlPanelApp.lost.home.title">Losts</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.lost.home.createLabel">Create new Lost</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {lostList && lostList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.tripCode">Trip Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.dateLost">Date Lost</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.itemName">Item Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.isFound">Is Found</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.referenceCode">Reference Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.lost.dateModified">Date Modified</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lostList.map((lost, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${lost.id}`} color="link" size="sm">
                      {lost.id}
                    </Button>
                  </td>
                  <td>{lost.tripCode}</td>
                  <td>
                    <TextFormat type="date" value={lost.dateLost} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{lost.userCode}</td>
                  <td>{lost.description}</td>
                  <td>{lost.itemName}</td>
                  <td>{lost.isFound ? 'true' : 'false'}</td>
                  <td>{lost.referenceCode}</td>
                  <td>{lost.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={lost.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={lost.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${lost.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lost.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lost.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.lost.home.notFound">No Losts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ lost }: IRootState) => ({
  lostList: lost.entities,
  loading: lost.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Lost);
