import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-profile-file-types.reducer';
import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProfileFileTypesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserProfileFileTypesDetail = (props: IUserProfileFileTypesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userProfileFileTypesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.userProfileFileTypes.detail.title">UserProfileFileTypes</Translate> [
          <b>{userProfileFileTypesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="iSActive">
              <Translate contentKey="catchControlPanelApp.userProfileFileTypes.iSActive">I S Active</Translate>
            </span>
          </dt>
          <dd>{userProfileFileTypesEntity.iSActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="profileImage">
              <Translate contentKey="catchControlPanelApp.userProfileFileTypes.profileImage">Profile Image</Translate>
            </span>
          </dt>
          <dd>{userProfileFileTypesEntity.profileImage}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.userProfileFileTypes.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={userProfileFileTypesEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/user-profile-file-types" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-profile-file-types/${userProfileFileTypesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userProfileFileTypes }: IRootState) => ({
  userProfileFileTypesEntity: userProfileFileTypes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileFileTypesDetail);
