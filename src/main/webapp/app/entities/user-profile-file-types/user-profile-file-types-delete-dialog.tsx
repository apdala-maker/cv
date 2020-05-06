import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './user-profile-file-types.reducer';

export interface IUserProfileFileTypesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserProfileFileTypesDeleteDialog = (props: IUserProfileFileTypesDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/user-profile-file-types');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.userProfileFileTypesEntity.id);
  };

  const { userProfileFileTypesEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="catchControlPanelApp.userProfileFileTypes.delete.question">
        <Translate
          contentKey="catchControlPanelApp.userProfileFileTypes.delete.question"
          interpolate={{ id: userProfileFileTypesEntity.id }}
        >
          Are you sure you want to delete this UserProfileFileTypes?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-userProfileFileTypes" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ userProfileFileTypes }: IRootState) => ({
  userProfileFileTypesEntity: userProfileFileTypes.entity,
  updateSuccess: userProfileFileTypes.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileFileTypesDeleteDialog);
