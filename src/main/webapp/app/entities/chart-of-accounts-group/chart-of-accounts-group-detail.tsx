import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chart-of-accounts-group.reducer';
import { IChartOfAccountsGroup } from 'app/shared/model/chart-of-accounts-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChartOfAccountsGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChartOfAccountsGroupDetail = (props: IChartOfAccountsGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { chartOfAccountsGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.detail.title">ChartOfAccountsGroup</Translate> [
          <b>{chartOfAccountsGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.code">Code</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.code}</dd>
          <dt>
            <span id="accountType">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.accountType">Account Type</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.accountType}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.description">Description</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.description}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={chartOfAccountsGroupEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={chartOfAccountsGroupEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.chartOfAccountsGroup.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{chartOfAccountsGroupEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/chart-of-accounts-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/chart-of-accounts-group/${chartOfAccountsGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ chartOfAccountsGroup }: IRootState) => ({
  chartOfAccountsGroupEntity: chartOfAccountsGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountsGroupDetail);
