import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './third-party-charge-distribution-schedule.reducer';
import { IThirdPartyChargeDistributionSchedule } from 'app/shared/model/third-party-charge-distribution-schedule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThirdPartyChargeDistributionScheduleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ThirdPartyChargeDistributionSchedule = (props: IThirdPartyChargeDistributionScheduleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { thirdPartyChargeDistributionScheduleList, match, loading } = props;
  return (
    <div>
      <h2 id="third-party-charge-distribution-schedule-heading">
        <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.title">
          Third Party Charge Distribution Schedules
        </Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.createLabel">
            Create new Third Party Charge Distribution Schedule
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {thirdPartyChargeDistributionScheduleList && thirdPartyChargeDistributionScheduleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.partyCode">Party Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.transactionCode">
                    Transaction Code
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.chargeMode">Charge Mode</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.creatorUserEmail">
                    Creator User Email
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.modifierUserEmail">
                    Modifier User Email
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {thirdPartyChargeDistributionScheduleList.map((thirdPartyChargeDistributionSchedule, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${thirdPartyChargeDistributionSchedule.id}`} color="link" size="sm">
                      {thirdPartyChargeDistributionSchedule.id}
                    </Button>
                  </td>
                  <td>{thirdPartyChargeDistributionSchedule.code}</td>
                  <td>{thirdPartyChargeDistributionSchedule.partyCode}</td>
                  <td>{thirdPartyChargeDistributionSchedule.transactionCode}</td>
                  <td>{thirdPartyChargeDistributionSchedule.chargeMode}</td>
                  <td>{thirdPartyChargeDistributionSchedule.value}</td>
                  <td>{thirdPartyChargeDistributionSchedule.status}</td>
                  <td>{thirdPartyChargeDistributionSchedule.areaCode}</td>
                  <td>
                    <TextFormat type="date" value={thirdPartyChargeDistributionSchedule.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{thirdPartyChargeDistributionSchedule.createdBy}</td>
                  <td>{thirdPartyChargeDistributionSchedule.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={thirdPartyChargeDistributionSchedule.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{thirdPartyChargeDistributionSchedule.modifiedBy}</td>
                  <td>{thirdPartyChargeDistributionSchedule.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${thirdPartyChargeDistributionSchedule.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${thirdPartyChargeDistributionSchedule.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${thirdPartyChargeDistributionSchedule.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="catchControlPanelApp.thirdPartyChargeDistributionSchedule.home.notFound">
                No Third Party Charge Distribution Schedules found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ thirdPartyChargeDistributionSchedule }: IRootState) => ({
  thirdPartyChargeDistributionScheduleList: thirdPartyChargeDistributionSchedule.entities,
  loading: thirdPartyChargeDistributionSchedule.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyChargeDistributionSchedule);
