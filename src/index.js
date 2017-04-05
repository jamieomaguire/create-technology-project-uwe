// This is the root component which is rendered into the root div on the index.html page.
// It is a React Router component which sets up the navigation paths

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App';
import Error404 from './components/Error404';

ReactDOM.render(
  <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/overview" component={App}/>
        <Route path="/settings" component={App}/>
        <Route path="*" component={Error404}/>
  </Router>,
  document.getElementById('root')
);
