import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import SignIn from './pages/SignIn';


const App = () => {
    console.log('in react')

    return (
        <Router>
            <SignIn/>
        </Router>
    )
}

ReactDOM.render(<App />, document);