import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleDetail = (props: IVehicleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.vehicle.detail.title">Vehicle</Translate> [<b>{vehicleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="modelName">
              <Translate contentKey="catchControlPanelApp.vehicle.modelName">Model Name</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.modelName}</dd>
          <dt>
            <span id="modelCode">
              <Translate contentKey="catchControlPanelApp.vehicle.modelCode">Model Code</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.modelCode}</dd>
          <dt>
            <span id="makeCode">
              <Translate contentKey="catchControlPanelApp.vehicle.makeCode">Make Code</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.makeCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.vehicle.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.vehicle.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicle.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.vehicle.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.vehicle.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicle.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/vehicle" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle/${vehicleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleEntity: vehicle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
