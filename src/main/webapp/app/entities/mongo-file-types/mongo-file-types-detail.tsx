import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mongo-file-types.reducer';
import { IMongoFileTypes } from 'app/shared/model/mongo-file-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMongoFileTypesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MongoFileTypesDetail = (props: IMongoFileTypesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { mongoFileTypesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.mongoFileTypes.detail.title">MongoFileTypes</Translate> [
          <b>{mongoFileTypesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fileName">
              <Translate contentKey="catchControlPanelApp.mongoFileTypes.fileName">File Name</Translate>
            </span>
          </dt>
          <dd>{mongoFileTypesEntity.fileName}</dd>
          <dt>
            <span id="fileType">
              <Translate contentKey="catchControlPanelApp.mongoFileTypes.fileType">File Type</Translate>
            </span>
          </dt>
          <dd>{mongoFileTypesEntity.fileType}</dd>
          <dt>
            <span id="narration">
              <Translate contentKey="catchControlPanelApp.mongoFileTypes.narration">Narration</Translate>
            </span>
          </dt>
          <dd>{mongoFileTypesEntity.narration}</dd>
          <dt>
            <span id="areaFileTypeCode">
              <Translate contentKey="catchControlPanelApp.mongoFileTypes.areaFileTypeCode">Area File Type Code</Translate>
            </span>
          </dt>
          <dd>{mongoFileTypesEntity.areaFileTypeCode}</dd>
          <dt>
            <span id="expiryDate">
              <Translate contentKey="catchControlPanelApp.mongoFileTypes.expiryDate">Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={mongoFileTypesEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/mongo-file-types" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/mongo-file-types/${mongoFileTypesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ mongoFileTypes }: IRootState) => ({
  mongoFileTypesEntity: mongoFileTypes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MongoFileTypesDetail);
