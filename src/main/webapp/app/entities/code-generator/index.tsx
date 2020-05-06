import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CodeGenerator from './code-generator';
import CodeGeneratorDetail from './code-generator-detail';
import CodeGeneratorUpdate from './code-generator-update';
import CodeGeneratorDeleteDialog from './code-generator-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CodeGeneratorDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CodeGeneratorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CodeGeneratorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CodeGeneratorDetail} />
      <ErrorBoundaryRoute path={match.url} component={CodeGenerator} />
    </Switch>
  </>
);

export default Routes;
