import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './complaints-category.reducer';
import { IComplaintsCategory } from 'app/shared/model/complaints-category.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComplaintsCategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ComplaintsCategoryDetail = (props: IComplaintsCategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { complaintsCategoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.complaintsCategory.detail.title">ComplaintsCategory</Translate> [
          <b>{complaintsCategoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="categoryCode">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.categoryCode">Category Code</Translate>
            </span>
          </dt>
          <dd>{complaintsCategoryEntity.categoryCode}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.description">Description</Translate>
            </span>
          </dt>
          <dd>{complaintsCategoryEntity.description}</dd>
          <dt>
            <span id="audience">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.audience">Audience</Translate>
            </span>
          </dt>
          <dd>{complaintsCategoryEntity.audience}</dd>
          <dt>
            <span id="urgencyScale">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.urgencyScale">Urgency Scale</Translate>
            </span>
          </dt>
          <dd>{complaintsCategoryEntity.urgencyScale}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{complaintsCategoryEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={complaintsCategoryEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.complaintsCategory.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={complaintsCategoryEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/complaints-category" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/complaints-category/${complaintsCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ complaintsCategory }: IRootState) => ({
  complaintsCategoryEntity: complaintsCategory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsCategoryDetail);
