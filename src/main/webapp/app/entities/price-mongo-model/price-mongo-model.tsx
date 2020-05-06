import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './price-mongo-model.reducer';
import { IPriceMongoModel } from 'app/shared/model/price-mongo-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPriceMongoModelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PriceMongoModel = (props: IPriceMongoModelProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { priceMongoModelList, match, loading } = props;
  return (
    <div>
      <h2 id="price-mongo-model-heading">
        <Translate contentKey="catchControlPanelApp.priceMongoModel.home.title">Price Mongo Models</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.priceMongoModel.home.createLabel">Create new Price Mongo Model</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {priceMongoModelList && priceMongoModelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.priceMongoModel.amountToBePaid">Amount To Be Paid</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.priceMongoModel.isPaid">Is Paid</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {priceMongoModelList.map((priceMongoModel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${priceMongoModel.id}`} color="link" size="sm">
                      {priceMongoModel.id}
                    </Button>
                  </td>
                  <td>{priceMongoModel.amountToBePaid}</td>
                  <td>{priceMongoModel.isPaid ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${priceMongoModel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${priceMongoModel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${priceMongoModel.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.priceMongoModel.home.notFound">No Price Mongo Models found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ priceMongoModel }: IRootState) => ({
  priceMongoModelList: priceMongoModel.entities,
  loading: priceMongoModel.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PriceMongoModel);
