import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App/>
    </Router>, 
    document.getElementById('root')
);