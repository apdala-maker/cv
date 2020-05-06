import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileStorage from './file-storage';
import FileStorageDetail from './file-storage-detail';
import FileStorageUpdate from './file-storage-update';
import FileStorageDeleteDialog from './file-storage-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileStorageDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FileStorageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileStorageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileStorageDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileStorage} />
    </Switch>
  </>
);

export default Routes;
