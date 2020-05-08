import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ userCode: string }> {}

export const UserManagementUpdate = (props: IUserManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.userCode);
  const statusArray=["Activate","Not Active"];
  const areaArray=["AR00000006"];

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getUser(props.match.params.userCode);
    }
    // props.getRoles();
    return () => props.reset();
  }, []);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = (event, values) => {
    if (isNew) {
      props.createUser(values);
    } else {
      props.updateUser(values);
    }
    handleClose();
  };

  const isInvalid = false;
  const { user, loading, updating, roles } = props;

  return (
    <div className="col-md-8 m-auto bg-white pb-lg-5 pt-lg-5">
      <Row className="justify-content-center">
        <Col md="8" >
          <h1>
            <Translate contentKey="userManagement.home.createOrEditLabel">Create or edit a User</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center ">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm onValidSubmit={saveUser}>
              {user.id ? (
                <AvGroup>
                  <Label for="id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvField type="text" className="form-control" name="id" required readOnly value={user.id} />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="lastName">
                  <Translate contentKey="userManagement.name">Last Name</Translate>
                </Label>
                <AvField
                  type="text"
                  className="form-control"
                  name="name"
                  validate={{
                    maxLength: {
                      value: 50,
                      errorMessage: translate('entity.validation.maxlength', { max: 50 })
                    }
                  }}
                  value={user.name}
                />
                <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <AvField
                  name="email"
                  label={translate('global.form.email.label')}
                  placeholder={translate('global.form.email.placeholder')}
                  type="email"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: translate('global.messages.validate.email.required')
                    },
                    email: {
                      errorMessage: translate('global.messages.validate.email.invalid')
                    },
                    minLength: {
                      value: 5,
                      errorMessage: translate('global.messages.validate.email.minlength')
                    },
                    maxLength: {
                      value: 254,
                      errorMessage: translate('global.messages.validate.email.maxlength')
                    }
                  }}
                  value={user.email}
                />
              </AvGroup>
              <AvGroup>
                <Label for="status">
                  <Translate contentKey="userManagement.status">Status</Translate>
                </Label>
                <AvField type="select" className="form-control" name="status" value={user.status || statusArray[0]}>
                  {statusArray.map(status => (
                    <option value={status} key={status}>{status}</option>
                  ))}
                </AvField>
              </AvGroup>
              <AvGroup>
                <Label for="status">
                  <Translate contentKey="userManagement.areaCode">Area</Translate>
                </Label>
                <AvField type="select" className="form-control" name="areaCode" value={user.areaCode || areaArray[0]}>
                  {areaArray.map(area => (
                    <option value={area} key={area}>{area}</option>
                  ))}
                </AvField>
              </AvGroup>
              <AvField
                name="password"
                label={translate('global.form.newpassword.label')}
                placeholder={translate('global.form.newpassword.placeholder')}
                type="password"
                onChange={user.password}
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                }}
              />
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementUpdate);
