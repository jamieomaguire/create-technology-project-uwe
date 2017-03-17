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
