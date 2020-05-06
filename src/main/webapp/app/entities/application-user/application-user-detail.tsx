import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application-user.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationUserDetail = (props: IApplicationUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.applicationUser.detail.title">ApplicationUser</Translate> [
          <b>{applicationUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.applicationUser.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.userCode}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.applicationUser.name">Name</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.name}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="catchControlPanelApp.applicationUser.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.countryCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.applicationUser.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.areaCode}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="catchControlPanelApp.applicationUser.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.gender}</dd>
          <dt>
            <span id="companyCode">
              <Translate contentKey="catchControlPanelApp.applicationUser.companyCode">Company Code</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.companyCode}</dd>
          <dt>
            <span id="currentRating">
              <Translate contentKey="catchControlPanelApp.applicationUser.currentRating">Current Rating</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.currentRating}</dd>
          <dt>
            <span id="userType">
              <Translate contentKey="catchControlPanelApp.applicationUser.userType">User Type</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.userType}</dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="catchControlPanelApp.applicationUser.isActive">Is Active</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="isApproved">
              <Translate contentKey="catchControlPanelApp.applicationUser.isApproved">Is Approved</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.isApproved ? 'true' : 'false'}</dd>
          <dt>
            <span id="approvedBy">
              <Translate contentKey="catchControlPanelApp.applicationUser.approvedBy">Approved By</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.approvedBy}</dd>
          <dt>
            <span id="activatedBy">
              <Translate contentKey="catchControlPanelApp.applicationUser.activatedBy">Activated By</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.activatedBy}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="catchControlPanelApp.applicationUser.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.imageUrl}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.applicationUser.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={applicationUserEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.applicationUser.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.applicationUser.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.applicationUser.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={applicationUserEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.applicationUser.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.applicationUser.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/application-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/application-user/${applicationUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ applicationUser }: IRootState) => ({
  applicationUserEntity: applicationUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUserDetail);
