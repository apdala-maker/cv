import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chart-of-accounts.reducer';
import { IChartOfAccounts } from 'app/shared/model/chart-of-accounts.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChartOfAccountsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChartOfAccountsDetail = (props: IChartOfAccountsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { chartOfAccountsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.chartOfAccounts.detail.title">ChartOfAccounts</Translate> [
          <b>{chartOfAccountsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.areaCode}</dd>
          <dt>
            <span id="accountCode">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.accountCode">Account Code</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.accountCode}</dd>
          <dt>
            <span id="accountName">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.accountName">Account Name</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.accountName}</dd>
          <dt>
            <span id="isCJAccount">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.isCJAccount">Is CJ Account</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.isCJAccount}</dd>
          <dt>
            <span id="cOAGroupCode">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.cOAGroupCode">C OA Group Code</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.cOAGroupCode}</dd>
          <dt>
            <span id="systemPosted">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.systemPosted">System Posted</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.systemPosted}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={chartOfAccountsEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={chartOfAccountsEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.chartOfAccounts.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/chart-of-accounts" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/chart-of-accounts/${chartOfAccountsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ chartOfAccounts }: IRootState) => ({
  chartOfAccountsEntity: chartOfAccounts.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountsDetail);
