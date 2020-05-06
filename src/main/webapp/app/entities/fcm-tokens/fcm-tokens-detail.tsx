import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fcm-tokens.reducer';
import { IFcmTokens } from 'app/shared/model/fcm-tokens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFcmTokensDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FcmTokensDetail = (props: IFcmTokensDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fcmTokensEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.fcmTokens.detail.title">FcmTokens</Translate> [<b>{fcmTokensEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.fcmTokens.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.userCode}</dd>
          <dt>
            <span id="token">
              <Translate contentKey="catchControlPanelApp.fcmTokens.token">Token</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.token}</dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="catchControlPanelApp.fcmTokens.isActive">Is Active</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.fcmTokens.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fcmTokensEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.fcmTokens.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.fcmTokens.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.fcmTokens.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fcmTokensEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.fcmTokens.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.fcmTokens.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{fcmTokensEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/fcm-tokens" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fcm-tokens/${fcmTokensEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fcmTokens }: IRootState) => ({
  fcmTokensEntity: fcmTokens.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FcmTokensDetail);
