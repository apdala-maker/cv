import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryDetail = (props: ICountryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { countryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.country.detail.title">Country</Translate> [<b>{countryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="countryName">
              <Translate contentKey="catchControlPanelApp.country.countryName">Country Name</Translate>
            </span>
          </dt>
          <dd>{countryEntity.countryName}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="catchControlPanelApp.country.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{countryEntity.countryCode}</dd>
          <dt>
            <span id="currencyName">
              <Translate contentKey="catchControlPanelApp.country.currencyName">Currency Name</Translate>
            </span>
          </dt>
          <dd>{countryEntity.currencyName}</dd>
          <dt>
            <span id="currencyCode">
              <Translate contentKey="catchControlPanelApp.country.currencyCode">Currency Code</Translate>
            </span>
          </dt>
          <dd>{countryEntity.currencyCode}</dd>
          <dt>
            <span id="currencySymbol">
              <Translate contentKey="catchControlPanelApp.country.currencySymbol">Currency Symbol</Translate>
            </span>
          </dt>
          <dd>{countryEntity.currencySymbol}</dd>
          <dt>
            <span id="language">
              <Translate contentKey="catchControlPanelApp.country.language">Language</Translate>
            </span>
          </dt>
          <dd>{countryEntity.language}</dd>
          <dt>
            <span id="timeZone">
              <Translate contentKey="catchControlPanelApp.country.timeZone">Time Zone</Translate>
            </span>
          </dt>
          <dd>{countryEntity.timeZone}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.country.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={countryEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.country.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{countryEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.country.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{countryEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.country.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={countryEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.country.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{countryEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.country.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{countryEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/country" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/country/${countryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ country }: IRootState) => ({
  countryEntity: country.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);
