import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transaction-third-party.reducer';
import { ITransactionThirdParty } from 'app/shared/model/transaction-third-party.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionThirdPartyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionThirdPartyDetail = (props: ITransactionThirdPartyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionThirdPartyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.transactionThirdParty.detail.title">TransactionThirdParty</Translate> [
          <b>{transactionThirdPartyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.areaCode}</dd>
          <dt>
            <span id="partyCategory">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.partyCategory">Party Category</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.partyCategory}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.code">Code</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.name">Name</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.name}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.country">Country</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.country}</dd>
          <dt>
            <span id="countyOrState">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.countyOrState">County Or State</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.countyOrState}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.postalCode}</dd>
          <dt>
            <span id="postalAddress">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.postalAddress">Postal Address</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.postalAddress}</dd>
          <dt>
            <span id="town">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.town">Town</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.town}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.street">Street</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.street}</dd>
          <dt>
            <span id="buildingNameOrNumber">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.buildingNameOrNumber">Building Name Or Number</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.buildingNameOrNumber}</dd>
          <dt>
            <span id="primaryPhoneNumber">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.primaryPhoneNumber">Primary Phone Number</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.primaryPhoneNumber}</dd>
          <dt>
            <span id="secondayPhoneNumber">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.secondayPhoneNumber">Seconday Phone Number</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.secondayPhoneNumber}</dd>
          <dt>
            <span id="emailAddress">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.emailAddress">Email Address</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.emailAddress}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transactionThirdPartyEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={transactionThirdPartyEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{transactionThirdPartyEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/transaction-third-party" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transaction-third-party/${transactionThirdPartyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transactionThirdParty }: IRootState) => ({
  transactionThirdPartyEntity: transactionThirdParty.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionThirdPartyDetail);
