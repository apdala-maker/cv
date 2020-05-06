import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SmsModel from './sms-model';
import SmsModelDetail from './sms-model-detail';
import SmsModelUpdate from './sms-model-update';
import SmsModelDeleteDialog from './sms-model-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SmsModelDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SmsModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SmsModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SmsModelDetail} />
      <ErrorBoundaryRoute path={match.url} component={SmsModel} />
    </Switch>
  </>
);

export default Routes;
