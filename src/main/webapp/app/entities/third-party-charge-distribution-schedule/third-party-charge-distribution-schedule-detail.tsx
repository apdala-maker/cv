import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './third-party-charge-distribution-schedule.reducer';
import { IThirdPartyChargeDistributionSchedule } from 'app/shared/model/third-party-charge-distribution-schedule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThirdPartyChargeDistributionScheduleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThirdPartyChargeDistributionScheduleDetail = (props: IThirdPartyChargeDistributionScheduleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { thirdPartyChargeDistributionScheduleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.detail.title">
            ThirdPartyChargeDistributionSchedule
          </Translate>{' '}
          [<b>{thirdPartyChargeDistributionScheduleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.code">Code</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.code}</dd>
          <dt>
            <span id="partyCode">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.partyCode">Party Code</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.partyCode}</dd>
          <dt>
            <span id="transactionCode">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.transactionCode">Transaction Code</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.transactionCode}</dd>
          <dt>
            <span id="chargeMode">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.chargeMode">Charge Mode</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.chargeMode}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.value">Value</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.value}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.status">Status</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.status}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.areaCode}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={thirdPartyChargeDistributionScheduleEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.creatorUserEmail">
                Creator User Email
              </Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={thirdPartyChargeDistributionScheduleEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.modifierUserEmail">
                Modifier User Email
              </Translate>
            </span>
          </dt>
          <dd>{thirdPartyChargeDistributionScheduleEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/third-party-charge-distribution-schedule" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button
          tag={Link}
          to={`/third-party-charge-distribution-schedule/${thirdPartyChargeDistributionScheduleEntity.id}/edit`}
          replace
          color="primary"
        >
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ thirdPartyChargeDistributionSchedule }: IRootState) => ({
  thirdPartyChargeDistributionScheduleEntity: thirdPartyChargeDistributionSchedule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyChargeDistributionScheduleDetail);
