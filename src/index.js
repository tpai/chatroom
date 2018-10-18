import 'core-js/shim';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'sockets/';
import './styles.scss';
import store from 'redux/store';
import Channel from 'containers/Channel';

render(
  <Provider store={store}>
    <Channel />
  </Provider>,
  document.getElementById('app'),
);
