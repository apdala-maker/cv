import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaDetail = (props: IAreaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { areaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.area.detail.title">Area</Translate> [<b>{areaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="countryCode">
              <Translate contentKey="catchControlPanelApp.area.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{areaEntity.countryCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.area.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{areaEntity.areaCode}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="catchControlPanelApp.area.address">Address</Translate>
            </span>
          </dt>
          <dd>{areaEntity.address}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.area.name">Name</Translate>
            </span>
          </dt>
          <dd>{areaEntity.name}</dd>
          <dt>
            <span id="northEastLatitude">
              <Translate contentKey="catchControlPanelApp.area.northEastLatitude">North East Latitude</Translate>
            </span>
          </dt>
          <dd>{areaEntity.northEastLatitude}</dd>
          <dt>
            <span id="southWestLatitude">
              <Translate contentKey="catchControlPanelApp.area.southWestLatitude">South West Latitude</Translate>
            </span>
          </dt>
          <dd>{areaEntity.southWestLatitude}</dd>
          <dt>
            <span id="northEastLongitude">
              <Translate contentKey="catchControlPanelApp.area.northEastLongitude">North East Longitude</Translate>
            </span>
          </dt>
          <dd>{areaEntity.northEastLongitude}</dd>
          <dt>
            <span id="southWestLongitude">
              <Translate contentKey="catchControlPanelApp.area.southWestLongitude">South West Longitude</Translate>
            </span>
          </dt>
          <dd>{areaEntity.southWestLongitude}</dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="catchControlPanelApp.area.isActive">Is Active</Translate>
            </span>
          </dt>
          <dd>{areaEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="isApproved">
              <Translate contentKey="catchControlPanelApp.area.isApproved">Is Approved</Translate>
            </span>
          </dt>
          <dd>{areaEntity.isApproved ? 'true' : 'false'}</dd>
          <dt>
            <span id="approvedBy">
              <Translate contentKey="catchControlPanelApp.area.approvedBy">Approved By</Translate>
            </span>
          </dt>
          <dd>{areaEntity.approvedBy}</dd>
          <dt>
            <span id="activatedBy">
              <Translate contentKey="catchControlPanelApp.area.activatedBy">Activated By</Translate>
            </span>
          </dt>
          <dd>{areaEntity.activatedBy}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.area.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={areaEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.area.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{areaEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.area.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{areaEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.area.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={areaEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.area.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{areaEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.area.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{areaEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/area" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/area/${areaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ area }: IRootState) => ({
  areaEntity: area.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetail);
