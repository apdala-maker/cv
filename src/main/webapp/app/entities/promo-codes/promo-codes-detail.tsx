import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './promo-codes.reducer';
import { IPromoCodes } from 'app/shared/model/promo-codes.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPromoCodesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PromoCodesDetail = (props: IPromoCodesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { promoCodesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="catchControlPanelApp.promoCodes.detail.title">PromoCodes</Translate> [<b>{promoCodesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="catchControlPanelApp.promoCodes.code">Code</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.code}</dd>
          <dt>
            <span id="startHour">
              <Translate contentKey="catchControlPanelApp.promoCodes.startHour">Start Hour</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.startHour}</dd>
          <dt>
            <span id="endHour">
              <Translate contentKey="catchControlPanelApp.promoCodes.endHour">End Hour</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.endHour}</dd>
          <dt>
            <span id="dateCreated">
              <Translate contentKey="catchControlPanelApp.promoCodes.dateCreated">Date Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={promoCodesEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="catchControlPanelApp.promoCodes.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.createdBy}</dd>
          <dt>
            <span id="creatorUserEmail">
              <Translate contentKey="catchControlPanelApp.promoCodes.creatorUserEmail">Creator User Email</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.creatorUserEmail}</dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="catchControlPanelApp.promoCodes.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={promoCodesEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedBy">
              <Translate contentKey="catchControlPanelApp.promoCodes.modifiedBy">Modified By</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.modifiedBy}</dd>
          <dt>
            <span id="modifierUserEmail">
              <Translate contentKey="catchControlPanelApp.promoCodes.modifierUserEmail">Modifier User Email</Translate>
            </span>
          </dt>
          <dd>{promoCodesEntity.modifierUserEmail}</dd>
        </dl>
        <Button tag={Link} to="/promo-codes" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/promo-codes/${promoCodesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ promoCodes }: IRootState) => ({
  promoCodesEntity: promoCodes.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodesDetail);
