import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ThirdPartyChargeDistributionSchedule from './third-party-charge-distribution-schedule';
import ThirdPartyChargeDistributionScheduleDetail from './third-party-charge-distribution-schedule-detail';
import ThirdPartyChargeDistributionScheduleUpdate from './third-party-charge-distribution-schedule-update';
import ThirdPartyChargeDistributionScheduleDeleteDialog from './third-party-charge-distribution-schedule-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ThirdPartyChargeDistributionScheduleDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ThirdPartyChargeDistributionScheduleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ThirdPartyChargeDistributionScheduleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ThirdPartyChargeDistributionScheduleDetail} />
      <ErrorBoundaryRoute path={match.url} component={ThirdPartyChargeDistributionSchedule} />
    </Switch>
  </>
);

export default Routes;
