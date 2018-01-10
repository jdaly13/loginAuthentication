import React from 'react';
import ReactDOM from 'react-dom';
import AppRouting from './routes.js';
import {
    BrowserRouter as Router
} from 'react-router-dom';
ReactDOM.render(
<Router>
    <AppRouting/>
</Router>,
document.querySelector('#main')
);