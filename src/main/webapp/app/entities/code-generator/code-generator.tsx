import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './code-generator.reducer';
import { ICodeGenerator } from 'app/shared/model/code-generator.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICodeGeneratorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CodeGenerator = (props: ICodeGeneratorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { codeGeneratorList, match, loading } = props;
  return (
    <div>
      <h2 id="code-generator-heading">
        <Translate contentKey="catchControlPanelApp.codeGenerator.home.title">Code Generators</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.codeGenerator.home.createLabel">Create new Code Generator</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {codeGeneratorList && codeGeneratorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.seed">Seed</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.currentNumber">Current Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.numberCategory">Number Category</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.prefix">Prefix</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.characterCount">Character Count</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.codeGenerator.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {codeGeneratorList.map((codeGenerator, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${codeGenerator.id}`} color="link" size="sm">
                      {codeGenerator.id}
                    </Button>
                  </td>
                  <td>{codeGenerator.seed}</td>
                  <td>{codeGenerator.currentNumber}</td>
                  <td>{codeGenerator.numberCategory}</td>
                  <td>{codeGenerator.prefix}</td>
                  <td>{codeGenerator.characterCount}</td>
                  <td>
                    <TextFormat type="date" value={codeGenerator.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{codeGenerator.createdBy}</td>
                  <td>{codeGenerator.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={codeGenerator.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{codeGenerator.modifiedBy}</td>
                  <td>{codeGenerator.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${codeGenerator.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${codeGenerator.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${codeGenerator.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.codeGenerator.home.notFound">No Code Generators found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ codeGenerator }: IRootState) => ({
  codeGeneratorList: codeGenerator.entities,
  loading: codeGenerator.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CodeGenerator);
