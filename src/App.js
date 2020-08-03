import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import { Route, NavLink, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
        </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
