import './login.scss';
import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import {  AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
     <div  className=" border-light pb-4 loginform">
     <AvForm onSubmit={this.handleSubmit}>
       <ModalHeader id="login-title" toggle={handleClose} className="headertitle">
       <Avatar className="logo" shape="square" size={180} src="content/images/logo-name.png" />
       </ModalHeader>
       <ModalBody>
         <Row>
           <Col md="12">
             {loginError ? (
               <Alert color="danger">
                 <Translate contentKey="login.messages.error.authentication">
                   <strong>Failed to sign in!</strong> Please check your credentials and try again.
                 </Translate>
               </Alert>
             ) : null}
           </Col>
           <Col md="12">
             <AvField
               name="username"
               label={translate('global.form.username.label')}
               placeholder={translate('global.form.username.placeholder')}
               required
               errorMessage="Username cannot be empty!"
               autoFocus
             />
             <AvField
               name="password"
               type="password"
               label={translate('login.form.password')}
               placeholder={translate('login.form.password.placeholder')}
               required
               errorMessage="Password cannot be empty!"
             />
             <AvGroup check inline>
               <Label className="form-check-label">
                 <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">Remember me</Translate>
               </Label>
             </AvGroup>
           </Col>
         </Row>
         <div className="mt-1">&nbsp;</div>
         <Alert color="warning">
           <Link to="/account/reset/request">
             <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
           </Link>
         </Alert>
       </ModalBody>
       <ModalFooter>
         <Button color="primary" type="submit" className="btn btn-primary btn-lg btn-block btn-submit-n">
           <Translate contentKey="login.form.button">Sign in</Translate>
         </Button>
       </ModalFooter>
     </AvForm>
     </div>
    );
  }
}

export default LoginModal;
