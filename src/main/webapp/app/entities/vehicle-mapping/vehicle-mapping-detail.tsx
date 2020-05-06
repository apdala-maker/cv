import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-mapping.reducer';
import { IVehicleMapping } from 'app/shared/model/vehicle-mapping.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMappingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMappingDetail = (props: IVehicleMappingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleMappingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.vehicleMapping.detail.title">VehicleMapping</Translate> [
          <b>{vehicleMappingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="makeCode">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.makeCode">Make Code</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.makeCode}</dd>
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.userCode}</dd>
          <dt>
            <span id="modelCode">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.modelCode">Model Code</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.modelCode}</dd>
          <dt>
            <span id="year">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.year">Year</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.year}</dd>
          <dt>
            <span id="registrationNumber">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.registrationNumber">Registration Number</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.registrationNumber}</dd>
          <dt>
            <span id="vehicleTypeCode">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.vehicleTypeCode">Vehicle Type Code</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.vehicleTypeCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.areaCode}</dd>
          <dt>
            <span id="isApproved">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.isApproved">Is Approved</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.isApproved ? 'true' : 'false'}</dd>
          <dt>
            <span id="approvedBy">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.approvedBy">Approved By</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.approvedBy}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleMappingEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={vehicleMappingEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.vehicleMapping.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{vehicleMappingEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-mapping" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-mapping/${vehicleMappingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicleMapping }: IRootState) => ({
  vehicleMappingEntity: vehicleMapping.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMappingDetail);
