import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FcmTokens from './fcm-tokens';
import FcmTokensDetail from './fcm-tokens-detail';
import FcmTokensUpdate from './fcm-tokens-update';
import FcmTokensDeleteDialog from './fcm-tokens-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FcmTokensDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FcmTokensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FcmTokensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FcmTokensDetail} />
      <ErrorBoundaryRoute path={match.url} component={FcmTokens} />
    </Switch>
  </>
);

export default Routes;
