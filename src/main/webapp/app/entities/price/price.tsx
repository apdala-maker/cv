import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './price.reducer';
import { IPrice } from 'app/shared/model/price.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPriceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Price = (props: IPriceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { priceList, match, loading } = props;
  return (
    <div>
      <h2 id="price-heading">
        <Translate contentKey="catchControlPanelApp.price.home.title">Prices</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.price.home.createLabel">Create new Price</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {priceList && priceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.priceCode">Price Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.startTime">Start Time</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.endTime">End Time</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.pricePerMinute">Price Per Minute</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.pricePerDistantUnit">Price Per Distant Unit</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.minimumSpeedForPricePerMinute">
                    Minimum Speed For Price Per Minute
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.vehicleTypeCode">Vehicle Type Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.cancellationFee">Cancellation Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.price.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {priceList.map((price, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${price.id}`} color="link" size="sm">
                      {price.id}
                    </Button>
                  </td>
                  <td>{price.priceCode}</td>
                  <td>
                    <TextFormat type="date" value={price.startTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={price.endTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{price.pricePerMinute}</td>
                  <td>{price.pricePerDistantUnit}</td>
                  <td>{price.minimumSpeedForPricePerMinute}</td>
                  <td>{price.areaCode}</td>
                  <td>{price.vehicleTypeCode}</td>
                  <td>{price.cancellationFee}</td>
                  <td>
                    <TextFormat type="date" value={price.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{price.createdBy}</td>
                  <td>{price.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={price.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{price.modifiedBy}</td>
                  <td>{price.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${price.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${price.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${price.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.price.home.notFound">No Prices found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ price }: IRootState) => ({
  priceList: price.entities,
  loading: price.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Price);
