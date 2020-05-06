import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './price.reducer';
import { IPrice } from 'app/shared/model/price.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPriceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PriceDetail = (props: IPriceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { priceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.price.detail.title">Price</Translate> [<b>{priceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="priceCode">
              <Translate contentKey="catchControlPanelApp.price.priceCode">Price Code</Translate>
            </span>
          </dt>
          <dd>{priceEntity.priceCode}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="catchControlPanelApp.price.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={priceEntity.startTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="catchControlPanelApp.price.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={priceEntity.endTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="pricePerMinute">
              <Translate contentKey="catchControlPanelApp.price.pricePerMinute">Price Per Minute</Translate>
            </span>
          </dt>
          <dd>{priceEntity.pricePerMinute}</dd>
          <dt>
            <span id="pricePerDistantUnit">
              <Translate contentKey="catchControlPanelApp.price.pricePerDistantUnit">Price Per Distant Unit</Translate>
            </span>
          </dt>
          <dd>{priceEntity.pricePerDistantUnit}</dd>
          <dt>
            <span id="minimumSpeedForPricePerMinute">
              <Translate contentKey="catchControlPanelApp.price.minimumSpeedForPricePerMinute">
                Minimum Speed For Price Per Minute
              </Translate>
            </span>
          </dt>
          <dd>{priceEntity.minimumSpeedForPricePerMinute}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.price.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{priceEntity.areaCode}</dd>
          <dt>
            <span id="vehicleTypeCode">
              <Translate contentKey="catchControlPanelApp.price.vehicleTypeCode">Vehicle Type Code</Translate>
            </span>
          </dt>
          <dd>{priceEntity.vehicleTypeCode}</dd>
          <dt>
            <span id="cancellationFee">
              <Translate contentKey="catchControlPanelApp.price.cancellationFee">Cancellation Fee</Translate>
            </span>
          </dt>
          <dd>{priceEntity.cancellationFee}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.price.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={priceEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.price.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{priceEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.price.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{priceEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.price.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={priceEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.price.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{priceEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.price.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{priceEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/price" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/price/${priceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ price }: IRootState) => ({
  priceEntity: price.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetail);
