import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/layout/layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder>

          </BurgerBuilder>  
        </Layout>
      </div>
    );
  }
}

export default App;
