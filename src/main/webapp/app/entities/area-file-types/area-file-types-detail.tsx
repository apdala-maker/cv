import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './area-file-types.reducer';
import { IAreaFileTypes } from 'app/shared/model/area-file-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaFileTypesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaFileTypesDetail = (props: IAreaFileTypesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { areaFileTypesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.areaFileTypes.detail.title">AreaFileTypes</Translate> [<b>{areaFileTypesEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.code">Code</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.code}</dd>
          <dt>
            <span id="areaCode">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.areaCode">Area Code</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.areaCode}</dd>
          <dt>
            <span id="isManadatory">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.isManadatory">Is Manadatory</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.isManadatory ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.description">Description</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.description}</dd>
          <dt>
            <span id="hasExpiry">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.hasExpiry">Has Expiry</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.hasExpiry ? 'true' : 'false'}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={areaFileTypesEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={areaFileTypesEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.areaFileTypes.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{areaFileTypesEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/area-file-types" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/area-file-types/${areaFileTypesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ areaFileTypes }: IRootState) => ({
  areaFileTypesEntity: areaFileTypes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaFileTypesDetail);
