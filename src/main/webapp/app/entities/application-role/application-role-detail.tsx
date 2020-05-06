import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application-role.reducer';
import { IApplicationRole } from 'app/shared/model/application-role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationRoleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationRoleDetail = (props: IApplicationRoleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationRoleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.applicationRole.detail.title">ApplicationRole</Translate> [
          <b>{applicationRoleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="access">
              <Translate contentKey="catchControlPanelApp.applicationRole.access">Access</Translate>
            </span>
          </dt>
          <dd>{applicationRoleEntity.access}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.applicationRole.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={applicationRoleEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.applicationRole.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{applicationRoleEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.applicationRole.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{applicationRoleEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.applicationRole.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={applicationRoleEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.applicationRole.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{applicationRoleEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.applicationRole.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{applicationRoleEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/application-role" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application-role/${applicationRoleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicationRole }: IRootState) => ({
  applicationRoleEntity: applicationRole.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoleDetail);
