import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './restricted-area.reducer';
import { IRestrictedArea } from 'app/shared/model/restricted-area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRestrictedAreaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RestrictedAreaDetail = (props: IRestrictedAreaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { restrictedAreaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.restrictedArea.detail.title">RestrictedArea</Translate> [
          <b>{restrictedAreaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.restrictedArea.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.areaCode}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.restrictedArea.name">Name</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.name}</dd>
          <dt>
            <span id="northEastLatitude">
              <Translate contentKey="catchControlPanelApp.restrictedArea.northEastLatitude">North East Latitude</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.northEastLatitude}</dd>
          <dt>
            <span id="southWestLatitude">
              <Translate contentKey="catchControlPanelApp.restrictedArea.southWestLatitude">South West Latitude</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.southWestLatitude}</dd>
          <dt>
            <span id="northEastLongitude">
              <Translate contentKey="catchControlPanelApp.restrictedArea.northEastLongitude">North East Longitude</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.northEastLongitude}</dd>
          <dt>
            <span id="southWestLongitude">
              <Translate contentKey="catchControlPanelApp.restrictedArea.southWestLongitude">South West Longitude</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.southWestLongitude}</dd>
          <dt>
            <span id="vehicleTypeCode">
              <Translate contentKey="catchControlPanelApp.restrictedArea.vehicleTypeCode">Vehicle Type Code</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.vehicleTypeCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.restrictedArea.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={restrictedAreaEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.restrictedArea.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.restrictedArea.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.restrictedArea.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={restrictedAreaEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.restrictedArea.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.restrictedArea.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{restrictedAreaEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/restricted-area" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/restricted-area/${restrictedAreaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ restrictedArea }: IRootState) => ({
  restrictedAreaEntity: restrictedArea.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedAreaDetail);
