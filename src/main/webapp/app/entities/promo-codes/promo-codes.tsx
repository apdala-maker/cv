import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './promo-codes.reducer';
import { IPromoCodes } from 'app/shared/model/promo-codes.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPromoCodesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PromoCodes = (props: IPromoCodesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { promoCodesList, match, loading } = props;
  return (
    <div>
      <h2 id="promo-codes-heading">
        <Translate contentKey="catchControlPanelApp.promoCodes.home.title">Promo Codes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.promoCodes.home.createLabel">Create new Promo Codes</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {promoCodesList && promoCodesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.startHour">Start Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.endHour">End Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.promoCodes.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {promoCodesList.map((promoCodes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${promoCodes.id}`} color="link" size="sm">
                      {promoCodes.id}
                    </Button>
                  </td>
                  <td>{promoCodes.code}</td>
                  <td>{promoCodes.startHour}</td>
                  <td>{promoCodes.endHour}</td>
                  <td>
                    <TextFormat type="date" value={promoCodes.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{promoCodes.createdBy}</td>
                  <td>{promoCodes.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={promoCodes.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{promoCodes.modifiedBy}</td>
                  <td>{promoCodes.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${promoCodes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${promoCodes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${promoCodes.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.promoCodes.home.notFound">No Promo Codes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ promoCodes }: IRootState) => ({
  promoCodesList: promoCodes.entities,
  loading: promoCodes.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodes);
