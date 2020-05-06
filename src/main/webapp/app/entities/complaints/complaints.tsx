import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './complaints.reducer';
import { IComplaints } from 'app/shared/model/complaints.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComplaintsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Complaints = (props: IComplaintsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { complaintsList, match, loading } = props;
  return (
    <div>
      <h2 id="complaints-heading">
        <Translate contentKey="catchControlPanelApp.complaints.home.title">Complaints</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.complaints.home.createLabel">Create new Complaints</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {complaintsList && complaintsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.audience">Audience</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.feedBack">Feed Back</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.referenceCode">Reference Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.complaints.complaintsCategory">Complaints Category</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {complaintsList.map((complaints, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${complaints.id}`} color="link" size="sm">
                      {complaints.id}
                    </Button>
                  </td>
                  <td>{complaints.userCode}</td>
                  <td>{complaints.category}</td>
                  <td>{complaints.description}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.Audience.${complaints.audience}`} />
                  </td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.ComplaintStatus.${complaints.status}`} />
                  </td>
                  <td>{complaints.feedBack}</td>
                  <td>{complaints.referenceCode}</td>
                  <td>{complaints.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={complaints.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={complaints.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {complaints.complaintsCategory ? (
                      <Link to={`complaints-category/${complaints.complaintsCategory.id}`}>
                        {complaints.complaintsCategory.categoryCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${complaints.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${complaints.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${complaints.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.complaints.home.notFound">No Complaints found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ complaints }: IRootState) => ({
  complaintsList: complaints.entities,
  loading: complaints.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Complaints);
