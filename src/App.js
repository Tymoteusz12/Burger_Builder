import React, { useEffect } from 'react';
import Layout from './hoc/layout/layout';
import { Route, Redirect, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { Suspense } from 'react';
import Spinner from './components/UI/Spinner/Spinner';

const Auth = React.lazy( () => import('./containers/Auth/Auth'));
const Checkout = React.lazy( () => import('./containers/Checkout/Checkout'));
const Orders = React.lazy( () => import('./containers/Orders/Orders'));

const app = props =>  {

  const { onAutoSignin } = props;
  useEffect(() => {
    onAutoSignin();
  }, [onAutoSignin]);

  let routes = (
    <Switch>
      <Route path="/auth" render={ () => <Suspense fallback={<Spinner/>}><Auth/></Suspense>} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/"/>
    </Switch>
  );

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={ () => <Suspense fallback={<Spinner/>}><Checkout/></Suspense>} />
        <Route path="/orders" render={ () => <Suspense fallback={<Spinner/>}><Orders/></Suspense>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: () => dispatch(actions.authCheckState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
