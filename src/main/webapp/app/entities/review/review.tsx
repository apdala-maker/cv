import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Review = (props: IReviewProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { reviewList, match, loading } = props;
  return (
    <div>
      <h2 id="review-heading">
        <Translate contentKey="catchControlPanelApp.review.home.title">Reviews</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.review.home.createLabel">Create new Review</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {reviewList && reviewList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.tripCode">Trip Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.userCode">User Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.rating">Rating</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.remarks">Remarks</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.review.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reviewList.map((review, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${review.id}`} color="link" size="sm">
                      {review.id}
                    </Button>
                  </td>
                  <td>{review.tripCode}</td>
                  <td>{review.userCode}</td>
                  <td>{review.rating}</td>
                  <td>{review.areaCode}</td>
                  <td>{review.remarks}</td>
                  <td>
                    <TextFormat type="date" value={review.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{review.createdBy}</td>
                  <td>{review.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={review.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{review.modifiedBy}</td>
                  <td>{review.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${review.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${review.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${review.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.review.home.notFound">No Reviews found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ review }: IRootState) => ({
  reviewList: review.entities,
  loading: review.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Review);
