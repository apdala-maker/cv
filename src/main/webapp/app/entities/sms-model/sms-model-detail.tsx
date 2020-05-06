import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sms-model.reducer';
import { ISmsModel } from 'app/shared/model/sms-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISmsModelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SmsModelDetail = (props: ISmsModelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { smsModelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.smsModel.detail.title">SmsModel</Translate> [<b>{smsModelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="catchControlPanelApp.smsModel.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.phoneNumber}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="catchControlPanelApp.smsModel.message">Message</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.message}</dd>
          <dt>
            <span id="isSend">
              <Translate contentKey="catchControlPanelApp.smsModel.isSend">Is Send</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.isSend ? 'true' : 'false'}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.smsModel.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={smsModelEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.smsModel.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.smsModel.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.smsModel.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={smsModelEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.smsModel.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.smsModel.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{smsModelEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/sms-model" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sms-model/${smsModelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ smsModel }: IRootState) => ({
  smsModelEntity: smsModel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SmsModelDetail);
