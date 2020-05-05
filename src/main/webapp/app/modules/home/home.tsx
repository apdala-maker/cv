import './home.scss';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSession } from 'app/shared/reducers/authentication';
import Cards from './cards';

export interface IHomeProp extends StateProps, DispatchProps { }

export const Home = (props: IHomeProp) => {

  const { account, isAuthenticated } = props;

  return (
    <div>  {isAuthenticated ? (
      <Cards />
    ) : (
      <Redirect to="/login" />
    )}
    </div>
  );
};

const mapDispatchToProps = { getSession, };
const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
