import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import withRoot from './withRoot';

import { fetchContexts } from './actions/contexts'

import AppToolbar from './components/AppToolbar';

import Index from './pages/Index';
import PodList from './pages/PodList';
import ContainerInfo from './pages/ContainerInfo';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchContexts());
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/:context/:namespace?/:pod?/:container?/:page?" component={AppToolbar} />
          <Route exact path="/" component={Index} />
          <Route exact path="/:context/:namespace?" component={PodList} />
          <Route exact path="/:context/:namespace/:pod/:container/:page" component={ContainerInfo} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(withRoot(App));
