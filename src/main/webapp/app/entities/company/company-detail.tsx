import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyDetail = (props: ICompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="displayName">
              <Translate contentKey="catchControlPanelApp.company.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{companyEntity.displayName}</dd>
          <dt>
            <span id="legalOrTradingName">
              <Translate contentKey="catchControlPanelApp.company.legalOrTradingName">Legal Or Trading Name</Translate>
            </span>
          </dt>
          <dd>{companyEntity.legalOrTradingName}</dd>
          <dt>
            <span id="registrationNumber">
              <Translate contentKey="catchControlPanelApp.company.registrationNumber">Registration Number</Translate>
            </span>
          </dt>
          <dd>{companyEntity.registrationNumber}</dd>
          <dt>
            <span id="registrationDate">
              <Translate contentKey="catchControlPanelApp.company.registrationDate">Registration Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={companyEntity.registrationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="companyCode">
              <Translate contentKey="catchControlPanelApp.company.companyCode">Company Code</Translate>
            </span>
          </dt>
          <dd>{companyEntity.companyCode}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.company.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{companyEntity.areaCode}</dd>
          <dt>
            <span id="countyOrState">
              <Translate contentKey="catchControlPanelApp.company.countyOrState">County Or State</Translate>
            </span>
          </dt>
          <dd>{companyEntity.countyOrState}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="catchControlPanelApp.company.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{companyEntity.postalCode}</dd>
          <dt>
            <span id="postalAddress">
              <Translate contentKey="catchControlPanelApp.company.postalAddress">Postal Address</Translate>
            </span>
          </dt>
          <dd>{companyEntity.postalAddress}</dd>
          <dt>
            <span id="cityOrTown">
              <Translate contentKey="catchControlPanelApp.company.cityOrTown">City Or Town</Translate>
            </span>
          </dt>
          <dd>{companyEntity.cityOrTown}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="catchControlPanelApp.company.street">Street</Translate>
            </span>
          </dt>
          <dd>{companyEntity.street}</dd>
          <dt>
            <span id="buildingNameOrNumber">
              <Translate contentKey="catchControlPanelApp.company.buildingNameOrNumber">Building Name Or Number</Translate>
            </span>
          </dt>
          <dd>{companyEntity.buildingNameOrNumber}</dd>
          <dt>
            <span id="primaryPhoneNumber">
              <Translate contentKey="catchControlPanelApp.company.primaryPhoneNumber">Primary Phone Number</Translate>
            </span>
          </dt>
          <dd>{companyEntity.primaryPhoneNumber}</dd>
          <dt>
            <span id="secondaryPhoneNumber">
              <Translate contentKey="catchControlPanelApp.company.secondaryPhoneNumber">Secondary Phone Number</Translate>
            </span>
          </dt>
          <dd>{companyEntity.secondaryPhoneNumber}</dd>
          <dt>
            <span id="emailAddress">
              <Translate contentKey="catchControlPanelApp.company.emailAddress">Email Address</Translate>
            </span>
          </dt>
          <dd>{companyEntity.emailAddress}</dd>
          <dt>
            <span id="website">
              <Translate contentKey="catchControlPanelApp.company.website">Website</Translate>
            </span>
          </dt>
          <dd>{companyEntity.website}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.company.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={companyEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.company.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{companyEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.company.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{companyEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.company.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={companyEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.company.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{companyEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.company.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{companyEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/company" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company/${companyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
