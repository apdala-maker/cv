import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './identity-user.reducer';
import { IIdentityUser } from 'app/shared/model/identity-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIdentityUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IdentityUserDetail = (props: IIdentityUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { identityUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.identityUser.detail.title">IdentityUser</Translate> [<b>{identityUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.identityUser.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.userCode}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.identityUser.name">Name</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.name}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="catchControlPanelApp.identityUser.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.countryCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.identityUser.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.areaCode}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="catchControlPanelApp.identityUser.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.gender}</dd>
          <dt>
            <span id="companyCode">
              <Translate contentKey="catchControlPanelApp.identityUser.companyCode">Company Code</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.companyCode}</dd>
          <dt>
            <span id="affliateCode">
              <Translate contentKey="catchControlPanelApp.identityUser.affliateCode">Affliate Code</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.affliateCode}</dd>
          <dt>
            <span id="currentRating">
              <Translate contentKey="catchControlPanelApp.identityUser.currentRating">Current Rating</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.currentRating}</dd>
          <dt>
            <span id="userType">
              <Translate contentKey="catchControlPanelApp.identityUser.userType">User Type</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.userType}</dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="catchControlPanelApp.identityUser.isActive">Is Active</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="registrationStep">
              <Translate contentKey="catchControlPanelApp.identityUser.registrationStep">Registration Step</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.registrationStep}</dd>
          <dt>
            <span id="isApproved">
              <Translate contentKey="catchControlPanelApp.identityUser.isApproved">Is Approved</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.isApproved ? 'true' : 'false'}</dd>
          <dt>
            <span id="approvedBy">
              <Translate contentKey="catchControlPanelApp.identityUser.approvedBy">Approved By</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.approvedBy}</dd>
          <dt>
            <span id="activatedBy">
              <Translate contentKey="catchControlPanelApp.identityUser.activatedBy">Activated By</Translate>
            </span>
          </dt>
          <dd>{identityUserEntity.activatedBy}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.identityUser.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={identityUserEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.identityUser.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={identityUserEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.identityUser.userProfileFileTypes">User Profile File Types</Translate>
          </dt>
          <dd>{identityUserEntity.userProfileFileTypes ? identityUserEntity.userProfileFileTypes.profileImage : ''}</dd>
        </dl>
        <Button tag={Link} to="/identity-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/identity-user/${identityUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ identityUser }: IRootState) => ({
  identityUserEntity: identityUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IdentityUserDetail);
