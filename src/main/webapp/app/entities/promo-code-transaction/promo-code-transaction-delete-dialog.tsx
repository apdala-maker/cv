import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPromoCodeTransaction } from 'app/shared/model/promo-code-transaction.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './promo-code-transaction.reducer';

export interface IPromoCodeTransactionDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PromoCodeTransactionDeleteDialog = (props: IPromoCodeTransactionDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/promo-code-transaction');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.promoCodeTransactionEntity.id);
  };

  const { promoCodeTransactionEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="catchControlPanelApp.promoCodeTransaction.delete.question">
        <Translate
          contentKey="catchControlPanelApp.promoCodeTransaction.delete.question"
          interpolate={{ id: promoCodeTransactionEntity.id }}
        >
          Are you sure you want to delete this PromoCodeTransaction?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-promoCodeTransaction" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ promoCodeTransaction }: IRootState) => ({
  promoCodeTransactionEntity: promoCodeTransaction.entity,
  updateSuccess: promoCodeTransaction.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PromoCodeTransactionDeleteDialog);
