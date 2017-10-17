import React, { Component, PropTypes } from 'react';
import ReactDOM                        from 'react-dom';
import { Provider }                    from 'react-redux';
import AppContainer from './containers/app.js';
import instantiateStore from './instantiate_store.js';
const { store } = instantiateStore();
import '../css/index.scss';

class Base extends Component {
  render () {
    return (
      <Provider store = { this.props.store } >
        <AppContainer store = {store} />
      </Provider>
    );
  }
}

ReactDOM.render(<Base />, document.getElementById('app-container'));
