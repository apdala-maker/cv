import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDriverOpenedAppTimes } from 'app/shared/model/driver-opened-app-times.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './driver-opened-app-times.reducer';

export interface IDriverOpenedAppTimesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverOpenedAppTimesDeleteDialog = (props: IDriverOpenedAppTimesDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/driver-opened-app-times');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.driverOpenedAppTimesEntity.id);
  };

  const { driverOpenedAppTimesEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="catchControlPanelApp.driverOpenedAppTimes.delete.question">
        <Translate
          contentKey="catchControlPanelApp.driverOpenedAppTimes.delete.question"
          interpolate={{ id: driverOpenedAppTimesEntity.id }}
        >
          Are you sure you want to delete this DriverOpenedAppTimes?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-driverOpenedAppTimes" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ driverOpenedAppTimes }: IRootState) => ({
  driverOpenedAppTimesEntity: driverOpenedAppTimes.entity,
  updateSuccess: driverOpenedAppTimes.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverOpenedAppTimesDeleteDialog);
