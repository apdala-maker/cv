import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './passenger-identity.reducer';
import { IPassengerIdentity } from 'app/shared/model/passenger-identity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassengerIdentityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerIdentityDetail = (props: IPassengerIdentityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { passengerIdentityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.passengerIdentity.detail.title">PassengerIdentity</Translate> [
          <b>{passengerIdentityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userCode">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.userCode">User Code</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.userCode}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.name">Name</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.name}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.countryCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.areaCode}</dd>
          <dt>
            <span id="referralCode">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.referralCode">Referral Code</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.referralCode}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.gender}</dd>
          <dt>
            <span id="companyCode">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.companyCode">Company Code</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.companyCode}</dd>
          <dt>
            <span id="currentRating">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.currentRating">Current Rating</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.currentRating}</dd>
          <dt>
            <span id="userType">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.userType">User Type</Translate>
            </span>
          </dt>
          <dd>{passengerIdentityEntity.userType}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerIdentityEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.passengerIdentity.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={passengerIdentityEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="catchControlPanelApp.passengerIdentity.userProfileFileTypes">User Profile File Types</Translate>
          </dt>
          <dd>{passengerIdentityEntity.userProfileFileTypes ? passengerIdentityEntity.userProfileFileTypes.profileImage : ''}</dd>
        </dl>
        <Button tag={Link} to="/passenger-identity" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/passenger-identity/${passengerIdentityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ passengerIdentity }: IRootState) => ({
  passengerIdentityEntity: passengerIdentity.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassengerIdentityDetail);
