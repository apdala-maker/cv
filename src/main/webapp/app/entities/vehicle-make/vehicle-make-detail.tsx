import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-make.reducer';
import { IVehicleMake } from 'app/shared/model/vehicle-make.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMakeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMakeDetail = (props: IVehicleMakeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleMakeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.vehicleMake.detail.title">VehicleMake</Translate> [<b>{vehicleMakeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.vehicleMake.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleMakeEntity.description}</dd>
          <dt>
            <span id="makeCode">
              <Translate contentKey="catchControlPanelApp.vehicleMake.makeCode">Make Code</Translate>
            </span>
          </dt>
          <dd>{vehicleMakeEntity.makeCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.vehicleMake.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleMakeEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.vehicleMake.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{vehicleMakeEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicleMake.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleMakeEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.vehicleMake.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleMakeEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.vehicleMake.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{vehicleMakeEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicleMake.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleMakeEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-make" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-make/${vehicleMakeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleMake }: IRootState) => ({
  vehicleMakeEntity: vehicleMake.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMakeDetail);
