import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './code-generator.reducer';
import { ICodeGenerator } from 'app/shared/model/code-generator.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICodeGeneratorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CodeGeneratorDetail = (props: ICodeGeneratorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { codeGeneratorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.codeGenerator.detail.title">CodeGenerator</Translate> [<b>{codeGeneratorEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="seed">
              <Translate contentKey="catchControlPanelApp.codeGenerator.seed">Seed</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.seed}</dd>
          <dt>
            <span id="currentNumber">
              <Translate contentKey="catchControlPanelApp.codeGenerator.currentNumber">Current Number</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.currentNumber}</dd>
          <dt>
            <span id="numberCategory">
              <Translate contentKey="catchControlPanelApp.codeGenerator.numberCategory">Number Category</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.numberCategory}</dd>
          <dt>
            <span id="prefix">
              <Translate contentKey="catchControlPanelApp.codeGenerator.prefix">Prefix</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.prefix}</dd>
          <dt>
            <span id="characterCount">
              <Translate contentKey="catchControlPanelApp.codeGenerator.characterCount">Character Count</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.characterCount}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.codeGenerator.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={codeGeneratorEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.codeGenerator.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.codeGenerator.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.codeGenerator.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={codeGeneratorEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.codeGenerator.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.codeGenerator.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{codeGeneratorEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/code-generator" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/code-generator/${codeGeneratorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ codeGenerator }: IRootState) => ({
  codeGeneratorEntity: codeGenerator.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CodeGeneratorDetail);
