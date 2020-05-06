import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './found.reducer';
import { IFound } from 'app/shared/model/found.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFoundDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FoundDetail = (props: IFoundDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { foundEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.found.detail.title">Found</Translate> [<b>{foundEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.found.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{foundEntity.tripCode}</dd>
          <dt>
            <span id="dateFound">
              <Translate contentKey="catchControlPanelApp.found.dateFound">Date Found</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={foundEntity.dateFound} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.found.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{foundEntity.userCode}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.found.description">Description</Translate>
            </span>
          </dt>
          <dd>{foundEntity.description}</dd>
          <dt>
            <span id="itemName">
              <Translate contentKey="catchControlPanelApp.found.itemName">Item Name</Translate>
            </span>
          </dt>
          <dd>{foundEntity.itemName}</dd>
          <dt>
            <span id="isReturned">
              <Translate contentKey="catchControlPanelApp.found.isReturned">Is Returned</Translate>
            </span>
          </dt>
          <dd>{foundEntity.isReturned ? 'true' : 'false'}</dd>
          <dt>
            <span id="referenceCode">
              <Translate contentKey="catchControlPanelApp.found.referenceCode">Reference Code</Translate>
            </span>
          </dt>
          <dd>{foundEntity.referenceCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.found.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{foundEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.found.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={foundEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.found.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={foundEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/found" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/found/${foundEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ found }: IRootState) => ({
  foundEntity: found.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FoundDetail);
