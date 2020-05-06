import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './complaints.reducer';
import { IComplaints } from 'app/shared/model/complaints.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComplaintsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ComplaintsDetail = (props: IComplaintsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { complaintsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.complaints.detail.title">Complaints</Translate> [<b>{complaintsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.complaints.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.userCode}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="catchControlPanelApp.complaints.category">Category</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.category}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.complaints.description">Description</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.description}</dd>
          <dt>
            <span id="audience">
              <Translate contentKey="catchControlPanelApp.complaints.audience">Audience</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.audience}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.complaints.status">Status</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.status}</dd>
          <dt>
            <span id="feedBack">
              <Translate contentKey="catchControlPanelApp.complaints.feedBack">Feed Back</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.feedBack}</dd>
          <dt>
            <span id="referenceCode">
              <Translate contentKey="catchControlPanelApp.complaints.referenceCode">Reference Code</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.referenceCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.complaints.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{complaintsEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.complaints.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={complaintsEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.complaints.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={complaintsEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.complaints.complaintsCategory">Complaints Category</Translate>
          </dt>
          <dd>{complaintsEntity.complaintsCategory ? complaintsEntity.complaintsCategory.categoryCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/complaints" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/complaints/${complaintsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ complaints }: IRootState) => ({
  complaintsEntity: complaints.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsDetail);
