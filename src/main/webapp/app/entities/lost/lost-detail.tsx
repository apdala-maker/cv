import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './lost.reducer';
import { ILost } from 'app/shared/model/lost.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILostDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LostDetail = (props: ILostDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { lostEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.lost.detail.title">Lost</Translate> [<b>{lostEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tripCode">
              <Translate contentKey="catchControlPanelApp.lost.tripCode">Trip Code</Translate>
            </span>
          </dt>
          <dd>{lostEntity.tripCode}</dd>
          <dt>
            <span id="dateLost">
              <Translate contentKey="catchControlPanelApp.lost.dateLost">Date Lost</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={lostEntity.dateLost} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.lost.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{lostEntity.userCode}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.lost.description">Description</Translate>
            </span>
          </dt>
          <dd>{lostEntity.description}</dd>
          <dt>
            <span id="itemName">
              <Translate contentKey="catchControlPanelApp.lost.itemName">Item Name</Translate>
            </span>
          </dt>
          <dd>{lostEntity.itemName}</dd>
          <dt>
            <span id="isFound">
              <Translate contentKey="catchControlPanelApp.lost.isFound">Is Found</Translate>
            </span>
          </dt>
          <dd>{lostEntity.isFound ? 'true' : 'false'}</dd>
          <dt>
            <span id="referenceCode">
              <Translate contentKey="catchControlPanelApp.lost.referenceCode">Reference Code</Translate>
            </span>
          </dt>
          <dd>{lostEntity.referenceCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.lost.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{lostEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.lost.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={lostEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.lost.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={lostEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/lost" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lost/${lostEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ lost }: IRootState) => ({
  lostEntity: lost.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LostDetail);
