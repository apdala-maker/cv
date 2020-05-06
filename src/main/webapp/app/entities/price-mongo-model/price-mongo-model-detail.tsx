import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './price-mongo-model.reducer';
import { IPriceMongoModel } from 'app/shared/model/price-mongo-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPriceMongoModelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PriceMongoModelDetail = (props: IPriceMongoModelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { priceMongoModelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.priceMongoModel.detail.title">PriceMongoModel</Translate> [
          <b>{priceMongoModelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="amountToBePaid">
              <Translate contentKey="catchControlPanelApp.priceMongoModel.amountToBePaid">Amount To Be Paid</Translate>
            </span>
          </dt>
          <dd>{priceMongoModelEntity.amountToBePaid}</dd>
          <dt>
            <span id="isPaid">
              <Translate contentKey="catchControlPanelApp.priceMongoModel.isPaid">Is Paid</Translate>
            </span>
          </dt>
          <dd>{priceMongoModelEntity.isPaid ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/price-mongo-model" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/price-mongo-model/${priceMongoModelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ priceMongoModel }: IRootState) => ({
  priceMongoModelEntity: priceMongoModel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PriceMongoModelDetail);
