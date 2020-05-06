import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserProfileFileTypes from './user-profile-file-types';
import UserProfileFileTypesDetail from './user-profile-file-types-detail';
import UserProfileFileTypesUpdate from './user-profile-file-types-update';
import UserProfileFileTypesDeleteDialog from './user-profile-file-types-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserProfileFileTypesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserProfileFileTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserProfileFileTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserProfileFileTypesDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserProfileFileTypes} />
    </Switch>
  </>
);

export default Routes;
